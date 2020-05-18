import { UserModel } from "./UserModel"
export interface MessageModel {
    messageId: string
    message: string
    user: UserModel
    createdAt: string
    imageUrl?: any
    channelId: string
}