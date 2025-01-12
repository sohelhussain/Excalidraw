
import jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/server-common/config";
import { NextFunction, Request, Response } from "express";

interface CostomReq extends Request {
    userId: string;
}

export function middleware(req: CostomReq, res: Response, next: NextFunction) {
    const header = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(header, JWT_SECRET);

    if(decoded){
        req.userId = (decoded as JwtPayload).userId;
        next();
    } else {
        res.status(403).json({
            message: "unAuthorize"
        })
    }
}