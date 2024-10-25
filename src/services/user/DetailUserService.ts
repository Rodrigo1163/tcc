import { prismaClient } from "../../prisma/prismaClient"

interface DetailProps {
    user_id: string
}

class DetailUserService {
    async execute({ user_id }: DetailProps) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true,
                type_user: true
            }
        })

        return user;


    }
}

export { DetailUserService }