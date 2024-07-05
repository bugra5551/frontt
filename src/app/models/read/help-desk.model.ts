import { User } from "./user.model";

export interface HelpDesk {
    chatId?: number;
    userId: number;
    carId: number;
    messageId: number; // 1: Servis, 0: Müşteri
    message: string;
    messageDate: Date;
    user?: User;
  }