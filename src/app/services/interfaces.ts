export interface Chat {
    chatId: any,
    messages: Array<Message>
}

export interface Message {
    senderId: string,
    senderName: string,
    content: string,
    timestamp?: Date
}

export interface UserConvo {
    uid: string,
    name: string,
    chatId: string,
    timestamp?: Date
}

export interface User {
    uid: string,
    name: string,
    email: string,
    conversations?: Array<any>
}