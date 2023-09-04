import { AppointmentRepository } from "../domain/repositories/appointment.repository";
import { Appoinment } from "../domain/roots/appointment";

export class AppointmentApplication {
  constructor(private readonly repository: AppointmentRepository) {}

  async save(appoinment: Appoinment) {
    return await this.repository.save(appoinment);
  }
}
