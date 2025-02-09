import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Создание параметризованного декоратора
// ExecutionContext - Интерфейс, описывающий подробности (context) о текущем конвейере (pipeline) запроса (request).
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

// Получение данных пользователя из констекста http запроса (request)
const getCurrentUserByContext = (context: ExecutionContext) =>
  context.switchToHttp().getRequest().user;
