import { HandlersHelper } from "../../src/Helpers";
import { HELP_INTENT, CANCEL_INTENT } from '../../src/Intents';
import { HandlerInput, ResponseBuilder } from "ask-sdk-core";
import { assert } from "chai";
import { ResponseEnvelope, RequestEnvelope, Request, IntentRequest } from "ask-sdk-model";
import { LAUNCH_REQUEST, INTENT_REQUEST } from '../../src/Requests';

describe("HandlersHelper", () => {
    describe("canHandleRequest", () => {
        it("it throws TypeError when request is undefined", () => {
            const helper: HandlersHelper = new HandlersHelper();
            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            let fn = () => helper.canHandleRequest(handlerInput, HELP_INTENT);
            assert.throws(fn, TypeError, "Cannot read property 'request' of undefined"); 
        });

        it("it can handle request if request type equal expected request", () => {
            const helper: HandlersHelper = new HandlersHelper();
            let request: Request = {
                type: LAUNCH_REQUEST,
                requestId: undefined,
                timestamp: undefined,
                locale: undefined
            };
            let requestEnvelope: RequestEnvelope = {
                version: "1.0",
                request: request,
                context: undefined
            };
            const handlerInput: HandlerInput = { requestEnvelope: requestEnvelope, attributesManager: undefined, responseBuilder: undefined};
            const isHandled = helper.canHandleRequest(handlerInput, LAUNCH_REQUEST);
            assert.isTrue(isHandled);
        });
    });

    describe("canHandleRequestWithIntents", () => {
        it("it throws TypeError when request is undefined", () => {
            const helper: HandlersHelper = new HandlersHelper();
            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            let fn = () => helper.canHandleRequestWithIntents(handlerInput, [HELP_INTENT]);
            assert.throws(fn, TypeError, "Cannot read property 'request' of undefined"); 
        });

        it("it returns false when request type is not IntentRequest", () => {
            const helper: HandlersHelper = new HandlersHelper();
            let request: Request = {
                type: LAUNCH_REQUEST,
                requestId: undefined,
                timestamp: undefined,
                locale: undefined
            };
            let requestEnvelope: RequestEnvelope = {
                version: "1.0",
                request: request,
                context: undefined
            };
            const handlerInput: HandlerInput = { requestEnvelope: requestEnvelope, attributesManager: undefined, responseBuilder: undefined};
            const isHandled = helper.canHandleRequestWithIntents(handlerInput, [HELP_INTENT]);
            assert.isFalse(isHandled);
        });

        it("it returns true when Intents contains intent type name", () => {
            const helper: HandlersHelper = new HandlersHelper();
            let request: IntentRequest = {
                type: INTENT_REQUEST,
                dialogState: undefined,
                requestId: undefined,
                timestamp: undefined,
                locale: undefined,
                intent: { name: HELP_INTENT, confirmationStatus: undefined }
            };
            let requestEnvelope: RequestEnvelope = {
                version: "1.0",
                request: request,
                context: undefined
            };
            const handlerInput: HandlerInput = { requestEnvelope: requestEnvelope, attributesManager: undefined, responseBuilder: undefined};
            const isHandled = helper.canHandleRequestWithIntents(handlerInput, [HELP_INTENT, CANCEL_INTENT]);
            assert.isTrue(isHandled);
        });
    });
});