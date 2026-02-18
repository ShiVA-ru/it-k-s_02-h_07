import { randomUUID } from "node:crypto";
import dayjs from "dayjs";
import { emailAdapter } from "../../../adapters/email.adapter";
import { ResultStatus } from "../../../core/types/result.code";
import type { Result } from "../../../core/types/result.type";
import { bcryptService } from "../../auth/application/bcrypt.service";
import { usersRepository } from "../repositories/users.repository";
import type { UserDb } from "../types/users.db.type";
import type { UserInput } from "../types/users.input.type";

export const usersService = {
  async create(
    dto: UserInput,
    isConfirmed: boolean = false,
  ): Promise<Result<{ insertedId: string } | null>> {
    const { login, password, email } = dto;

    const isUserExist = await usersRepository.isExistByLoginOrEmail(
      login,
      email,
    );

    if (isUserExist) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: "Bad Request",
        data: null,
        extensions: [{ field: "loginOrEmail", message: "Already Registered" }],
      };
    }

    const passwordHash = await bcryptService.generateHash(password);

    const newEntity: UserDb = {
      login,
      email,
      password: passwordHash,
      createdAt: new Date().toISOString(),
      isEmailConfirmed: isConfirmed,
      confirmationCode: isConfirmed ? null : randomUUID(),
      confirmationCodeExpirationDate: isConfirmed
        ? null
        : dayjs().add(1, "hour").toISOString(),
    };

    if (!isConfirmed) {
      emailAdapter
        .sendEmail(
          email,
          `<h1>Thank for your registration</h1>
         <p>To finish registration please follow the link below:
            <a href='https://somesite.com/confirm-email?code=${newEntity.confirmationCode}'>complete registration</a>
         </p>
         `,
        )
        .catch((e) => {
          console.error(e);
        });
    }
    console.log("confirmationCode", newEntity.confirmationCode);
    console.log(
      "confirmationCodeExpirationDate",
      newEntity.confirmationCodeExpirationDate,
    );

    const insertedId = await usersRepository.create(newEntity);

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: { insertedId },
    };
  },

  async deleteById(id: string): Promise<boolean> {
    return await usersRepository.deleteById(id);
  },
};
