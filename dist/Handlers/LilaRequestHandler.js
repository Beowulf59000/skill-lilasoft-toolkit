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
class LilaRequestHandler {
    constructor(requestName, messages, reprompts) {
        this.requestName = requestName;
        this.messages = messages;
        this.reprompts = reprompts;
        this.handlersHelper = new Helpers_1.HandlersHelper();
        this.speakersHelper = new Helpers_1.SpeakersHelper();
        this.messagesHelper = new Helpers_1.MessagesHelper();
    }
    canHandle(handlerInput) {
        if (!this.requestName) {
            return true;
        }
        return this.handlersHelper.canHandleRequest(handlerInput, this.requestName);
    }
    ;
    handle(handlerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return handlerInput.responseBuilder.getResponse();
            const message = this.messagesHelper.getRandomMessage(this.messages);
            const reprompt = this.messagesHelper.getRandomMessage(this.reprompts);
            return this.speakersHelper.speakWithReprompt(handlerInput, message, reprompt);
        });
    }
}
exports.default = LilaRequestHandler;
//# sourceMappingURL=LilaRequestHandler.js.map