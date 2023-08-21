import { err, ok, Result } from "neverthrow";
import { validate } from "uuid";

import { IdException } from "../exceptions/id.exception";

export type IdVOResult = Result<IdVO, IdException>;
export class IdVO {
  private constructor(private readonly value: string) {}
  static create(value: string): IdVOResult {
    if (validate(value)) return ok(new IdVO(value));

    return err(new IdException());
  }

  getvalue(): string {
    return this.value;
  }
}
