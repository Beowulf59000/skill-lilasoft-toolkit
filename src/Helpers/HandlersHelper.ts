import { HandlerInput } from "ask-sdk";
import { IntentRequest } from 'ask-sdk-model';

export default class HandlersHelper {
    public canHandleRequest(handlerInput: HandlerInput, expectedRequest: string): boolean {
        return handlerInput.requestEnvelope.request.type === expectedRequest;
    };

    public canHandleRequestWithIntents(handlerInput: HandlerInput, expectedIntents: string[]): boolean {
        if(handlerInput.requestEnvelope.request.type !== 'IntentRequest') {
            return false;
        }

        const targetHandlerName = (<IntentRequest>handlerInput.requestEnvelope.request).intent.name;
        return expectedIntents.indexOf(targetHandlerName) > -1;
    };
};