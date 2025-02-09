import { IsEmail, IsStrongPassword } from 'class-validator';

// DTO класс с использованием валидации с помощью аннотаций из библиотеки class-validator
export class CreateUserRequest {
  // Заготовленная аннотация из библиотеки class-validator.
  // Проверяет что данный класс является email'ом
  @IsEmail()
  email: string;

  // Заготовленная аннотация из библиотеки class-validator.
  // Проверяет что данный класс является сильным паролем
  @IsStrongPassword()
  password: string;
}
