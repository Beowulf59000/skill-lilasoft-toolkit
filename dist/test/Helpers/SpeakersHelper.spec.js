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
const src_1 = require("../../src");
const typemoq_1 = require("typemoq");
describe("SpeakersHelper", () => {
    describe("speak", () => {
        it("it calls getResponse when no parameter is given", () => __awaiter(this, void 0, void 0, function* () {
            const responseBuilderMock = typemoq_1.Mock.ofType();
            responseBuilderMock.setup(x => x.speak(typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.reprompt(typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.withSimpleCard(typemoq_1.It.isAnyString(), typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: responseBuilderMock.object };
            const helper = new src_1.SpeakersHelper();
            yield helper.speak(handlerInput);
            responseBuilderMock.verify(x => x.speak(typemoq_1.It.isAnyString()), typemoq_1.Times.never());
            responseBuilderMock.verify(x => x.reprompt(typemoq_1.It.isAnyString()), typemoq_1.Times.never());
            responseBuilderMock.verify(x => x.withSimpleCard(typemoq_1.It.isAnyString(), typemoq_1.It.isAnyString()), typemoq_1.Times.never());
            responseBuilderMock.verify(x => x.getResponse(), typemoq_1.Times.once());
        }));
        it("it calls speak when message is given", () => __awaiter(this, void 0, void 0, function* () {
            const responseBuilderMock = typemoq_1.Mock.ofType();
            responseBuilderMock.setup(x => x.speak(typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.reprompt(typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.withSimpleCard(typemoq_1.It.isAnyString(), typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: responseBuilderMock.object };
            const helper = new src_1.SpeakersHelper();
            yield helper.speak(handlerInput, "message");
            responseBuilderMock.verify(x => x.speak(typemoq_1.It.isValue("message")), typemoq_1.Times.once());
            responseBuilderMock.verify(x => x.reprompt(typemoq_1.It.isAnyString()), typemoq_1.Times.never());
            responseBuilderMock.verify(x => x.withSimpleCard(typemoq_1.It.isAnyString(), typemoq_1.It.isAnyString()), typemoq_1.Times.never());
            responseBuilderMock.verify(x => x.getResponse(), typemoq_1.Times.once());
        }));
        it("it calls reprompt when reprompt is given", () => __awaiter(this, void 0, void 0, function* () {
            const responseBuilderMock = typemoq_1.Mock.ofType();
            responseBuilderMock.setup(x => x.speak(typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.reprompt(typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.withSimpleCard(typemoq_1.It.isAnyString(), typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: responseBuilderMock.object };
            const helper = new src_1.SpeakersHelper();
            yield helper.speak(handlerInput, "message", "reprompt");
            responseBuilderMock.verify(x => x.speak(typemoq_1.It.isValue("message")), typemoq_1.Times.once());
            responseBuilderMock.verify(x => x.reprompt(typemoq_1.It.isValue("reprompt")), typemoq_1.Times.once());
            responseBuilderMock.verify(x => x.withSimpleCard(typemoq_1.It.isAnyString(), typemoq_1.It.isAnyString()), typemoq_1.Times.never());
            responseBuilderMock.verify(x => x.getResponse(), typemoq_1.Times.once());
        }));
        it("it calls withSimpleCard when skillName and cardMessage are given", () => __awaiter(this, void 0, void 0, function* () {
            const responseBuilderMock = typemoq_1.Mock.ofType();
            responseBuilderMock.setup(x => x.speak(typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.reprompt(typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            responseBuilderMock.setup(x => x.withSimpleCard(typemoq_1.It.isAnyString(), typemoq_1.It.isAnyString())).returns(() => responseBuilderMock.object);
            const handlerInput = { requestEnvelope: undefined, attributesManager: undefined, responseBuilder: responseBuilderMock.object };
            const helper = new src_1.SpeakersHelper();
            yield helper.speak(handlerInput, "message", "reprompt", "cardMessage", "skillName");
            responseBuilderMock.verify(x => x.speak(typemoq_1.It.isValue("message")), typemoq_1.Times.once());
            responseBuilderMock.verify(x => x.reprompt(typemoq_1.It.isValue("reprompt")), typemoq_1.Times.once());
            responseBuilderMock.verify(x => x.withSimpleCard("skillName", "cardMessage"), typemoq_1.Times.once());
            responseBuilderMock.verify(x => x.getResponse(), typemoq_1.Times.once());
        }));
    });
});
//# sourceMappingURL=SpeakersHelper.spec.js.map