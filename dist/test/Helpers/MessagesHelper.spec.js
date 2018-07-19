"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../src");
const chai_1 = require("chai");
describe("MessagesHelper", () => {
    describe("getRandomMessage", () => {
        const messagesHelper = new src_1.MessagesHelper();
        const messages = ["Message 1", "Message 2"];
        const randomMessage = messagesHelper.getRandomMessage(messages);
        chai_1.expect(messages).to.contains(randomMessage);
    });
});
//# sourceMappingURL=MessagesHelper.spec.js.map