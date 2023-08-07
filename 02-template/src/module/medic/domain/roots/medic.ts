import { Specialty } from "../entities/specialty";

export interface MedicEssentials {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly dni: string;
  readonly email: string;
  readonly cmp: string;
}

export interface MedicOptionals {
  readonly phone: string;
  readonly gender: string;
  readonly address: string[];
  readonly nationality: string;
  readonly specialty: Specialty;
  readonly diseases: string[];
  readonly age: number;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

export type MedicProps = MedicEssentials & Partial<MedicOptionals>;

export type MedicUpdateProps = Partial<
  Omit<MedicEssentials, "id" | "email"> &
    Omit<MedicOptionals, "isActive" | "createdAt" | "updatedAt" | "deletedAt">
>;
export class Medic {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private dni: string;
  private readonly email: string;
  private cmp: string;
  private phone: string;
  private gender: string;
  private address: string[];
  private nationality: string;
  private specialty: Specialty;
  private diseases: string[];
  private age: number;
  private isActive: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(props: MedicProps) {
    Object.assign(this, props);
    this.isActive = true;
    this.createdAt = new Date();
  }

  properties(): MedicProps {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      dni: this.dni,
      email: this.email,
      cmp: this.cmp,
      phone: this.phone,
      gender: this.gender,
      address: this.address,
      nationality: this.nationality,
      specialty: this.specialty,
      diseases: this.diseases,
      age: this.age,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  delete() {
    this.isActive = false;
    this.deletedAt = new Date();
  }

  update(props: MedicUpdateProps) {
    if (this.isActive) {
      Object.assign(this, props);
      this.updatedAt = new Date();
    }
  }
}
