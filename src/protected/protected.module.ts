import { Module } from "@nestjs/common";
import { protectedController } from "./protected.controller";

@Module({
    controllers: [protectedController]
})
export class protectedModule {}