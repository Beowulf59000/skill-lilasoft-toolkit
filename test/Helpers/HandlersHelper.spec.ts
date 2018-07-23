import { HandlersHelper } from "../../src/Helpers";
import { HELP_INTENT, CANCEL_INTENT } from '../../src/Intents';
import { HandlerInput } from "ask-sdk-core";
import { assert } from "chai";
import { RequestEnvelope, Request, IntentRequest } from "ask-sdk-model";
import { LAUNCH_REQUEST, INTENT_REQUEST } from '../../src/Requests';

describe("HandlersHelper", () => {
    let helper: HandlersHelper;
    let mockedHandlerInput: HandlerInput;
    let mockedLaunchRequest: Request;
    let mockedHelpIntentRequest: IntentRequest;
    let mockedRequestEnvelopeForLaunchRequest: RequestEnvelope;
    let mockedRequestEnvelopeForHelpIntentRequest: RequestEnvelope;

    before(() => {
        helper = new HandlersHelper();
        mockedLaunchRequest =  { type: LAUNCH_REQUEST, requestId: undefined, timestamp: undefined, locale: undefined };
        mockedHelpIntentRequest = { type: INTENT_REQUEST, dialogState: undefined, requestId: undefined, timestamp: undefined, locale: undefined, intent: { name: HELP_INTENT, confirmationStatus: undefined } };
        mockedRequestEnvelopeForLaunchRequest = { version: "1.0", request: mockedLaunchRequest, context: undefined };
        mockedRequestEnvelopeForHelpIntentRequest = { version: "1.0", request: mockedHelpIntentRequest, context: undefined };
    });

    describe("canHandleRequest", () => {
        it("it throws TypeError when request is undefined", () => {
            mockedHandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            let fn = () => helper.canHandleRequest(mockedHandlerInput, HELP_INTENT);
            assert.throws(fn, TypeError, "Cannot read property 'request' of undefined"); 
        });

        it("it can handle request if request type equal expected request", () => {
            mockedHandlerInput = { requestEnvelope: mockedRequestEnvelopeForLaunchRequest, attributesManager: undefined, responseBuilder: undefined};
            const isHandled = helper.canHandleRequest(mockedHandlerInput, LAUNCH_REQUEST);
            assert.isTrue(isHandled);
        });
    });

    describe("canHandleRequestWithIntents", () => {
        it("it throws TypeError when request is undefined", () => {
            mockedHandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            let fn = () => helper.canHandleRequestWithIntents(mockedHandlerInput, HELP_INTENT);
            assert.throws(fn, TypeError, "Cannot read property 'request' of undefined"); 
        });

        it("it returns false when request type is not IntentRequest", () => {
            mockedHandlerInput = { requestEnvelope: mockedRequestEnvelopeForLaunchRequest, attributesManager: undefined, responseBuilder: undefined};
            const isHandled = helper.canHandleRequestWithIntents(mockedHandlerInput, HELP_INTENT);
            assert.isFalse(isHandled);
        });

        it("it returns true when Intents contains intent type name", () => {
            mockedHandlerInput = { requestEnvelope: mockedRequestEnvelopeForHelpIntentRequest, attributesManager: undefined, responseBuilder: undefined};
            const isHandled = helper.canHandleRequestWithIntents(mockedHandlerInput, HELP_INTENT);
            assert.isTrue(isHandled);
        });
    });
});