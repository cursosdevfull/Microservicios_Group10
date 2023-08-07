import { validate } from "uuid";

import { Medic, MedicProps } from "./medic";

export class MedicFactory {
  private constructor() {}

  static create(props: MedicProps): Medic {
    if (!validate(props.id)) throw new Error("Invalid id");
    if (props.age < 18 || props.age > 80) throw new Error("Invalid age");
    if (props.phone && props.phone.length < 9)
      throw new Error("Invalid phone number");

    return new Medic(props);
  }
}
