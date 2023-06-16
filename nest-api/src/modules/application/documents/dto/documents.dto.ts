import { ApiProperty } from "@nestjs/swagger";
import { Message } from "src/shared/utils/message.decorator";
import { Type } from "class-transformer";
import { IsOptional, IsNumber, Max, IsString, Length } from "class-validator";

export class DocumentsDto {
  @Type(() => Number)
  @IsNumber({}, { message: Message.NUMBER("$property") })
  @Max(99999999999999999999999999999999, {
    message: "El maximo valor de id debe ser 99999999999999999999999999999999",
  })
  @IsOptional()
  @ApiProperty({
    title: "id",
    example: "Dato de tipo numérico",
    required: false,
  })
  id: number;

  @Type(() => String)
  @IsString({ message: Message.STRING("$property") })
  @Length(1, 255, {
    message: Message.LENGTH("$property", "$constraint1 $constraint2"),
  })
  @ApiProperty({
    title: "title",
    example: "Dato de tipo texto",
    required: false,
  })
  title: string;

  @Type(() => String)
  @IsString({ message: Message.STRING("$property") })
  @ApiProperty({
    title: "content",
    example: "Dato de tipo texto",
    required: false,
  })
  contents: string;
}
