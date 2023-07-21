import User from "../../dto/user.dto";
import MongoAction from "../../mongo";

export default async (user: User) => {
  const action = new MongoAction();
  return await action.findOneAndUpdate('Username', user.Username, 'users', 'Email', user.Email!);
}