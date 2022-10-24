import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database-module/database-module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: parseInt(process.env.PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.DATABSE,
      autoLoadEntities: true,
      connectTimeoutMS: 100000,
      maxQueryExecutionTime: 50,
      logger: 'debug',
      synchronize: true
    }),
    BookModule,
  ],
  

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

