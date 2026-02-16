import * as dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || "",
  mongoUrl: process.env.MONGO_URL || "",
  dbName: process.env.DB_NAME || "",
  blogCollectionName: process.env.BLOG_COLLECTION_NAME || "",
  postCollectionName: process.env.POST_COLLECTION_NAME || "",
  userCollectionName: process.env.USER_COLLECTION_NAME || "",
  commentCollectionName: process.env.COMMENT_COLLECTION_NAME || "",
  adminUsername: process.env.ADMIN_USERNAME || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY || "",
  tokenExpireTime: process.env.TOKEN_EXPIRE_TIME || 60,
};

export default config;
