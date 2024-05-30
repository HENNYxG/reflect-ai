import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

//enables post request to /journal
export const POST = async () => {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "How was your day?",
     },
    })
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