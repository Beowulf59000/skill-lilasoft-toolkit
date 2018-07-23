import { LilaRequestHandler } from "../../src/Handlers";
import 'mocha';
import { assert } from 'chai';
import { HandlerInput } from "ask-sdk-core";
import { HandlersHelper, MessagesHelper, SpeakersHelper } from "../../src/Helpers";
import { IMock, Mock, It, Times } from "typemoq";

describe('LilaRequestHandler', () => {
    let handler: LilaRequestHandler;
    let mockedRequestName: string;
    let mockedMessages: string[];
    let mockedReprompts: string[];

    beforeEach(() => {
        mockedRequestName = "requestName";
        mockedMessages = ["message 1", "message 2"];
        mockedReprompts = ["reprompt 1", "reprompt 2"];
    });

    describe('constructor', () => {
        it('it can be called with requestName', () => {
            handler = new LilaRequestHandler(mockedRequestName);
            assert.equal(handler.requestName, mockedRequestName);
            assert.isUndefined(handler.messages);
            assert.isUndefined(handler.reprompts);
            assert.isDefined(handler.messagesHelper);
            assert.isDefined(handler.speakersHelper);
            assert.isDefined(handler.handlersHelper);
        });
    
        it('it can be called with requestName and messages', () => {
            handler = new LilaRequestHandler(mockedRequestName, mockedMessages);
            assert.equal(handler.requestName, mockedRequestName);
            assert.deepEqual(handler.messages, mockedMessages);
            assert.isUndefined(handler.reprompts);
            assert.isDefined(handler.messagesHelper);
            assert.isDefined(handler.speakersHelper);
            assert.isDefined(handler.handlersHelper);
        });
    
        it('it can be called with requestName, messages and reprompts', () => {
            handler = new LilaRequestHandler(mockedRequestName, mockedMessages, mockedReprompts);
            assert.equal(handler.requestName, mockedRequestName);
            assert.deepEqual(handler.messages, mockedMessages);
            assert.deepEqual(handler.reprompts, mockedReprompts);
            assert.isDefined(handler.messagesHelper);
            assert.isDefined(handler.speakersHelper);
            assert.isDefined(handler.handlersHelper);
        });
    });

    describe('canHandle', () => {
        let mockedHandlerInput: HandlerInput;
        let handlersHelperMock: IMock<HandlersHelper>;

        beforeEach(() => {
            mockedHandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            handlersHelperMock = Mock.ofType(HandlersHelper);
        });

        it('it returns true when requestName is undefined', () => {
            handler = new LilaRequestHandler(undefined);
            const isHandled = handler.canHandle(mockedHandlerInput);
            assert.isTrue(isHandled);
        });

        it('it calls handlersHelper.canHandleRequest', () => {
            const handler = new LilaRequestHandler(mockedRequestName, undefined, undefined, handlersHelperMock.object);
            handler.canHandle(mockedHandlerInput);
            handlersHelperMock.verify(x => x.canHandleRequest(It.isValue(mockedHandlerInput), It.isValue(mockedRequestName)), Times.once());
        });
    });

    describe('handle', () => {
        let messagesHelperMock: IMock<MessagesHelper>;
        let speakersHelperMock: IMock<SpeakersHelper>;
        let mockedHandlerInput: HandlerInput;
        let mockedMessage: string;
        let mockedReprompt: string;

        beforeEach(() => {
            messagesHelperMock = Mock.ofType(MessagesHelper);
            speakersHelperMock = Mock.ofType(SpeakersHelper);  
            mockedMessage = "message 1";
            mockedReprompt = "reprompt 2";
            messagesHelperMock.setup(x => x.getRandomMessage(It.isValue(mockedMessages))).returns(() => mockedMessage);
            messagesHelperMock.setup(x => x.getRandomMessage(It.isValue(mockedReprompts))).returns(() => mockedReprompt);
            mockedHandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            handler = new LilaRequestHandler(mockedRequestName, mockedMessages, mockedReprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);
        });   
        it('it calls messagesHelper.getRandomMessage for messages', async () => {
            await handler.handle(mockedHandlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(It.isValue(mockedMessages)), Times.once());
        });

        it('it calls messagesHelper.getRandomMessage for reprompts', async () => {
            await handler.handle(mockedHandlerInput);
            messagesHelperMock.verify(x => x.getRandomMessage(It.isValue(mockedReprompts)), Times.once());
        });

        it('it calls speakersHelper.speakWithReprompt', async () => {
            await handler.handle(mockedHandlerInput);
            speakersHelperMock.verify(x => x.speak(It.isValue(mockedHandlerInput), It.isValue(mockedMessage), It.isValue(mockedReprompt)), Times.once());
        });
    });
});