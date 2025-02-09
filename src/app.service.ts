import { Inject, Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { DRIZZLE } from './drizzle/drizzle.module';
import { DrizzleDB } from './drizzle/types/drizzle';
import { PostService } from './post/post.service';

@Injectable() // Указание что данный экспортируемый класс явлется Инъекционным
export class AppService {
  constructor(
    @Inject('TEST') private test: number, // @Inject Декоратор,
    // который отмечает параметр конструктора в качестве цели для инъекции зависимостей (DI).
    // С возможностью указать конретное имя Inject класса.
    // В данном случае будет экспортирован раннее подготовленный в app.module.ts:providers провайдера TEST
    // с заготовленным значением числовым значением "useValue: 1"
    private readonly postService: PostService, // Автоматический Inject провайдера с типом PostService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async save(dto: CreateDto) {
    console.log(this.test);
    const res = this.postService.insert(dto);
    return res;
  }
}
