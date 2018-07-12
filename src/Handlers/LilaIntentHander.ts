import { SpeakersHelper, HandlersHelper, MessagesHelper } from "../Helpers";
import { Response } from "ask-sdk-model";
import { RequestHandler, HandlerInput } from "ask-sdk";

export default class LilaIntentHandler implements RequestHandler {
    requestIntentNames: string[];
    messages: string[];
    reprompts: string[];
    handlersHelper: HandlersHelper;
    speakersHelper: SpeakersHelper;
    messagesHelper: MessagesHelper;
    
    constructor(requestIntentNames: string[], messages: string[], reprompts: string[]) {
        this.requestIntentNames = requestIntentNames;
        this.messages = messages;
        this.reprompts = reprompts;
        this.handlersHelper = new HandlersHelper();
        this.speakersHelper = new SpeakersHelper();
        this.messagesHelper = new MessagesHelper();
    }

    public canHandle(handlerInput: HandlerInput): boolean {
        if(!this.requestIntentNames) {
            return true;
        }

        return this.handlersHelper.canHandleRequestWithIntents(handlerInput, this.requestIntentNames); 
    };

    public async handle(handlerInput: HandlerInput): Promise<Response> {
        return handlerInput.responseBuilder.getResponse();

        const message = this.messagesHelper.getRandomMessage(this.messages);
        const reprompt = this.messagesHelper.getRandomMessage(this.reprompts);
        return this.speakersHelper.speakWithReprompt(handlerInput, message, reprompt);
    }
}