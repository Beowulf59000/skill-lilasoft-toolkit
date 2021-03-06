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
    speak(handlerInput, message, reprompt, cardMessage, skillName) {
        return __awaiter(this, void 0, void 0, function* () {
            let responseBuilder = handlerInput.responseBuilder;
            if (message !== undefined) {
                responseBuilder = responseBuilder.speak(message);
            }
            if (reprompt !== undefined) {
                responseBuilder = responseBuilder.reprompt(reprompt);
            }
            if (skillName !== undefined && cardMessage !== undefined) {
                responseBuilder = responseBuilder.withSimpleCard(skillName, cardMessage);
            }
            ;
            return responseBuilder.getResponse();
        });
    }
    ;
}
exports.default = SpeakersHelper;
;
//# sourceMappingURL=SpeakersHelper.js.map