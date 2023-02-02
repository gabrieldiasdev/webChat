import { Message } from "@/types/Message.type";

const TEMPORARYmessages: Message[] = [
    {
        text: 'Tive uma ideia incrível para um projeto!',
        sentDate: new Date().toISOString(),
        sent: false,
        messageAuthor: 'Cecilia',
    },
    {
        text: 'Sério? Me conta mais.',
        sentDate: new Date().toISOString(),
        sent: true,
    },
    {
        text: 'E se a gente fizesse um chat moderno e responsivo em apenas uma semana?',
        sentDate: new Date().toISOString(),
        sent: false,
        messageAuthor: 'Cecilia',
    },
    {
        text: '#boraCodar!',
        sentDate: new Date().toISOString(),
        sent: true,
    },
];

export const useApi = () => ({
    getAllMessages: async () => {
        const messages: Message[] = [...TEMPORARYmessages];

        return messages;
    },

    addMessage: async (message: Message) => {
        const newMessages: Message[] = [...TEMPORARYmessages, message];

        return newMessages;
    },
})