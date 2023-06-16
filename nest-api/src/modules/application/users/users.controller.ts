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
import { UsersDto } from "./dto/users.dto";
import { UsersService } from "./users.service";

import { Paginate, PaginateQuery } from "nestjs-paginate";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @ApiOperation({ summary: "Paginación de todos los registros" })
  @ApiResponse({
    status: 200,
    type: [UsersDto],
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
    type: UsersDto,
  })
  @Get(":id")
  async getByIds(@Param("id") id: any) {
    return await this.service.getByIds(id);
  }

  @ApiOperation({ summary: "Guardar nuevo registro" })
  @ApiBody({ type: UsersDto })
  @ApiResponse({
    status: 200,
    description: "Guarda un nuevo registro",
    type: UsersDto,
  })
  @Post()
  async createRegistry(@Body() dto: UsersDto) {
    return await this.service.createRegistry(dto);
  }

  @ApiOperation({ summary: "Actualiza un registro" })
  @ApiBody({ type: UsersDto })
  @ApiParam({
    name: "id",
    description: "Busca por su identificador",
  })
  @ApiResponse({
    status: 200,
    description: "Actualiza un registro",
    type: UsersDto,
  })
  @Put(":id")
  async updateRegister(@Body() dto: UsersDto, @Param("id") id: any) {
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
