import { Router } from "express";
import { inputValidationResultMiddleware } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { userInputDtoValidation } from "../../users/validation/users.input-dto.validation.middleware";
import { accessTockenGuardMiddleware } from "../middlewares/access-token.guard";
import { loginInputDtoValidation } from "../validation/auth.input-dto.validation.middleware";
import { confirmationCodeValidation } from "../validation/auth.registration-confirm.validation.middleware";
import { loginHandler } from "./handlers/auth.login.handler";
import { getMeHandler } from "./handlers/auth.me.get-user.hanler";
import { registrationHandler } from "./handlers/auth.registration.handler";
import { registrationConfirmationHandler } from "./handlers/auth.registration-confirmation.handler";

export const authRouter = Router();

authRouter
  .post(
    "/login",
    loginInputDtoValidation,
    inputValidationResultMiddleware,
    loginHandler,
  )
  .get("/me", accessTockenGuardMiddleware, getMeHandler)
  .post(
    "/registration",
    userInputDtoValidation,
    inputValidationResultMiddleware,
    registrationHandler,
  )
  .post(
    "/registration-confirmation",
    confirmationCodeValidation,
    inputValidationResultMiddleware,
    registrationConfirmationHandler,
  )
  .post("/registration-email-resending");

//FIX Нужно ли выносить валидацию пользователя в CORE?

/*TODO
  # Проверяем, кому принадлежит проверочный код
  # Был ли этот пользователь подтвержден
  # Смотрим время жизни
  # Меняем статус подтверждения пользователя или ошибка
  # Подтвержден или нет - логиниться может
  # Добавить в БД поля - confirmationCode: jwt tocken с временем жизни ограниченным, isConfirmed: false - default
  # При повторной отправке генерируем новый токен
  # Раздельная отправка ошибка в поле - email or login
  При ошибке при отправке почты - логируем ошибку. Ошибку при отправке письма отлавливаем при помощи .catch((e) => {}) ?
  Написать registration handler
*/

/* WARNING Прочитать про SameSite / CrossSite
    HTTPOnly, Secure - для куки
*/
