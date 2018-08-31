import { HandlerInput } from "ask-sdk-core";
import {  Response } from 'ask-sdk-model'; 
import { ClassLogger } from 'rich-logger-decorator';

@ClassLogger()
export default class SpeakersHelper {
    public async speak(handlerInput: HandlerInput, message?: string, reprompt?: string, cardMessage?: string, skillName?: string): Promise<Response>
    {
        let responseBuilder = handlerInput.responseBuilder;
        
        if(message !== undefined) { responseBuilder = responseBuilder.speak(message); }
        if(reprompt !== undefined) { responseBuilder = responseBuilder.reprompt(reprompt); }
        if(skillName !== undefined && cardMessage !== undefined) { responseBuilder = responseBuilder.withSimpleCard(skillName, cardMessage) };
        return responseBuilder.getResponse();
    };
};