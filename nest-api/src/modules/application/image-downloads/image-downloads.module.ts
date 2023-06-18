import { Module } from '@nestjs/common';
import { ImageDownloadController } from './image-downloads.controller';
import { ImageDownloadService } from './image-downloads.service';

@Module({
    controllers: [ImageDownloadController],
    providers: [ImageDownloadService],
})
export class ImageDownloadModule { }