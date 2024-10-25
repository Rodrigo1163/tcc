import { Type_User } from "@prisma/client"
import { hash } from 'bcrypt'
import { prismaClient } from "../../prisma/prismaClient"

interface UserProps {
    name: string
    email: string
    password: string
    type_user: Type_User
}


class CreateUserService {
    async execute({ name, email, password, type_user }: UserProps) {
        const userExist = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (userExist) {
            throw new Error("Esse usuário já existe")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                email,
                name,
                password: passwordHash,
                type_user
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


export { CreateUserService }