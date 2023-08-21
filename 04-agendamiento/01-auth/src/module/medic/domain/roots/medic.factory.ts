import { IdVO } from "../value-objects/id.vo";
import { Medic, MedicProps } from "./medic";

export class MedicFactory {
  private constructor() {}

  static create(props: MedicProps): Medic {
    const idResult = IdVO.create(props.id);
    if (idResult.isErr()) throw idResult.error;

    if (props.age < 18 || props.age > 80) throw new Error("Invalid age");
    if (props.phone && props.phone.length < 9)
      throw new Error("Invalid phone number");

    return new Medic(props);
  }
}
