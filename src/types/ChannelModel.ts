import { UserModel } from "./UserModel";

export interface ChannelModel {
  name: string;
  id: string;
  direct: boolean;
  Memberships: any;
}
