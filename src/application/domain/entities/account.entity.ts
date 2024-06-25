import { UUIDGenerator } from "@package/uuid-generator";

export enum AccountType {
  CHECKING = "CHECKING",
  INVESTMENT = "INVESTMENT",
  CASH = "CASH",
}

export type AccountProps = {
  id: string;
  userId: string;
  name: string;
  balance: number;
  color: string;
  type: AccountType;
  createdAt?: Date;
  updatedAt?: Date;
};

export type AccountCreateDto = {
  userId: string;
  name: string;
  balance: number;
  color: string;
  type: AccountType;
}

export type AccountWithDto = {
  id: string;
  userId: string;
  name: string;
  balance: number;
  color: string;
  type: AccountType;
  createdAt: Date;
  updatedAt: Date;
}

export class Account {
  private constructor(private accountProps: AccountProps) { }

  public static create({
    userId,
    name,
    balance,
    color,
    type,
  }: AccountCreateDto): Account {
    const id = UUIDGenerator.generate();
    const now = new Date();
    return new Account({
      id,
      userId,
      name,
      balance,
      color,
      type,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static with({
    id,
    userId,
    name,
    balance,
    color,
    type,
    createdAt,
    updatedAt
  }: AccountWithDto): Account {
    return new Account({
      id,
      userId,
      name,
      balance,
      color,
      type,
      createdAt,
      updatedAt,
    });
  }

  public get id(): string {
    return this.accountProps.id;
  }

  public get userId(): string {
    return this.accountProps.userId;
  }

  public get name(): string {
    return this.accountProps.name;
  }

  public get balance(): number {
    return this.accountProps.balance;
  }

  public get color(): string {
    return this.accountProps.color;
  }

  public get type(): AccountType {
    return this.accountProps.type;
  }

  public get createdAt(): Date | undefined {
    return this.accountProps.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.accountProps.updatedAt;
  }

  public setName(name: string) {
    this.accountProps.name = name;
    this.changed();
  }

  public setBalance(balance: number) {
    this.accountProps.balance = balance;
    this.changed();
  }

  public setColor(color: string) {
    this.accountProps.color = color;
    this.changed();
  }

  public setType(type: AccountType) {
    this.accountProps.type = type;
    this.changed();
  }

  private changed(): void {
    this.accountProps.updatedAt = new Date();
  }
}
