import jwt from "jsonwebtoken";
import config from "../../../core/settings/config";
import type { IdType } from "../../../core/types/id.types";
import { ResultStatus } from "../../../core/types/result.code";
import type { Result } from "../../../core/types/result.type";

export const jwtService = {
  async createToken(userId: string): Promise<Result<string | null>> {
    try {
      const token = jwt.sign({ id: userId }, config.jwtPrivateKey, {
        expiresIn: +config.tokenExpireTime,
      });

      return {
        status: ResultStatus.Success,
        extensions: [],
        data: token,
      };
    } catch (error) {
      console.error(error);
      return {
        status: ResultStatus.Forbidden,
        errorMessage: "Can't create token",
        extensions: [],
        data: null,
      };
    }
  },

  async verifyToken(token: string): Promise<Result<IdType | null>> {
    try {
      const verified = jwt.verify(token, config.jwtPrivateKey) as {
        id: string;
      };
      return {
        status: ResultStatus.Success,
        extensions: [],
        data: verified,
      };
    } catch (error) {
      console.error(error);
      return {
        status: ResultStatus.Forbidden,
        errorMessage: "Can't verified token",
        extensions: [],
        data: null,
      };
    }
  },
};
