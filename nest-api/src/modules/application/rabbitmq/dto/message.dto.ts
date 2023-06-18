import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, Length, } from 'class-validator';
import { Message } from 'src/shared/utils/message.decorator';

export class MessageDto {
  @Type(() => String)
  @IsString({ message: Message.STRING("$property") })
  @Length(1, 255, { message: Message.LENGTH("$property", "$constraint1 $constraint2") })
  @IsOptional()
  @ApiProperty({ title: "Nombre de la Cola", example: "Dato de tipo texto", required: false })
  queueName?: string;

  @Type(() => String)
  @IsString({ message: Message.STRING("$property") })
  @Length(1, 255, { message: Message.LENGTH("$property", "$constraint1 $constraint2") })
  @IsOptional()
  @ApiProperty({ title: "Texto", example: "Dato de tipo texto", required: false })
  text?: string;
}