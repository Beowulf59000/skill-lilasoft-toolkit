import { SpeakersHelper } from "../../src";
import { HandlerInput, ResponseBuilder } from "ask-sdk-core";
import { IMock, Mock, It, Times } from "typemoq";

describe("SpeakersHelper", () => {
    let responseBuilderMock: IMock<ResponseBuilder>;
    let mockedHandlerInput: HandlerInput;
    let helper: SpeakersHelper;
    let mockedMessage: string;
    let mockedReprompt: string;
    let mockedSkillName: string;
    let mockedCardMessage: string;

    before(() => {
        helper = new SpeakersHelper();
        mockedMessage = "message";
        mockedReprompt = "reprompt";
        mockedSkillName = "skillName";
        mockedCardMessage = "cardMessage";
    });

    beforeEach(() => {
        responseBuilderMock = Mock.ofType<ResponseBuilder>();
        responseBuilderMock.setup(x => x.speak(It.isAnyString())).returns(() => responseBuilderMock.object);
        responseBuilderMock.setup(x => x.reprompt(It.isAnyString())).returns(() => responseBuilderMock.object);
        responseBuilderMock.setup(x => x.withSimpleCard(It.isAnyString(), It.isAnyString())).returns(() => responseBuilderMock.object);

        mockedHandlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: responseBuilderMock.object};
    });

    describe("speak", () => {
        it("it calls getResponse when no parameter is given", async () => {
            await helper.speak(mockedHandlerInput);

            responseBuilderMock.verify(x => x.speak(It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.reprompt(It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.withSimpleCard(It.isAnyString(), It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.getResponse(), Times.once());
        });

        it("it calls speak when message is given", async () => {
            await helper.speak(mockedHandlerInput, mockedMessage);

            responseBuilderMock.verify(x => x.speak(It.isValue(mockedMessage)), Times.once());
            responseBuilderMock.verify(x => x.reprompt(It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.withSimpleCard(It.isAnyString(), It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.getResponse(), Times.once());
        });

        it("it calls reprompt when reprompt is given", async () => {
            await helper.speak(mockedHandlerInput, mockedMessage, mockedReprompt);

            responseBuilderMock.verify(x => x.speak(It.isValue(mockedMessage)), Times.once());
            responseBuilderMock.verify(x => x.reprompt(It.isValue(mockedReprompt)), Times.once());
            responseBuilderMock.verify(x => x.withSimpleCard(It.isAnyString(), It.isAnyString()), Times.never());
            responseBuilderMock.verify(x => x.getResponse(), Times.once());
        });

        it("it calls withSimpleCard when skillName and cardMessage are given", async () => {
            await helper.speak(mockedHandlerInput, mockedMessage, mockedReprompt, mockedCardMessage, mockedSkillName);

            responseBuilderMock.verify(x => x.speak(It.isValue(mockedMessage)), Times.once());
            responseBuilderMock.verify(x => x.reprompt(It.isValue(mockedReprompt)), Times.once());
            responseBuilderMock.verify(x => x.withSimpleCard(mockedSkillName, mockedCardMessage), Times.once());
            responseBuilderMock.verify(x => x.getResponse(), Times.once());
        });
    });
});