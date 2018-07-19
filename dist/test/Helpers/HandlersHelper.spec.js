"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = require("../../src/Helpers");
const Intents_1 = require("../../src/Intents");
const chai_1 = require("chai");
const Requests_1 = require("../../src/Requests");
describe("HandlersHelper", () => {
    describe("canHandleRequest", () => {
        it("it throws TypeError when request is undefined", () => {
            const helper = new Helpers_1.HandlersHelper();
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            let fn = () => helper.canHandleRequest(handlerInput, Intents_1.HELP_INTENT);
            chai_1.assert.throws(fn, TypeError, "Cannot read property 'request' of undefined");
        });
        it("it can handle request if request type equal expected request", () => {
            const helper = new Helpers_1.HandlersHelper();
            let request = {
                type: Requests_1.LAUNCH_REQUEST,
                requestId: undefined,
                timestamp: undefined,
                locale: undefined
            };
            let requestEnvelope = {
                version: "1.0",
                request: request,
                context: undefined
            };
            const handlerInput = { requestEnvelope: requestEnvelope, attributesManager: undefined, responseBuilder: undefined };
            const isHandled = helper.canHandleRequest(handlerInput, Requests_1.LAUNCH_REQUEST);
            chai_1.assert.isTrue(isHandled);
        });
    });
    describe("canHandleRequestWithIntents", () => {
        it("it throws TypeError when request is undefined", () => {
            const helper = new Helpers_1.HandlersHelper();
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            let fn = () => helper.canHandleRequestWithIntents(handlerInput, Intents_1.HELP_INTENT);
            chai_1.assert.throws(fn, TypeError, "Cannot read property 'request' of undefined");
        });
        it("it returns false when request type is not IntentRequest", () => {
            const helper = new Helpers_1.HandlersHelper();
            let request = {
                type: Requests_1.LAUNCH_REQUEST,
                requestId: undefined,
                timestamp: undefined,
                locale: undefined
            };
            let requestEnvelope = {
                version: "1.0",
                request: request,
                context: undefined
            };
            const handlerInput = { requestEnvelope: requestEnvelope, attributesManager: undefined, responseBuilder: undefined };
            const isHandled = helper.canHandleRequestWithIntents(handlerInput, Intents_1.HELP_INTENT);
            chai_1.assert.isFalse(isHandled);
        });
        it("it returns true when Intents contains intent type name", () => {
            const helper = new Helpers_1.HandlersHelper();
            let request = {
                type: Requests_1.INTENT_REQUEST,
                dialogState: undefined,
                requestId: undefined,
                timestamp: undefined,
                locale: undefined,
                intent: { name: Intents_1.HELP_INTENT, confirmationStatus: undefined }
            };
            let requestEnvelope = {
                version: "1.0",
                request: request,
                context: undefined
            };
            const handlerInput = { requestEnvelope: requestEnvelope, attributesManager: undefined, responseBuilder: undefined };
            const isHandled = helper.canHandleRequestWithIntents(handlerInput, Intents_1.CANCEL_INTENT);
            chai_1.assert.isTrue(isHandled);
        });
    });
});
//# sourceMappingURL=HandlersHelper.spec.js.map