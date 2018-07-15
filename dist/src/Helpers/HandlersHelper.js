"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandlersHelper {
    canHandleRequest(handlerInput, expectedRequest) {
        return handlerInput.requestEnvelope.request.type === expectedRequest;
    }
    ;
    canHandleRequestWithIntents(handlerInput, expectedIntents) {
        if (handlerInput.requestEnvelope.request.type !== 'IntentRequest') {
            return false;
        }
        const targetHandlerName = handlerInput.requestEnvelope.request.intent.name;
        return expectedIntents.indexOf(targetHandlerName) > -1;
    }
    ;
}
exports.default = HandlersHelper;
;
//# sourceMappingURL=HandlersHelper.js.map