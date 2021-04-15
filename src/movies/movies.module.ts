import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
    controllers: [MoviesController],
    providers: [MoviesService],
    // MoviesService를 import 하고 Controller에 inject 함 : dependency injection
})
export class MoviesModule {}
