import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';
import { ImageDownloadModule } from './image-downloads/image-downloads.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './rabbitmq/message.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        DocumentsModule,
        ImageDownloadModule,
        MessageModule
    ]
})
export class ApplicationModule { }
