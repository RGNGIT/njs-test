import User from "../../dto/user.dto";
import logger from "../../logger";
import MongoAction from "../../mongo";

export default async (username: string): Promise<User> => {
  const action = new MongoAction();
  const user = await action.findOne('Username', 'users', username);
  user && logger.log('message', `Юзер ${JSON.stringify(user)} был найден и возвращен в гейтвей!`, 'M2-user-processor');
  return user;
}