// import { OpenAI } from 'langchain/llms/openai'
import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser, OutputFixingParser} from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import z from 'zod'
import {Document} from 'langchain/document'

const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe('the mood of the person who wrote the journal entry.'),
        subject: z.string().describe('the subject of the journal entry.'),
        negative: z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
        summary: z.string().describe('quick summary of the entire entry.'),
        color: z.string().describe('a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue.'),
        sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.')
    })
)

const getPrompt = async (content) => {
    const format_instructions = parser.getFormatInstructions()
    const prompt = new PromptTemplate({
        template:'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
    })
    const input = await prompt.format({
        entry: content,
    })
    console.log(input)
    return input
    }



export const analyze = async (content) => {
    const model = new ChatOpenAI({ temperature: 0, model: "gpt-3.5-turbo" })
    const input = await getPrompt(content)
    const result = await model.invoke(input)
    console.log(result.content)
    try {
        return parser.parse(result.content)
    } catch (e){
        console.log(e)
    //     const fixParser = OutputFixingParser.fromLLM(
    //   new ChatOpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
    //   parser
    // )
    //     const fix = await fixParser.parse(result)
    //     console.log(fix)
    // return fix
    }
}

//ai search
//When we host this database, we wont have to take entires everytime. We can just index them everytime we save them in our SupaBase db, they get saved in the vector database. But for testing, we're working with vector in memory db so we have to create it every time we have a question
export const qa = async (question, entries) => {
    const docs = entries.map((entry) => {
        return new Document({
            pageContent: entry.content,
            metadata: {id: entry.id, createdAt: entry.createdAt},
        })
    })

    const model = new ChatOpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    const chain = loadQARefineChain(model)
    const embeddings = new OpenAIEmbeddings(); //returns a func that can create embeds for chains
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
    const relevantDocs = await store.similaritySearch(question) //this is the relevant info needed to answer the question asked. 
    const res = await chain.invoke({
        input_documents: relevantDocs,
        question,
    })

    return res.output_text
}
//We add metadata so the ai can have time of entry context as well as where the info came from for direct follow up queries related to their answer
//loadQARefineChain: (an index chain) Iterates over input documents one by one, updating the answer with each iteration. it uses the previous version of the answer and the next document as context. best for QA over large number of documents.