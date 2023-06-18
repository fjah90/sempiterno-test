import { Controller, Get, Query, Res, Req, UseInterceptors } from '@nestjs/common';
import { ImageDownloadService } from './image-downloads.service';
import { Response, Request } from 'express';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from 'src/core/response.interceptor';

@Controller('images')
@ApiTags('Images')
export class ImageDownloadController {
    constructor(private readonly imageServices: ImageDownloadService) { }

    @Get('/download')
    @ApiOperation({ summary: 'Descarga y guarda una imagen' })
    @ApiQuery({ name: 'url', required: true })
    @ApiQuery({ name: 'fileName', required: true })
    @UseInterceptors(ResponseInterceptor)
    async downloadImage(@Query() query: any) {
        const { url, fileName } = query;
        const resp = await this.imageServices.downloadAndSaveImage(url, fileName);

        console.log(resp)

        return resp
    }
}