import { LilaIntentHandler } from "../../src/Handlers";
import 'mocha';
import { assert } from 'chai';
import { HandlerInput } from "ask-sdk-core";
import { HandlersHelper, MessagesHelper, SpeakersHelper } from "../../src/Helpers";
import { IMock, Mock, It, Times } from "typemoq";

describe('LilaIntentHandler', () => {
    describe('constructor', () => {
        it('it can be called with requestIntentNames', () => {
            const handler = new LilaIntentHandler(['intent 1', 'intent 2']);
            assert.deepEqual(handler.requestIntentNames, ['intent 1', 'intent 2']);
            assert.isUndefined(handler.messages);
            assert.isUndefined(handler.reprompts);
            assert.isDefined(handler.messagesHelper);
            assert.isDefined(handler.speakersHelper);
            assert.isDefined(handler.handlersHelper);
        });
    
        it('it can be called with requestIntentNames and messages', () => {
            const handler = new LilaIntentHandler(['intent 1', 'intent 2'], ['message 1', 'message 2']);
            assert.deepEqual(handler.requestIntentNames, ['intent 1', 'intent 2']);
            assert.deepEqual(handler.messages, ['message 1', 'message 2']);
            assert.isUndefined(handler.reprompts);
            assert.isDefined(handler.messagesHelper);
            assert.isDefined(handler.speakersHelper);
            assert.isDefined(handler.handlersHelper);
        });
    
        it('it can be called with requestIntentNames, messages and reprompts', () => {
            const handler = new LilaIntentHandler(['intent 1', 'intent 2'], ['message 1', 'message 2'], ['reprompt 1', 'reprompt 2']);
            assert.deepEqual(handler.requestIntentNames, ['intent 1', 'intent 2']);
            assert.deepEqual(handler.messages, ['message 1', 'message 2']);
            assert.deepEqual(handler.reprompts, ['reprompt 1', 'reprompt 2']);
            assert.isDefined(handler.messagesHelper);
            assert.isDefined(handler.speakersHelper);
            assert.isDefined(handler.handlersHelper);
        });
    });

    describe('canHandle', () => {
        it('it returns true when requestIntentNames are undefined', () => {
            const handler = new LilaIntentHandler(undefined);
            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            const isHandled = handler.canHandle(handlerInput);
            assert.isTrue(isHandled);
        });

        it('it calls handlersHelper.canHandleRequest', () => {
            const requestIntentNames = ['intent 1', 'intent 2'];
            const handlersHelperMock: IMock<HandlersHelper> = Mock.ofType(HandlersHelper);
            const handler = new LilaIntentHandler(requestIntentNames, undefined, undefined, handlersHelperMock.object);
            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            handler.canHandle(handlerInput);
            handlersHelperMock.verify(x => x.canHandleRequestWithIntents(It.isValue(handlerInput), It.isValue(requestIntentNames)), Times.once());
        });
    });

    describe('handle', () => {
        it('it calls messagesHelper.getRandomMessage for messages', async () => {
            const requestIntentNames = ['intent 1', 'intent 2'];
            const messages = ['message 1', 'message 2'];
            const reprompts = ['reprompt 1', 'reprompt 2'];
            const messagesHelperMock: IMock<MessagesHelper> = Mock.ofType(MessagesHelper);
            const speakersHelperMock: IMock<SpeakersHelper> = Mock.ofType(SpeakersHelper);
            const handler = new LilaIntentHandler(requestIntentNames, messages, reprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            await handler.handle(handlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(It.isValue(messages)), Times.once());
        });

        it('it calls messagesHelper.getRandomMessage for reprompts', async () => {
            const requestIntentNames = ['intent 1', 'intent 2'];
            const messages = ['message 1', 'message 2'];
            const reprompts = ['reprompt 1', 'reprompt 2'];
            const messagesHelperMock: IMock<MessagesHelper> = Mock.ofType(MessagesHelper);
            const speakersHelperMock: IMock<SpeakersHelper> = Mock.ofType(SpeakersHelper);
            const handler = new LilaIntentHandler(requestIntentNames, messages, reprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            await handler.handle(handlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(It.isValue(reprompts)), Times.once());
        });

        it('it calls speakersHelper.speakWithReprompt', async () => {
            const requestIntentNames = ['intent 1', 'intent 2'];
            const messages = ['message 1', 'message 2'];
            const reprompts = ['reprompt 1', 'reprompt 2'];
            const message = 'message 1';
            const reprompt = 'message 2';
            const messagesHelperMock: IMock<MessagesHelper> = Mock.ofType(MessagesHelper);
            const speakersHelperMock: IMock<SpeakersHelper> = Mock.ofType(SpeakersHelper);
            messagesHelperMock.setup(x => x.getRandomMessage(It.isValue(messages))).returns(() => message);
            messagesHelperMock.setup(x => x.getRandomMessage(It.isValue(reprompts))).returns(() => reprompt);
            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};

            const handler = new LilaIntentHandler(requestIntentNames, messages, reprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
            await handler.handle(handlerInput);
            speakersHelperMock.verify(x => x.speak(It.isValue(handlerInput), It.isValue(message), It.isValue(reprompt)), Times.once());
        });
    });
});