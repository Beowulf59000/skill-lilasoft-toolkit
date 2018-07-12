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
class SpeakersHelper {
    completeSpeak(handlerInput, message, reprompt, cardMessage, skillName) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseBuilder = handlerInput.responseBuilder.speak(message);
            if (reprompt !== null)
                responseBuilder = responseBuilder.reprompt(reprompt);
            if (skillName !== null && cardMessage !== null)
                responseBuilder = responseBuilder.withSimpleCard(skillName, cardMessage);
            return responseBuilder.getResponse();
        });
    }
    ;
    speak(handlerInput, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.completeSpeak(handlerInput, message, null, null, null);
        });
    }
    ;
    speakWithReprompt(handlerInput, message, reprompt) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.completeSpeak(handlerInput, message, reprompt, null, null);
        });
    }
    ;
    speakWithSimpleCard(handlerInput, message, skillName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.completeSpeak(handlerInput, message, null, message, skillName);
        });
    }
    ;
    speakWithSimpleCardAndCardMessage(handlerInput, message, cardMessage, skillName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.completeSpeak(handlerInput, message, null, cardMessage, skillName);
        });
    }
    ;
    speakWithRepromptAndSimpleCard(handlerInput, message, reprompt, skillName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.completeSpeak(handlerInput, message, reprompt, message, skillName);
        });
    }
    ;
    speakWithRepromptAndSimpleCardAndCardMessage(handlerInput, message, reprompt, cardMessage, skillName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.completeSpeak(handlerInput, message, reprompt, cardMessage, skillName);
        });
    }
    ;
}
exports.default = SpeakersHelper;
;
//# sourceMappingURL=SpeakersHelper.js.map