import { HandlerInput } from "ask-sdk-core";
import { Response } from 'ask-sdk-model';
export default class SpeakersHelper {
    speak(handlerInput: HandlerInput, message?: string, reprompt?: string, cardMessage?: string, skillName?: string): Promise<Response>;
}
