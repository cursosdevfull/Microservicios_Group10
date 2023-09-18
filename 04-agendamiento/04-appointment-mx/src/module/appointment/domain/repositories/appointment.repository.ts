import { Result } from "neverthrow";

import { Appoinment } from "../roots/appointment";

export type AppoinmentPage = { results: Appoinment[]; total: number };
export type AppoinmentResult = Result<Appoinment, Error>;
export type AppoinmentListResult = Result<Appoinment[], Error>;
export type AppoinmentPageResult = Result<AppoinmentPage, Error>;

export interface AppointmentRepository {
  receive(consumer: (message: any) => void): Promise<void>;
  sendError(appointment: Appoinment): Promise<AppoinmentResult>;
}
