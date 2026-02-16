import { Router } from "express";
import { inputValidationResultMiddleware } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { accessTockenGuardMiddleware } from "../middlewares/access-token.guard";
import { loginInputDtoValidation } from "../validation/auth.input-dto.validation.middleware";
import { loginHandler } from "./handlers/auth.login.handler";
import { getMeHandler } from "./handlers/auth.me.get-user.hanler";

export const authRouter = Router();

authRouter
  .post(
    "/login",
    loginInputDtoValidation,
    inputValidationResultMiddleware,
    loginHandler,
  )
  .get("/me", accessTockenGuardMiddleware, getMeHandler);
