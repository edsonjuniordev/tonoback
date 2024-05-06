import { UUIDGenerator } from "../../../package/uuid-generator";

export enum TransactionType {
  IN = "IN",
  OUT = "OUT"
}

export type TransactionProps = {
  id: string;
  accountId: string;
  categoryId: string;
  type: TransactionType;
  description: string;
  value: number;
  transactionDate: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TransactionCreateDto = {
  accountId: string;
  categoryId: string;
  type: TransactionType;
  description: string;
  value: number;
  transactionDate: string;
};

export type TransactionWithDto = {
  id: string;
  accountId: string;
  categoryId: string;
  type: TransactionType;
  description: string;
  value: number;
  transactionDate: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Transaction {
  private constructor(private transactionProps: TransactionProps) {}

  public static create({
    accountId,
    categoryId,
    type,
    description,
    value,
    transactionDate,
  }: TransactionCreateDto): Transaction {
    const id = UUIDGenerator.generate();
    const now = new Date();
    return new Transaction({
      id,
      accountId,
      categoryId,
      type,
      description,
      value,
      transactionDate,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static with({
    id,
    accountId,
    categoryId,
    type,
    description,
    value,
    transactionDate,
    createdAt,
    updatedAt,
  }: TransactionWithDto): Transaction {
    return new Transaction({
      id,
      accountId,
      categoryId,
      type,
      description,
      value,
      transactionDate,
      createdAt,
      updatedAt,
    });
  }

  public get id(): string {
    return this.transactionProps.id;
  }

  public get accountId(): string {
    return this.transactionProps.accountId;
  }

  public get categoryId(): string {
    return this.transactionProps.categoryId;
  }

  public get type(): TransactionType {
    return this.transactionProps.type;
  }

  public get description(): string {
    return this.transactionProps.description;
  }

  public get calue(): number {
    return this.transactionProps.value;
  }

  public get transactionDate(): string {
    return this.transactionProps.transactionDate;
  }

  public get createdAt(): Date | undefined {
    return this.transactionProps.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.transactionProps.updatedAt;
  }
}
