import type { UserModel } from "./UserModel";

export type LoginData = {
  user: UserModel,
  token: string,
};
