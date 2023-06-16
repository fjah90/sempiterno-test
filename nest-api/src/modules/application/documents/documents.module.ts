import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonFilterService } from "src/shared/services/common-filter.service";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { DocumentsEntity } from "./entity/documents.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DocumentsEntity])],
  controllers: [DocumentsController],
  providers: [DocumentsService, CommonFilterService],
})
export class DocumentsModule {}
