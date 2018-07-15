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
describe('LilaRequestHandler', () => {
    describe('constructor', () => {
        it('it can be called with requestName', () => {
            const handler = new Handlers_1.LilaRequestHandler('requestName');
            chai_1.assert.equal(handler.requestName, 'requestName');
            chai_1.assert.isUndefined(handler.messages);
            chai_1.assert.isUndefined(handler.reprompts);
            chai_1.assert.isDefined(handler.messagesHelper);
            chai_1.assert.isDefined(handler.speakersHelper);
            chai_1.assert.isDefined(handler.handlersHelper);
        });
        it('it can be called with requestName and messages', () => {
            const handler = new Handlers_1.LilaRequestHandler('requestName', ['message 1', 'message 2']);
            chai_1.assert.equal(handler.requestName, 'requestName');
            chai_1.assert.deepEqual(handler.messages, ['message 1', 'message 2']);
            chai_1.assert.isUndefined(handler.reprompts);
            chai_1.assert.isDefined(handler.messagesHelper);
            chai_1.assert.isDefined(handler.speakersHelper);
            chai_1.assert.isDefined(handler.handlersHelper);
        });
        it('it can be called with requestName, messages and reprompts', () => {
            const handler = new Handlers_1.LilaRequestHandler('requestName', ['message 1', 'message 2'], ['reprompt 1', 'reprompt 2']);
            chai_1.assert.equal(handler.requestName, 'requestName');
            chai_1.assert.deepEqual(handler.messages, ['message 1', 'message 2']);
            chai_1.assert.deepEqual(handler.reprompts, ['reprompt 1', 'reprompt 2']);
            chai_1.assert.isDefined(handler.messagesHelper);
            chai_1.assert.isDefined(handler.speakersHelper);
            chai_1.assert.isDefined(handler.handlersHelper);
        });
    });
    describe('canHandle', () => {
        it('it returns true when requestName is undefined', () => {
            const handler = new Handlers_1.LilaRequestHandler(undefined);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            const isHandled = handler.canHandle(handlerInput);
            chai_1.assert.isTrue(isHandled);
        });
        it('it calls handlersHelper.canHandleRequest', () => {
            const requestName = 'requestName';
            const handlersHelperMock = typemoq_1.Mock.ofType(Helpers_1.HandlersHelper);
            const handler = new Handlers_1.LilaRequestHandler(requestName, undefined, undefined, handlersHelperMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            const isHandled = handler.canHandle(handlerInput);
            handlersHelperMock.verify(x => x.canHandleRequest(typemoq_1.It.isValue(handlerInput), typemoq_1.It.isValue(requestName)), typemoq_1.Times.once());
        });
    });
    describe('handle', () => {
        it('it calls messagesHelper.getRandomMessage for messages', () => __awaiter(this, void 0, void 0, function* () {
            const messages = ['message 1', 'message 2'];
            const reprompts = ['reprompt 1', 'reprompt 2'];
            const messagesHelperMock = typemoq_1.Mock.ofType(Helpers_1.MessagesHelper);
            const speakersHelperMock = typemoq_1.Mock.ofType(Helpers_1.SpeakersHelper);
            const handler = new Handlers_1.LilaRequestHandler('requestName', messages, reprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            const response = yield handler.handle(handlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(typemoq_1.It.isValue(messages)), typemoq_1.Times.once());
        }));
        it('it calls messagesHelper.getRandomMessage for reprompts', () => __awaiter(this, void 0, void 0, function* () {
            const messages = ['message 1', 'message 2'];
            const reprompts = ['reprompt 1', 'reprompt 2'];
            const messagesHelperMock = typemoq_1.Mock.ofType(Helpers_1.MessagesHelper);
            const speakersHelperMock = typemoq_1.Mock.ofType(Helpers_1.SpeakersHelper);
            const handler = new Handlers_1.LilaRequestHandler('requestName', messages, reprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            const response = yield handler.handle(handlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(typemoq_1.It.isValue(reprompts)), typemoq_1.Times.once());
        }));
        it('it calls speakersHelper.speakWithReprompt', () => __awaiter(this, void 0, void 0, function* () {
            const messages = ['message 1', 'message 2'];
            const reprompts = ['reprompt 1', 'reprompt 2'];
            const message = 'message 1';
            const reprompt = 'message 2';
            const messagesHelperMock = typemoq_1.Mock.ofType(Helpers_1.MessagesHelper);
            const speakersHelperMock = typemoq_1.Mock.ofType(Helpers_1.SpeakersHelper);
            messagesHelperMock.setup(x => x.getRandomMessage(typemoq_1.It.isValue(messages))).returns(() => message);
            messagesHelperMock.setup(x => x.getRandomMessage(typemoq_1.It.isValue(reprompts))).returns(() => reprompt);
            //speakersHelperMock.setup(x => x.speakWithReprompt(It.isValue(handlerInput), It.isValue(message), It.isValue(reprompt))).returns(() => new Response());
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined };
            const handler = new Handlers_1.LilaRequestHandler('requestName', messages, reprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
            const response = yield handler.handle(handlerInput);
            speakersHelperMock.verify(x => x.speakWithReprompt(typemoq_1.It.isValue(handlerInput), typemoq_1.It.isValue(message), typemoq_1.It.isValue(reprompt)), typemoq_1.Times.once());
        }));
    });
});
//# sourceMappingURL=LilaRequestHandler.spec.js.map