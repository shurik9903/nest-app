import { IsNumber, Min } from 'class-validator';

export class CreateDto {
  // Заготовленная аннотация из библиотеки class-validator.
  // Проверяет что значение переменный равен не менее одному
  @Min(1)
  // Проверяет что значение является числом
  @IsNumber()
  num: number;
}
