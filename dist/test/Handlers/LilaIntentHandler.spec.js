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
const Handlers_1 = require("../../src/Handlers");
require("mocha");
const chai_1 = require("chai");
const Helpers_1 = require("../../src/Helpers");
const typemoq_1 = require("typemoq");
describe('LilaIntentHandler', () => {
    let handler;
    let mockedIntentName;
    let mockedMessages;
    let mockedReprompts;
    beforeEach(() => {
        mockedIntentName = "intent";
        mockedMessages = ["message 1", "message 2"];
        mockedReprompts = ["reprompt 1", "reprompt 2"];
    });
    describe('constructor', () => {
        it('it can be called with requestIntentNames', () => {
            handler = new Handlers_1.LilaIntentHandler(mockedIntentName);
            chai_1.assert.deepEqual(handler.intentName, mockedIntentName);
            chai_1.assert.isUndefined(handler.messages);
            chai_1.assert.isUndefined(handler.reprompts);
            chai_1.assert.isDefined(handler.messagesHelper);
            chai_1.assert.isDefined(handler.speakersHelper);
            chai_1.assert.isDefined(handler.handlersHelper);
        });
        it('it can be called with requestIntentNames and messages', () => {
            this.handler = new Handlers_1.LilaIntentHandler(mockedIntentName, mockedMessages);
            chai_1.assert.deepEqual(handler.intentName, mockedIntentName);
            chai_1.assert.deepEqual(handler.messages, mockedMessages);
            chai_1.assert.isUndefined(handler.reprompts);
            chai_1.assert.isDefined(handler.messagesHelper);
            chai_1.assert.isDefined(handler.speakersHelper);
            chai_1.assert.isDefined(handler.handlersHelper);
        });
        it('it can be called with requestIntentNames, messages and reprompts', () => {
            this.handler = new Handlers_1.LilaIntentHandler(mockedIntentName, mockedMessages, mockedReprompts);
            chai_1.assert.deepEqual(handler.intentName, mockedIntentName);
            chai_1.assert.deepEqual(handler.messages, mockedMessages);
            chai_1.assert.deepEqual(handler.reprompts, mockedReprompts);
            chai_1.assert.isDefined(handler.messagesHelper);
            chai_1.assert.isDefined(handler.speakersHelper);
            chai_1.assert.isDefined(handler.handlersHelper);
        });
    });
    describe('canHandle', () => {
        let mockedHandlerInput;
        beforeEach(() => {
            mockedHandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
        });
        it('it returns true when requestIntentNames are undefined', () => {
            this.handler = new Handlers_1.LilaIntentHandler(undefined);
            const isHandled = handler.canHandle(mockedHandlerInput);
            chai_1.assert.isTrue(isHandled);
        });
        it('it calls handlersHelper.canHandleRequest', () => {
            const handlersHelperMock = typemoq_1.Mock.ofType(Helpers_1.HandlersHelper);
            const handler = new Handlers_1.LilaIntentHandler(mockedIntentName, undefined, undefined, handlersHelperMock.object);
            handler.canHandle(mockedHandlerInput);
            handlersHelperMock.verify(x => x.canHandleRequestWithIntents(typemoq_1.It.isValue(mockedHandlerInput), typemoq_1.It.isValue(mockedIntentName)), typemoq_1.Times.once());
        });
    });
    describe('handle', () => {
        let messagesHelperMock;
        let speakersHelperMock;
        let mockedHandlerInput;
        let mockedMessage;
        let mockedReprompt;
        beforeEach(() => {
            messagesHelperMock = typemoq_1.Mock.ofType(Helpers_1.MessagesHelper);
            speakersHelperMock = typemoq_1.Mock.ofType(Helpers_1.SpeakersHelper);
            mockedMessage = "message 1";
            mockedReprompt = "reprompt 2";
            messagesHelperMock.setup(x => x.getRandomMessage(typemoq_1.It.isValue(mockedMessages))).returns(() => mockedMessage);
            messagesHelperMock.setup(x => x.getRandomMessage(typemoq_1.It.isValue(mockedReprompts))).returns(() => mockedReprompt);
            mockedHandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            handler = new Handlers_1.LilaIntentHandler(mockedIntentName, mockedMessages, mockedReprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
        });
        it('it calls messagesHelper.getRandomMessage for messages', () => __awaiter(this, void 0, void 0, function* () {
            yield handler.handle(mockedHandlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(typemoq_1.It.isValue(mockedMessages)), typemoq_1.Times.once());
        }));
        it('it calls messagesHelper.getRandomMessage for reprompts', () => __awaiter(this, void 0, void 0, function* () {
            yield handler.handle(mockedHandlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(typemoq_1.It.isValue(mockedReprompts)), typemoq_1.Times.once());
        }));
        it('it calls speakersHelper.speakWithReprompt', () => __awaiter(this, void 0, void 0, function* () {
            yield handler.handle(mockedHandlerInput);
            speakersHelperMock.verify(x => x.speak(typemoq_1.It.isValue(mockedHandlerInput), typemoq_1.It.isValue(mockedMessage), typemoq_1.It.isValue(mockedReprompt)), typemoq_1.Times.once());
        }));
    });
});
//# sourceMappingURL=LilaIntentHandler.spec.js.map