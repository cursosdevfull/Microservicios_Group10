import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { MedicApplication } from "../application/medic.application";
import { MedicFactory } from "../domain/roots/medic.factory";

export class MedicController {
  constructor(private readonly application: MedicApplication) {}
  async insert(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    const id = uuidv4();
    const medic = MedicFactory.create({
      id,
      ...body,
    });

    const medicResult = await this.application.save(medic);
    if (medicResult.isErr()) {
      return next(medicResult.error);
    }

    res.json(medicResult.value);
  }

  update(req: Request, res: Response) {
    res.send("Updating medic");
  }

  delete(req: Request, res: Response) {
    res.send("Deleting medic");
  }

  getAll(req: Request, res: Response) {
    res.send("Getting all medics");
  }

  getById(req: Request, res: Response) {
    res.send("Getting medic by id");
  }

  getByPage(req: Request, res: Response) {
    res.send("Getting medics by page");
  }
}
