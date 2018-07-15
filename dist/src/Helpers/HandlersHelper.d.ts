import { HandlerInput } from "ask-sdk";
export default class HandlersHelper {
    canHandleRequest(handlerInput: HandlerInput, expectedRequest: string): boolean;
    canHandleRequestWithIntents(handlerInput: HandlerInput, expectedIntents: string[]): boolean;
}
