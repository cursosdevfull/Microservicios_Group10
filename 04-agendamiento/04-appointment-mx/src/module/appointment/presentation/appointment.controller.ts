import { AppointmentApplication } from "../application/appointment.application";

export class AppointmentController {
  constructor(private readonly application: AppointmentApplication) {}

  async listen() {
    this.application.receive();
  }
}
