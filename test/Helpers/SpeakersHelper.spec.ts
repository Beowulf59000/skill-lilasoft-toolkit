import { SpeakersHelper } from "../../src";
import { HandlerInput, ResponseBuilder } from "ask-sdk-core";
import { assert } from "chai";
import { IMock, Mock, It, Times } from "typemoq";

describe("SpeakersHelper", () => {
    describe("speak", () => {
        it("it calls getResponse when no parameter is given", async () => {
            const responseBuilderMock: IMock<ResponseBuilder> = Mock.ofType<ResponseBuilder>();
            responseBuilderMock.setup(x => x.speak(It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.reprompt(It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.withSimpleCard(It.isAnyString(), It.isAnyString())).returns(() => responseBuilderMock.object);

            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: responseBuilderMock.object};
            
            const helper: SpeakersHelper = new SpeakersHelper();
            await helper.speak(handlerInput);

            responseBuilderMock.verify(x => x.speak(It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.reprompt(It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.withSimpleCard(It.isAnyString(), It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.getResponse(), Times.once());
        });

        it("it calls speak when message is given", async () => {
            const responseBuilderMock: IMock<ResponseBuilder> = Mock.ofType<ResponseBuilder>();
            responseBuilderMock.setup(x => x.speak(It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.reprompt(It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.withSimpleCard(It.isAnyString(), It.isAnyString())).returns(() => responseBuilderMock.object);

            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: responseBuilderMock.object};
            
            const helper: SpeakersHelper = new SpeakersHelper();
            await helper.speak(handlerInput, "message");

            responseBuilderMock.verify(x => x.speak(It.isValue("message")), Times.once());
            responseBuilderMock.verify(x => x.reprompt(It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.withSimpleCard(It.isAnyString(), It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.getResponse(), Times.once());
        });

        it("it calls reprompt when reprompt is given", async () => {
            const responseBuilderMock: IMock<ResponseBuilder> = Mock.ofType<ResponseBuilder>();
            responseBuilderMock.setup(x => x.speak(It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.reprompt(It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.withSimpleCard(It.isAnyString(), It.isAnyString())).returns(() => responseBuilderMock.object);

            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: responseBuilderMock.object};
            
            const helper: SpeakersHelper = new SpeakersHelper();
            await helper.speak(handlerInput, "message", "reprompt");

            responseBuilderMock.verify(x => x.speak(It.isValue("message")), Times.once());
            responseBuilderMock.verify(x => x.reprompt(It.isValue("reprompt")), Times.once());
            responseBuilderMock.verify(x => x.withSimpleCard(It.isAnyString(), It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.getResponse(), Times.once());
        });

        it("it calls withSimpleCard when skillName and cardMessage are given", async () => {
            const responseBuilderMock: IMock<ResponseBuilder> = Mock.ofType<ResponseBuilder>();
            responseBuilderMock.setup(x => x.speak(It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.reprompt(It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.withSimpleCard(It.isAnyString(), It.isAnyString())).returns(() => responseBuilderMock.object);

            const handlerInput: HandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: responseBuilderMock.object};
            
            const helper: SpeakersHelper = new SpeakersHelper();
            await helper.speak(handlerInput, "message", "reprompt", "cardMessage", "skillName");

            responseBuilderMock.verify(x => x.speak(It.isValue("message")), Times.once());
            responseBuilderMock.verify(x => x.reprompt(It.isValue("reprompt")), Times.once());
            responseBuilderMock.verify(x => x.withSimpleCard("skillName", "cardMessage"), Times.once());
            responseBuilderMock.verify(x => x.getResponse(), Times.once());
        });
    });
});