import { ApiProperty } from '@nestjs/swagger';
    import { Message } from 'sigebi-lib-common';
    import {Type} from 'class-transformer';
    import { IsOptional, IsNumber, Max, IsString, Length,  } from 'class-validator';

    export class UsersDto {
      
      @Type(() => Number)
        @IsNumber({}, { message: Message.NUMBER("$property") })
        @Max(99999999999999999999999999999999, { message: "El maximo valor de id debe ser 99999999999999999999999999999999" })
        @IsOptional()
        @ApiProperty({ title: "id", example: "Dato de tipo numérico", required: false })
        Id: number;
        
        @Type(() => String)
        @IsString({ message: Message.STRING("$property") })
        @Length(1, 255, { message: Message.LENGTH("$property", "$constraint1 $constraint2")})
        
        @ApiProperty({ title: "name", example: "Dato de tipo texto", required: false })
        yam: string;
        
        @Type(() => String)
        @IsString({ message: Message.STRING("$property") })
        @Length(1, 255, { message: Message.LENGTH("$property", "$constraint1 $constraint2")})
        
        @ApiProperty({ title: "email", example: "Dato de tipo texto", required: false })
        e-mail: string;
        
        @Type(() => String)
        @IsString({ message: Message.STRING("$property") })
        @Length(1, 255, { message: Message.LENGTH("$property", "$constraint1 $constraint2")})
        
        @ApiProperty({ title: "password", example: "Dato de tipo texto", required: false })
        password: string;
        
    }

    