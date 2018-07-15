import { HandlerInput } from "ask-sdk";
import {  Response } from 'ask-sdk-model'; 

export default class SpeakersHelper {
    private async completeSpeak(handlerInput: HandlerInput, message: string, reprompt: string, cardMessage: string, skillName: string): Promise<Response>
    {
        let responseBuilder = handlerInput.responseBuilder;
        
        if(!message) responseBuilder = responseBuilder.speak(message);
        if(!reprompt) responseBuilder = responseBuilder.reprompt(reprompt);
        if(!skillName && !cardMessage) responseBuilder = responseBuilder.withSimpleCard(skillName, cardMessage);
        return responseBuilder.getResponse();
    };

    public async speak(handlerInput: HandlerInput, message: string): Promise<Response> {
        return this.completeSpeak(handlerInput, message, null, null, null);    
    };

    public async speakWithReprompt(handlerInput: HandlerInput, message: string, reprompt: string): Promise<Response> {
        return this.completeSpeak(handlerInput, message, reprompt, null, null);
    };

    public async speakWithSimpleCard(handlerInput: HandlerInput, message: string, skillName: string): Promise<Response> {
        return this.completeSpeak(handlerInput, message, null, message, skillName);
    };

    public async speakWithSimpleCardAndCardMessage(handlerInput: HandlerInput, message: string, cardMessage: string, skillName: string): Promise<Response> {
        return this.completeSpeak(handlerInput, message, null, cardMessage, skillName);
    };

    public async speakWithRepromptAndSimpleCard(handlerInput: HandlerInput, message: string, reprompt: string, skillName: string): Promise<Response> {
        return this.completeSpeak(handlerInput, message, reprompt, message, skillName);
    };

    public async speakWithRepromptAndSimpleCardAndCardMessage(handlerInput: HandlerInput, message: string, reprompt: string, cardMessage: string, skillName: string): Promise<Response> {
        return this.completeSpeak(handlerInput, message, reprompt, cardMessage, skillName);
    };
};