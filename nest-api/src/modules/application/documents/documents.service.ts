import { Injectable } from "@nestjs/common";
import { CRUDMessages } from "src/shared/utils/message.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpStatus } from "@nestjs/common/enums";
import { PaginateQuery } from "nestjs-paginate";
import { CommonFilterService } from "../../../shared/services/common-filter.service";
import { DocumentsDto } from "./dto/documents.dto";
import { Documents } from "../../infrastructure/entities/documents.entity";

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Documents)
    private repository: Repository<Documents>,
    private commonFilterService: CommonFilterService
  ) {}

  async getAll(query: PaginateQuery) {
    const queryBuilder = this.repository.createQueryBuilder("table");
    return await this.commonFilterService.paginateFilter<Documents>(
      query,
      this.repository,
      queryBuilder,
      "id"
    );
  }

  async getByIds(id: any) {
    const value = await this.repository.findOne({ where: { id: id } });
    return value
      ? {
          statusCode: HttpStatus.OK,
          message: [CRUDMessages.GetSuccess],
          data: value,
          count: 1,
        }
      : {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [CRUDMessages.GetNotfound],
          data: [],
          count: 0,
        };
  }

  async createRegistry(dto: DocumentsDto) {
    console.log(dto)
    const creation = await this.repository.save(dto);

    return {
      statusCode: HttpStatus.OK,
      message: [CRUDMessages.CreateSuccess],
      data: creation,
    };
  }

  async updateRegistry(dto: DocumentsDto, id: any) {
    try {
      const { affected } = await this.repository.update({ id: id }, dto);
      if (affected == 1) {
        return {
          statusCode: HttpStatus.OK,
          message: [CRUDMessages.UpdateSuccess],
        };
      } else
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ["El registro no existe!"],
        };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error.message],
      };
    }
  }

  async deleteRegistry(id: any) {
    try {
      const { affected } = await this.repository.delete({ id: id });
      if (affected == 1) {
        return {
          statusCode: HttpStatus.OK,
          message: [CRUDMessages.DeleteSuccess],
        };
      } else
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: ["El registro no existe!"],
        };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: [error.message],
      };
    }
  }
}
