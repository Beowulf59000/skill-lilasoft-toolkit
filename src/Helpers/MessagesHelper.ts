import { format } from "string-format";
import { ClassLogger } from 'rich-logger-decorator';

@ClassLogger()
export default class MessagesHelper {
    public getRandomMessage(messages:string[]) : string {
        let i = 0;
        i = Math.floor(Math.random() * messages.length);
        return (messages[i]);
    };

    /* istanbul ignore next */
    public getRandomMessageWithParameter (messages: string[], parameter: any): string {
        let message = this.getRandomMessage(messages);
        return format(message, parameter);
    }
};