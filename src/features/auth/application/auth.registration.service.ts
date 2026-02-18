import { ResultStatus } from "../../../core/types/result.code";
import type { Result } from "../../../core/types/result.type";
import { usersRepository } from "../../users/repositories/users.repository";
import type { ConfirmationInput } from "../types/confirmation.input.type";

export const registrationService = {
  async confirmEmail(dto: ConfirmationInput): Promise<Result<Object | null>> {
    const findUserWithCode = await usersRepository.findOneByConfirmationCode(
      dto.code,
    );

    if (!findUserWithCode) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: "Bad Request",
        data: null,
        extensions: [{ field: "code", message: "Code not found" }],
      };
    }

    const updatedResult = await usersRepository.updateUserConfirmationData(
      findUserWithCode._id,
    );

    if (!updatedResult) {
      return {
        status: ResultStatus.BadRequest,
        errorMessage: "Bad Request",
        data: null,
        extensions: [{ field: "code", message: "Code not updated" }],
      };
    }

    return {
      status: ResultStatus.Success,
      extensions: [],
      data: {},
    };
  },
};
