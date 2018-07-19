import { SpeakersHelper, HandlersHelper, MessagesHelper } from "../Helpers";
import { Response } from "ask-sdk-model";
import { RequestHandler, HandlerInput } from "ask-sdk-core";
export default class LilaRequestHandler implements RequestHandler {
    requestName: string;
    messages: string[];
    reprompts: string[];
    handlersHelper: HandlersHelper;
    speakersHelper: SpeakersHelper;
    messagesHelper: MessagesHelper;
    constructor(requestName: string, messages?: string[], reprompts?: string[], handlersHelper?: HandlersHelper, speakersHelper?: SpeakersHelper, messagesHelper?: MessagesHelper);
    canHandle(handlerInput: HandlerInput): boolean;
    handle(handlerInput: HandlerInput): Promise<Response>;
}
