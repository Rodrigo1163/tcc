import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface PayLoad {
    sub: string
}

export function isAuthtenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        res.status(401).end();
    }

    const [, token] = authToken.split(" ");
    try {
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad
        req.user_id = sub;

        next();
    } catch (err) {
        res.status(401).end()
    }
}