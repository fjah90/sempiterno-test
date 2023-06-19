import { Controller } from "@nestjs/common";
import { Body, Delete, Get, Put, Post, Param } from "@nestjs/common/decorators";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DocumentsDto } from "./dto/documents.dto";
import { DocumentsService } from "./documents.service";
import { Paginate, PaginateQuery } from "nestjs-paginate";

@ApiTags("Documents")
@Controller("documents")
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @ApiOperation({ summary: "Paginación de todos los registros" })
  @ApiResponse({
    status: 200,
    type: [DocumentsDto],
  })
  @ApiQuery({
    name: "page",
    description: "Número de página",
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: "limit",
    description: "Limite de elementos",
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: "search",
    description: "Texto a buscar",
    type: String,
    required: false,
  })
  @Get()
  async getAll(@Paginate() query: PaginateQuery) {
    return await this.service.getAll(query);
  }

  @ApiOperation({ summary: "Busca por su identificador" })
  @ApiParam({
    name: "id",
    description: "Busca por su identificador",
  })
  @ApiResponse({
    status: 200,
    type: DocumentsDto,
  })
  @Get(":id")
  async getByIds(@Param("id") id: any) {
    return await this.service.getByIds(id);
  }

  @ApiOperation({ summary: "Guardar nuevo registro" })
  @ApiBody({ type: DocumentsDto })
  @ApiResponse({
    status: 200,
    description: "Guarda un nuevo registro",
    type: DocumentsDto,
  })
  @Post()
  async createRegistry(@Body() dto: DocumentsDto) {
    console.log(dto)
    return await this.service.createRegistry(dto);
  }

  @ApiOperation({ summary: "Actualiza un registro" })
  @ApiBody({ type: DocumentsDto })
  @ApiParam({
    name: "id",
    description: "Busca por su identificador",
  })
  @ApiResponse({
    status: 200,
    description: "Actualiza un registro",
    type: DocumentsDto,
  })
  @Put(":id")
  async updateRegister(@Body() dto: DocumentsDto, @Param("id") id: any) {
    return await this.service.updateRegistry(dto, id);
  }

  @ApiOperation({ summary: "Elimina un registro por identificador" })
  @ApiParam({
    name: "id",
    description: "Busca por su identificador",
  })
  @Delete(":id")
  async deleteRegister(@Param("id") id: any) {
    return await this.service.deleteRegistry(id);
  }
}
