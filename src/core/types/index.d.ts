import type { IdType } from "./id.types";

declare global {
  declare namespace Express {
    export interface Request {
      user: IdType | undefined;
    }
  }
}
