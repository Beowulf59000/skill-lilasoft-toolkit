import { HandlerInput } from "ask-sdk-core";
export default class HandlersHelper {
    canHandleRequest(handlerInput: HandlerInput, expectedRequest: string): boolean;
    canHandleRequestWithIntents(handlerInput: HandlerInput, expectedIntent: string): boolean;
}
