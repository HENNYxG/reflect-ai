import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";

export const getUserByClerkID = async () => {
    const { userId } = await auth()
    
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            clerkId: userId,
        },
    })
    return user 
}
//include: can say include:this and it will bring it from the entry
//selects a specific thing. 
//this is server side only bc the imports are Node Modules. Prisma only runs on server
