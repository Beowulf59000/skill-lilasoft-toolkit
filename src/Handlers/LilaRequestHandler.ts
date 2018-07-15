import { SpeakersHelper, HandlersHelper, MessagesHelper } from "../Helpers";
import { Response } from "ask-sdk-model";
import { RequestHandler, HandlerInput } from "ask-sdk";

export default class LilaRequestHandler implements RequestHandler {
    requestName: string;
    messages: string[];
    reprompts: string[];
    handlersHelper: HandlersHelper;
    speakersHelper: SpeakersHelper;
    messagesHelper: MessagesHelper;
    
    constructor(requestName: string, messages?: string[], reprompts?: string[], handlersHelper?: HandlersHelper, speakersHelper?: SpeakersHelper, messagesHelper?: MessagesHelper) {
        this.requestName = requestName;
        this.messages = messages;
        this.reprompts = reprompts;
        this.handlersHelper = (handlersHelper) ? handlersHelper : new HandlersHelper();
        this.speakersHelper = (speakersHelper) ? speakersHelper : new SpeakersHelper();
        this.messagesHelper = (messagesHelper) ? messagesHelper : new MessagesHelper();
    }

    public canHandle(handlerInput: HandlerInput): boolean {
        if(!this.requestName) {
            return true;
        }

        return this.handlersHelper.canHandleRequest(handlerInput, this.requestName); 
    };

    public async handle(handlerInput: HandlerInput): Promise<Response> {
        const message = this.messagesHelper.getRandomMessage(this.messages);
        const reprompt = this.messagesHelper.getRandomMessage(this.reprompts);
        
        return this.speakersHelper.speakWithReprompt(handlerInput, message, reprompt);
    }
}