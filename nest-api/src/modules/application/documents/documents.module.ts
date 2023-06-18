import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonFilterService } from "../../../shared/services/common-filter.service";
import { DocumentsController } from "./documents.controller";
import { DocumentsService } from "./documents.service";
import { Documents } from "../../infrastructure/entities/documents.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Documents])],
  controllers: [DocumentsController],
  providers: [DocumentsService, CommonFilterService],
})
export class DocumentsModule {}
