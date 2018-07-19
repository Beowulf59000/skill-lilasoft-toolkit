import { SpeakersHelper, HandlersHelper, MessagesHelper } from "../Helpers";
import { Response } from "ask-sdk-model";
import { RequestHandler, HandlerInput } from "ask-sdk-core";
export default class LilaIntentHandler implements RequestHandler {
    intentName: string;
    messages: string[];
    reprompts: string[];
    handlersHelper: HandlersHelper;
    speakersHelper: SpeakersHelper;
    messagesHelper: MessagesHelper;
    constructor(intentName: string, messages?: string[], reprompts?: string[], handlersHelper?: HandlersHelper, speakersHelper?: SpeakersHelper, messagesHelper?: MessagesHelper);
    canHandle(handlerInput: HandlerInput): boolean;
    handle(handlerInput: HandlerInput): Promise<Response>;
}
