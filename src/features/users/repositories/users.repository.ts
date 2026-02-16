import { ObjectId, type WithId } from "mongodb";
import { usersCollection } from "../../../db/mongo";
import type { UserDb } from "../types/users.db.type";
import { UserView } from "../types/users.view.type";

export const usersRepository = {
  async create(dto: UserDb): Promise<string> {
    const result = await usersCollection.insertOne(dto);

    return result.insertedId.toString();
  },

  async deleteById(id: string): Promise<boolean> {
    const deleteResult = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      return false;
    }

    return true;
  },

  async findByLoginOrEmail(
    loginOrEmail: string,
  ): Promise<WithId<UserDb> | null> {
    return usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  },

  async isExistByLoginOrEmail(
    login: string,
    email: string,
  ): Promise<WithId<UserDb> | null> {
    return usersCollection.findOne({
      $or: [{ login }, { email }],
    });
  },

  async findOneById(id: string): Promise<UserDb | null> {
    const item = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!item) {
      return null;
    }

    return item;
  },
};
