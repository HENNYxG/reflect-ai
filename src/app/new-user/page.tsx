//setting up new users loading page
//logic: check in db to see if theres not a user with the clerk User id. If there isnt, add them to the db
//then do any initilization for anything they need. like connecting stripe account, etc
//if the user already exists redirect them out. 
//Because this is a server component, we can do all this in the logic

import { prisma } from "@/utils/db"
import { currentUser } from "@clerk/nextjs/server"
import {redirect} from 'next/navigation'


const createNewUser = async () => {
    const user = await currentUser()

    const match = await prisma.user.findUnique({
        where: {
            clerkId: user.id as string,
        },
    })

    if (!match) {
        await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user?.emailAddresses[0].emailAddress,
            }
        })
    }

    redirect('/journal')
}

const NewUser = async () => {
    await createNewUser()
    return <div>loading animation</div>
}

export default NewUser