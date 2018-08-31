import { SpeakersHelper, HandlersHelper, MessagesHelper, LoggingHelper } from "../Helpers";
import { Response } from "ask-sdk-model";
import { RequestHandler, HandlerInput } from "ask-sdk-core";
import { ClassLogger } from 'rich-logger-decorator';

@ClassLogger()
export default class LilaIntentHandler implements RequestHandler {
    intentName: string;
    messages: string[];
    reprompts: string[];
    handlersHelper: HandlersHelper;
    speakersHelper: SpeakersHelper;
    messagesHelper: MessagesHelper;
    loggingHelper: LoggingHelper;
    canHandleRequest: (intentName: string,  handlersHelper: HandlersHelper, handlerInput: HandlerInput) => boolean;
    handleRequest: (messagesHelper: MessagesHelper, speakersHelper: SpeakersHelper, handlerInput: HandlerInput, messages?: string[], reprompts?: string[]) => Promise<Response>;
    
    constructor(intentName: string, messages?: string[], reprompts?: string[], handlersHelper?: HandlersHelper, speakersHelper?: SpeakersHelper, messagesHelper?: MessagesHelper, loggingHelper?: LoggingHelper) {
        this.intentName = intentName;
        this.messages = messages;
        this.reprompts = reprompts;
        this.handlersHelper = (handlersHelper) ? handlersHelper : new HandlersHelper();
        this.speakersHelper = (speakersHelper) ? speakersHelper : new SpeakersHelper();
        this.messagesHelper = (messagesHelper) ? messagesHelper : new MessagesHelper();
        this.loggingHelper = (loggingHelper) ? loggingHelper : new LoggingHelper();

        this.canHandleRequest = (intentName: string,  handlersHelper: HandlersHelper, handlerInput: HandlerInput): boolean => {
            if(!intentName) { return true; }
            return handlersHelper.canHandleRequestWithIntents(handlerInput, intentName);
        };
        this.handleRequest = (messagesHelper: MessagesHelper, speakersHelper: SpeakersHelper, handlerInput: HandlerInput, messages?: string[], reprompts?: string[]): Promise<Response> => {
            return speakersHelper.speak(handlerInput, messagesHelper.getRandomMessage(messages), messagesHelper.getRandomMessage(reprompts));
        };
    }


    public canHandle(handlerInput: HandlerInput): boolean {
        return this.loggingHelper.logException(this.canHandleRequest, true, this.intentName, this.handlersHelper, handlerInput);
    };

    public async handle(handlerInput: HandlerInput): Promise<Response> {
        return this.loggingHelper.logException(this.handleRequest, true, this.messagesHelper, this.speakersHelper, handlerInput, this.messages, this.reprompts);
    }
}