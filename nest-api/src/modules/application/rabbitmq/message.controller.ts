import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';

@ApiTags('RabbitMQ Message')
@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @ApiOperation({ summary: 'Publicar mensaje en cola' })
    @ApiBody({ type: MessageDto, description: 'Contenido del mensaje', required: false })
    @ApiResponse({ status: 200, description: 'El mensaje se ha publicado correctamente en la cola' })
    @Post()
    async publishMessage(
        @Body() content: MessageDto
    ) {
        return await this.messageService.publishMessage(content);
    }
}