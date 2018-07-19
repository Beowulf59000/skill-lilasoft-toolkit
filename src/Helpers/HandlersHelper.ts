import { HandlerInput } from "ask-sdk-core";
import { IntentRequest } from 'ask-sdk-model';
import { INTENT_REQUEST } from '../Requests';

export default class HandlersHelper {
    public canHandleRequest(handlerInput: HandlerInput, expectedRequest: string): boolean {
        return handlerInput.requestEnvelope.request.type === expectedRequest;
    };

    public canHandleRequestWithIntents(handlerInput: HandlerInput, expectedIntent: string): boolean {
        if(handlerInput.requestEnvelope.request.type !== INTENT_REQUEST) {
            return false;
        }

        const targetHandlerName = (<IntentRequest>handlerInput.requestEnvelope.request).intent.name;
        return expectedIntent === targetHandlerName;
    };
};