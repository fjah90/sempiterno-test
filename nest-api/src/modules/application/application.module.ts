import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
    imports: [
        UsersModule,
        DocumentsModule
    ]
})
export class ApplicationModule { }
