import { UUIDGenerator } from "../../../package/uuid-generator";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  social_login: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreateDto = {
  name: string;
  email: string;
  password: string;
}

export type UserWithDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  social_login: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private userProps: UserProps) { }

  public static create({
    name,
    email,
    password
  }: UserCreateDto): User {
    const id = UUIDGenerator.generate();
    const now = new Date();
    return new User({
      id,
      name,
      email,
      password,
      social_login: false,
      createdAt: now,
      updatedAt: now,
    })
  }

  public static with({
    id,
    name,
    email,
    password,
    social_login,
    createdAt,
    updatedAt
  }: UserWithDto): User {
    return new User({
      id,
      name,
      email,
      password,
      social_login,
      createdAt,
      updatedAt
    })
  }

  public get id(): string {
    return this.userProps.id;
  }

  public get name(): string {
    return this.userProps.name;
  }

  public get email(): string {
    return this.userProps.email;
  }

  public get password(): string {
    return this.userProps.password;
  }

  public get social_login(): boolean {
    return this.userProps.social_login;
  }

  public get createdAt(): Date | undefined {
    return this.userProps.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.userProps.updatedAt;
  }
}