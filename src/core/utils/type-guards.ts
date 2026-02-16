import { ResultStatus } from "../types/result.code";
import type { Result } from "../types/result.type";

export function isSuccessResult<T>(
  result: Result<T | null>,
): result is Result<T> {
  return result.status === ResultStatus.Success && result.data !== null;
}
