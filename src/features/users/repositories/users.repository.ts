import { ObjectId, type WithId } from "mongodb";
import { usersCollection } from "../../../db/mongo";
import type { UserDb } from "../types/users.db.type";

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

  async findOneByConfirmationCode(
    code: string,
  ): Promise<WithId<UserDb> | null> {
    const item = await usersCollection.findOne({ confirmationCode: code });

    if (!item) {
      return null;
    }

    return item;
  },

  async updateUserConfirmationData(_id: ObjectId): Promise<boolean> {
    const updateResult = await usersCollection.updateOne(
      { _id },
      {
        $set: {
          confirmationCode: null,
          confirmationCodeExpirationDate: null,
          isEmailConfirmed: true,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      return false;
    }

    return true;
  },
};
