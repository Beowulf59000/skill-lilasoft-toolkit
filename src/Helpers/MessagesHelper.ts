import { format } from "string-format";

export default class MessagesHelper {
    public getRandomMessage(messages:string[]) : string {
        let i = 0;
        i = Math.floor(Math.random() * messages.length);
        return (messages[i]);
    };

    public getRandomMessageWithParameter(messages: string[], parameter): string {
        let message = this.getRandomMessage(messages);
        return format(message, parameter);
    }
};