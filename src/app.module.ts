import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  // exports: [
  // То, что экспортирует данный модуль для доступа к данным текущего модуля во внешние модули,
  //  в которые будет импортирован данный модуль.
  // ],
  imports: [
    // Импорт модулей в текущий модуль
    PostModule,
    DrizzleModule,
    ConfigModule.forRoot({ isGlobal: true }), // Модуль конфигурации NestJS.
    // Нагружает переменные среды (.env) процесса в зависимости от флага «ignoreEnvFile» и значение «envfilepath».
    // Кроме того, регистрируют пользовательские конфигурации по всему приложению.
    // isGlobal - Если «True», регистрирует ConfigModule как глобальный модуль.
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController], // Указание контроллеров связанных с этим модулем
  providers: [
    // Сервисы/провайдеры связанные с текущим модулем или импортированым модулем (PostModule и PostService)
    AppService,
    PostService,
    {
      // Создание пользовательского провайдера (Custom providers) с именем и параметрами которые будут переданы при inject в конструкторе класса
      // https://docs.nestjs.com/fundamentals/custom-providers
      provide: 'TEST', // Имя провайдера
      useValue: 1, // Указание значения (Возможно указать значение из вне)
    },
  ],
})
export class AppModule {}
