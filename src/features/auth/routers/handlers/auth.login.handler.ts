import type { Response } from "express";
import { HttpStatus } from "../../../../core/types/http-statuses.types";
import type { RequestWithBody } from "../../../../core/types/request.types";
import { authService } from "../../application/auth.service";
import type { LoginInput } from "../../types/login.input.type";
import { isSuccessResult } from "../../../../core/utils/type-guards";

export const loginHandler = async (
  req: RequestWithBody<LoginInput>,
  res: Response,
) => {
  const { loginOrEmail, password } = req.body;

  const result = await authService.loginUser(loginOrEmail, password);

  if (!isSuccessResult(result)) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  return res.status(HttpStatus.Ok).json(result.data);
};
