import { Message } from "@/types/Message.type";

const INICIALmessages: Message[] = [
    {
        text: 'Como posso te ajudar hoje ?',
        sentDate: new Date().toISOString(),
        sent: false,
        messageAuthor: 'Cecilia',
    },
];

export const useApi = () => ({
    getAllMessages: async () => {
        const messages: Message[] = [...INICIALmessages];

        return messages;
    },
})