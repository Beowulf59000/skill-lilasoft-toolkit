import { HandlerInput } from "ask-sdk";
import { Response } from 'ask-sdk-model';
export default class SpeakersHelper {
    private completeSpeak;
    speak(handlerInput: HandlerInput, message: string): Promise<Response>;
    speakWithReprompt(handlerInput: HandlerInput, message: string, reprompt: string): Promise<Response>;
    speakWithSimpleCard(handlerInput: HandlerInput, message: string, skillName: string): Promise<Response>;
    speakWithSimpleCardAndCardMessage(handlerInput: HandlerInput, message: string, cardMessage: string, skillName: string): Promise<Response>;
    speakWithRepromptAndSimpleCard(handlerInput: HandlerInput, message: string, reprompt: string, skillName: string): Promise<Response>;
    speakWithRepromptAndSimpleCardAndCardMessage(handlerInput: HandlerInput, message: string, reprompt: string, cardMessage: string, skillName: string): Promise<Response>;
}
