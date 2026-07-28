import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { Role } from "../auth/roles.enum";

@Controller('protected')
@UseGuards(JwtAuthGuard, RolesGuard)
export class protectedController {
    @Get('owner-only')
    @Roles(Role.Owner)
    getForOwner() {
        return 'เฉพาะเจ้าของเท่านั้นถึงเข้าได้';
    }

    @Get('user-or-owner')
    @Roles(Role.User, Role.Owner)
    getForUserOrOwner() {
        return 'ทั้ง user และ owner เข้าได้'
    }
}