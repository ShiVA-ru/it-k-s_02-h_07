import { ResultStatus } from "../../../core/types/result.code";
import type { Result } from "../../../core/types/result.type";
import { bcryptService } from "../../auth/application/bcrypt.service";
import { usersRepository } from "../repositories/users.repository";
import type { UserDb } from "../types/users.db.type";
import type { UserInput } from "../types/users.input.type";

export const usersService = {
  async create(dto: UserInput): Promise<Result<{ insertedId: string } | null>> {
    const { login, password, email } = dto;

    const existUser = await usersRepository.isExistByLoginOrEmail(login, email);

    if (existUser) {
      const errorResult: Result<null> = {
        status: ResultStatus.BadRequest,
        errorMessage: "Bad Request",
        data: null,
        extensions: [{ field: "loginOrEmail", message: "Already Registered" }],
      };
      return errorResult;
    }

    const passwordHash = await bcryptService.generateHash(password);

    const newEntity: UserDb = {
      login,
      email,
      password: passwordHash,
      createdAt: new Date().toISOString(),
    };

    const insertedId = await usersRepository.create(newEntity);

    const successResult: Result<{ insertedId: string }> = {
      status: ResultStatus.Success,
      extensions: [],
      data: { insertedId: insertedId },
    };

    return successResult;
  },

  async deleteById(id: string): Promise<boolean> {
    return await usersRepository.deleteById(id);
  },
};
