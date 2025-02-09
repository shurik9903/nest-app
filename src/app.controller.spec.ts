import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';

// Описание тестирование сервиса находится в директории /users

// Тестирование app.controller.ts
// describe(имя, lambda функция) - описание теста
describe('AppController', () => {
  let appController: AppController;

  // Перед начало тестирование. Подготовка данных для тестирования.
  beforeEach(async () => {
    // Создание локального пользовательского тестового модуля и компиляция
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        PostModule,
        DrizzleModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      providers: [
        AppService,
        PostService,
        {
          provide: 'TEST',
          useValue: 1,
        },
      ],
    }).compile();

    // Получение контроллера AppController из app.controller.ts для дальнейшего тестирования
    appController = app.get<AppController>(AppController);
  });

  // Описание теста
  describe('root', () => {
    // Создание закрытого теста. (Тестирование)
    // it(имя теста, lambda функция)
    it('should return "id"', () => {
      // Ожидает что метод getHello с значением '1' на входе вернет значение '1' на выходе
      expect(appController.getHello(1)).toBe(1);
    });
  });
});
