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
    describe('constructor', () => {
        it('it can be called with requestIntentNames', () => {
            const handler = new Handlers_1.LilaIntentHandler('intent');
            chai_1.assert.deepEqual(handler.intentName, 'intent');
            chai_1.assert.isUndefined(handler.messages);
            chai_1.assert.isUndefined(handler.reprompts);
            chai_1.assert.isDefined(handler.messagesHelper);
            chai_1.assert.isDefined(handler.speakersHelper);
            chai_1.assert.isDefined(handler.handlersHelper);
        });
        it('it can be called with requestIntentNames and messages', () => {
            const handler = new Handlers_1.LilaIntentHandler('intent', ['message 1', 'message 2']);
            chai_1.assert.deepEqual(handler.intentName, 'intent');
            chai_1.assert.deepEqual(handler.messages, ['message 1', 'message 2']);
            chai_1.assert.isUndefined(handler.reprompts);
            chai_1.assert.isDefined(handler.messagesHelper);
            chai_1.assert.isDefined(handler.speakersHelper);
            chai_1.assert.isDefined(handler.handlersHelper);
        });
        it('it can be called with requestIntentNames, messages and reprompts', () => {
            const handler = new Handlers_1.LilaIntentHandler('intent', ['message 1', 'message 2'], ['reprompt 1', 'reprompt 2']);
            chai_1.assert.deepEqual(handler.intentName, 'intent');
            chai_1.assert.deepEqual(handler.messages, ['message 1', 'message 2']);
            chai_1.assert.deepEqual(handler.reprompts, ['reprompt 1', 'reprompt 2']);
            chai_1.assert.isDefined(handler.messagesHelper);
            chai_1.assert.isDefined(handler.speakersHelper);
            chai_1.assert.isDefined(handler.handlersHelper);
        });
    });
    describe('canHandle', () => {
        it('it returns true when requestIntentNames are undefined', () => {
            const handler = new Handlers_1.LilaIntentHandler(undefined);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            const isHandled = handler.canHandle(handlerInput);
            chai_1.assert.isTrue(isHandled);
        });
        it('it calls handlersHelper.canHandleRequest', () => {
            const intentName = 'intent';
            const handlersHelperMock = typemoq_1.Mock.ofType(Helpers_1.HandlersHelper);
            const handler = new Handlers_1.LilaIntentHandler(intentName, undefined, undefined, handlersHelperMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            handler.canHandle(handlerInput);
            handlersHelperMock.verify(x => x.canHandleRequestWithIntents(typemoq_1.It.isValue(handlerInput), typemoq_1.It.isValue(intentName)), typemoq_1.Times.once());
        });
    });
    describe('handle', () => {
        it('it calls messagesHelper.getRandomMessage for messages', () => __awaiter(this, void 0, void 0, function* () {
            const intentName = 'intent';
            const messages = ['message 1', 'message 2'];
            const reprompts = ['reprompt 1', 'reprompt 2'];
            const messagesHelperMock = typemoq_1.Mock.ofType(Helpers_1.MessagesHelper);
            const speakersHelperMock = typemoq_1.Mock.ofType(Helpers_1.SpeakersHelper);
            const handler = new Handlers_1.LilaIntentHandler(intentName, messages, reprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            yield handler.handle(handlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(typemoq_1.It.isValue(messages)), typemoq_1.Times.once());
        }));
        it('it calls messagesHelper.getRandomMessage for reprompts', () => __awaiter(this, void 0, void 0, function* () {
            const intentName = 'intent';
            const messages = ['message 1', 'message 2'];
            const reprompts = ['reprompt 1', 'reprompt 2'];
            const messagesHelperMock = typemoq_1.Mock.ofType(Helpers_1.MessagesHelper);
            const speakersHelperMock = typemoq_1.Mock.ofType(Helpers_1.SpeakersHelper);
            const handler = new Handlers_1.LilaIntentHandler(intentName, messages, reprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            yield handler.handle(handlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(typemoq_1.It.isValue(reprompts)), typemoq_1.Times.once());
        }));
        it('it calls speakersHelper.speakWithReprompt', () => __awaiter(this, void 0, void 0, function* () {
            const intentName = 'intent';
            const messages = ['message 1', 'message 2'];
            const reprompts = ['reprompt 1', 'reprompt 2'];
            const message = 'message 1';
            const reprompt = 'message 2';
            const messagesHelperMock = typemoq_1.Mock.ofType(Helpers_1.MessagesHelper);
            const speakersHelperMock = typemoq_1.Mock.ofType(Helpers_1.SpeakersHelper);
            messagesHelperMock.setup(x => x.getRandomMessage(typemoq_1.It.isValue(messages))).returns(() => message);
            messagesHelperMock.setup(x => x.getRandomMessage(typemoq_1.It.isValue(reprompts))).returns(() => reprompt);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            const handler = new Handlers_1.LilaIntentHandler(intentName, messages, reprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
            yield handler.handle(handlerInput);
            speakersHelperMock.verify(x => x.speak(typemoq_1.It.isValue(handlerInput), typemoq_1.It.isValue(message), typemoq_1.It.isValue(reprompt)), typemoq_1.Times.once());
        }));
    });
});
//# sourceMappingURL=LilaIntentHandler.spec.js.map