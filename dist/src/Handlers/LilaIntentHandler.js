"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("../Helpers");
class LilaIntentHandler {
    constructor(intentName, messages, reprompts, handlersHelper, speakersHelper, messagesHelper) {
        this.intentName = intentName;
        this.messages = messages;
        this.reprompts = reprompts;
        this.handlersHelper = (handlersHelper) ? handlersHelper : new Helpers_1.HandlersHelper();
        this.speakersHelper = (speakersHelper) ? speakersHelper : new Helpers_1.SpeakersHelper();
        this.messagesHelper = (messagesHelper) ? messagesHelper : new Helpers_1.MessagesHelper();
    }
    canHandle(handlerInput) {
        if (!this.intentName) {
            return true;
        }
        return this.handlersHelper.canHandleRequestWithIntents(handlerInput, this.intentName);
    }
    ;
    handle(handlerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = this.messagesHelper.getRandomMessage(this.messages);
            const reprompt = this.messagesHelper.getRandomMessage(this.reprompts);
            return this.speakersHelper.speak(handlerInput, message, reprompt);
        });
    }
}
exports.default = LilaIntentHandler;
//# sourceMappingURL=LilaIntentHandler.js.map