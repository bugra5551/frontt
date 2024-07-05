export interface HelpDeskCreateUpdate {
    userId: number;
    carId: number;
    messageId: number; // 1: Servis, 0: Müşteri
    message: string;
    messageDate: Date;
  }