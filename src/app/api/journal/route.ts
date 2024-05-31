import { analyze } from "@/utils/ai"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

//enables post request to /journal
export const POST = async () => {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "How was your day?",
            analysis: {
        create: {
          mood: 'Neutral',
          subject: 'None',
          negative: false,
          summary: 'None',
          sentimentScore: 0,
          color: '#d8d8d8',
          userId: user.id,
        },
      },
     },
    })
    //run analysis and push to db
    // const analysis = await analyze(entry.content)
    // await prisma.analysis.create({
    //     data: {
    //         userId: user.id,
    //         entryId: entry.id,
    //         ...analysis,
    //     },
    // })
    //cleans and refetches the db data
    revalidatePath('/journal')
    //send back a object with the data prop holding the data, so we can always tap into the same key.
    return NextResponse.json({data: entry})
}


/*
To connect specifically to the user we're using, then create the entry:
data: {
    user: {
        connect: {
            id: user.id
        }
    }
     }
    */