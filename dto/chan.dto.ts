import { ActionType } from "./enums";
import User from "./user.dto";

export default class ChannelMessage {
  TaskType: string;
  ActionType: ActionType;
  Message: any;
}