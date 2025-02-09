import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';

// Контроллер точки доступа сервера
@Controller('api/v1')
export class AppController {
  constructor(
    private readonly appService: AppService, // Автоматический Inject провайдера с типом AppService из модуля app.module.ts:providers
  ) {}

  // @Get - REST API Get запрос по указаному пути
  @Get('get/:id')
  getHello(
    // @Param(имя, тип для преобразования) - Параметр пути с указаным именем с преобразованием одних данных к другим
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (id < 1) {
      // throw new Error('error');
      throw new BadRequestException('Id должно быть больше нуля');
    }
    return id;
  }

  // @UsePipes - Использования Pipes (Паттерн цепочка обязанностей) для предворительной обработки/работы с данными.
  // В данном случае указывается класс для валидации данных ValidationPipe
  // Валидационным классом является CreateDto
  // в нем используется валидация над переменными посредством аннотаций из библиотеки class-validator.
  @UsePipes(new ValidationPipe())
  // @Post - REST API Post запрос по указаному пути
  @Post('create')
  create(
    @Body() dto: CreateDto, // Получение тела запроса и приведение его к указанному и раннее подготовленному DTO классу
  ) {
    return this.appService.save(dto);
  }
}
