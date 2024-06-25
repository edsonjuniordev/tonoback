import { UUIDGenerator } from "@package/uuid-generator";
import { TransactionType } from "./transaction.entity";

export type CategoryProps = {
  id: string;
  name: string;
  userId: string;
  type: TransactionType;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoryCreateDto = {
  name: string;
  userId: string;
  type: TransactionType;
};

export type CategoryWithDto = {
  id: string;
  name: string;
  userId: string;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
};

export class Category {
  private constructor(private categoryProps: CategoryProps) {}

  public static create({
    name,
    userId,
    type,
  }: CategoryCreateDto): Category {
    const id = UUIDGenerator.generate();
    const now = new Date();
    return new Category({
      id,
      name,
      userId,
      type,
      createdAt: now,
      updatedAt: now,
    });
  }

  public static with({
    id,
    name,
    userId,
    type,
    createdAt,
    updatedAt,
  }: CategoryWithDto): Category {
    return new Category({
      id,
      name,
      userId,
      type,
      createdAt,
      updatedAt,
    });
  }

  public get id(): string {
    return this.categoryProps.id;
  }

  public get name(): string {
    return this.categoryProps.name;
  }

  public get userId(): string {
    return this.categoryProps.userId;
  }

  public get type(): TransactionType {
    return this.categoryProps.type;
  }

  public get createdAt(): Date | undefined {
    return this.categoryProps.createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.categoryProps.updatedAt;
  }
}
