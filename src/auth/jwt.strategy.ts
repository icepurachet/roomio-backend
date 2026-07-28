import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // ดึง token จาก header แบบ Bearer
            secretOrKey: 'your_secret_key'  // ต้องตรงกับที่ตั้งไว้ใน JwtModule

        });
    }

    async validate(payload: any) {
        // payload คือข้อมูลใน token ตอน sign (sub, role ฯลฯ)
        // return ข้อมูล user ที่ต้องการผูกกับ request.user

        const role = payload.role ?? 'owner';
        return { 
            user_id: payload.sub, 
            username: payload.username,
            role: role
        };
    }
}