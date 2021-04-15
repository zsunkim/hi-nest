import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => { // 테스트를 묘사..?
  let service: MoviesService;

  beforeEach(async () => { // 테스트하기전에 실행
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // getAll() 메소드를 호출한 후 result 인스턴스가 배열인지 테스트
  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    // getOne() 을 테스트 할 때 Movie 가 create 되어 있지 않다면 문제가 생길 수 있음
    it('should return a movie', () => {
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2020,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 999 not found.');
      }
    })
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2020,
      });

      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete); // afterDelete < beforeDelete
    });
    it('should return a 404', () => {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2020,
      });
      const afterCreate = service.getAll().length
      //console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      //const beforeUpdate = service.getAll()
      service.create({
        title: 'Test',
        genres: ['test'],
        year: 2020,
      });

      service.update(1, {
        year: 2025
      });

      //const afterUpdate = service.getAll()
      //console.log(beforeUpdate, afterUpdate)
      const movie = service.getOne(1)
      expect(movie.year).toEqual(2025);
    })

    it('should throw a NotFoundException', () => {
      try{
        service.deleteOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    })
  })


  // it('should be 4', () => {
  //   expect(2+2).toEqual(4);
  // })


});
