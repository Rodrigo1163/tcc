import { compare } from "bcrypt"
import { sign } from 'jsonwebtoken'
import { prismaClient } from "../../prisma/prismaClient"

interface AuthUserProps {
    email: string
    password: string
}

class AuthUserService {
    async execute({ email, password }: AuthUserProps) {
        const user = await prismaClient.user.findFirst({
            where: { email }
        })

        if (!user) throw new Error('Email ou Senha Incorreta');

        const passowordMatch = await compare(password, user.password);

        if (!passowordMatch) throw new Error('Email ou Senha Incorreta');

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }


    }
}

export { AuthUserService }