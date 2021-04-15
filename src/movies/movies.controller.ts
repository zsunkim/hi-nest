import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { type } from 'os';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    // moviesService 라는 property를 만들고 타입을 지정해주면 this.moviesService.메소드명 으로 호출 가능
    constructor(private readonly moviesService: MoviesService) {}

    @Get() 
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    @Get(':id')
    getOne(@Param("id") movieId: number): Movie{
        //console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        // console.log(movieData);
        // return movieData;
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
        // return {
        //     updatedMovie: movieId,
        //     ...updateData
        // }
    }

    
}
