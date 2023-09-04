import { Appoinment, AppoinmentProps } from "./appointment";

export class AppoinmentFactory {
  private constructor() {}

  static async create(props: AppoinmentProps): Promise<Appoinment> {
    return new Appoinment(props);
  }
}
