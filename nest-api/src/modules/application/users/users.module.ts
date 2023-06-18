import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonFilterService } from "../../../shared/services/common-filter.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Users } from "../../infrastructure/entities/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, CommonFilterService],
  exports: [UsersService]
})
export class UsersModule {}
