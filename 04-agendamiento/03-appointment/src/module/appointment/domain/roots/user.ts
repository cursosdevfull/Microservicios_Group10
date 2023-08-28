export interface UserEssentials {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly email: string;
  readonly roles: number[];
  password: string;
}

export interface UserOptionals {
  readonly refreshToken: string;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

export type UserProps = UserEssentials & Partial<UserOptionals>;

export type UserUpdateProps = Partial<
  Omit<UserEssentials, "id" | "email"> &
    Omit<UserOptionals, "isActive" | "createdAt" | "updatedAt" | "deletedAt">
>;

export class User {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private isActive: boolean;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;
  private roles: number[];

  constructor(props: UserProps) {
    Object.assign(this, props);
    this.isActive = true;
    this.createdAt = this.createdAt ?? new Date();
  }

  properties(): UserProps {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      isActive: this.isActive,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  delete() {
    this.isActive = false;
    this.deletedAt = new Date();
  }

  update(props: UserUpdateProps) {
    if (this.isActive) {
      Object.assign(this, props);
      this.updatedAt = new Date();
    }
  }
}
