import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonFilterService } from "src/shared/services/common-filter.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UsersEntity } from "./entity/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, CommonFilterService],
})
export class UsersModule {}
