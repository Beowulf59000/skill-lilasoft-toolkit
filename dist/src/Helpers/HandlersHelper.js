"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Requests_1 = require("../Requests");
class HandlersHelper {
    canHandleRequest(handlerInput, expectedRequest) {
        return handlerInput.requestEnvelope.request.type === expectedRequest;
    }
    ;
    canHandleRequestWithIntents(handlerInput, expectedIntent) {
        if (handlerInput.requestEnvelope.request.type !== Requests_1.INTENT_REQUEST) {
            return false;
        }
        const targetHandlerName = handlerInput.requestEnvelope.request.intent.name;
        return expectedIntent === targetHandlerName;
    }
    ;
}
exports.default = HandlersHelper;
;
//# sourceMappingURL=HandlersHelper.js.map