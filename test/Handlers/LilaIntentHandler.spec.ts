import { LilaIntentHandler } from "../../src/Handlers";
import 'mocha';
import { assert } from 'chai';
import { HandlerInput } from "ask-sdk-core";
import { HandlersHelper, MessagesHelper, SpeakersHelper } from "../../src/Helpers";
import { IMock, Mock, It, Times } from "typemoq";

describe('LilaIntentHandler', () => {
    var handler: LilaIntentHandler;
    let mockedIntentName: string;
    let mockedMessages: string[];
    let mockedReprompts: string[];

    before(() => {
        mockedIntentName = "intent";
        mockedMessages = ["message 1", "message 2"];
        mockedReprompts = ["reprompt 1", "reprompt 2"];
    });
    
    describe('constructor', () => {
        it('it can be called with requestIntentNames', () => {
            handler = new LilaIntentHandler(mockedIntentName);
            assert.equal(handler.intentName, mockedIntentName);
            assert.isUndefined(handler.messages);
            assert.isUndefined(handler.reprompts);
            assert.isDefined(handler.messagesHelper);
            assert.isDefined(handler.speakersHelper);
            assert.isDefined(handler.handlersHelper);
        });
    
        it('it can be called with requestIntentNames and messages', () => {
            handler = new LilaIntentHandler(mockedIntentName, mockedMessages);
            assert.equal(handler.intentName, mockedIntentName);
            assert.deepEqual(handler.messages, mockedMessages);
            assert.isUndefined(handler.reprompts);
            assert.isDefined(handler.messagesHelper);
            assert.isDefined(handler.speakersHelper);
            assert.isDefined(handler.handlersHelper);
        });
    
        it('it can be called with requestIntentNames, messages and reprompts', () => {
            handler = new LilaIntentHandler(mockedIntentName, mockedMessages, mockedReprompts);
            assert.equal(handler.intentName, mockedIntentName);
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

        before(() => {
            mockedHandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
            handlersHelperMock = Mock.ofType(HandlersHelper);
        });

        it('it returns true when requestIntentNames are undefined', () => {
            handler = new LilaIntentHandler(undefined);
            const isHandled = handler.canHandle(mockedHandlerInput);
            assert.isTrue(isHandled);
        });

        it('it calls handlersHelper.canHandleRequest', () => {
            handler = new LilaIntentHandler(mockedIntentName, undefined, undefined, handlersHelperMock.object);
            handler.canHandle(mockedHandlerInput);
            handlersHelperMock.verify(x => x.canHandleRequestWithIntents(It.isValue(mockedHandlerInput), It.isValue(mockedIntentName)), Times.once());
        });
    });

    describe('handle', () => {
        let messagesHelperMock: IMock<MessagesHelper>;
        let speakersHelperMock: IMock<SpeakersHelper>;
        let mockedHandlerInput: HandlerInput;
        let mockedMessage: string;
        let mockedReprompt: string;

        before(() => { 
            mockedMessage = "message 1";
            mockedReprompt = "reprompt 2";
            mockedHandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: undefined};
        });
        
        beforeEach(() => {
            messagesHelperMock = Mock.ofType(MessagesHelper);
            speakersHelperMock = Mock.ofType(SpeakersHelper);
            messagesHelperMock.setup(x => x.getRandomMessage(It.isValue(mockedMessages))).returns(() => mockedMessage);
            messagesHelperMock.setup(x => x.getRandomMessage(It.isValue(mockedReprompts))).returns(() => mockedReprompt);     
            handler = new LilaIntentHandler(mockedIntentName, mockedMessages, mockedReprompts, undefined, speakersHelperMock.object, messagesHelperMock.object);             
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