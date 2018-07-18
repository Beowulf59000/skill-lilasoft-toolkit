import { MessagesHelper } from "../../src";
import { expect } from "chai";

describe("MessagesHelper", () => {
    describe("getRandomMessage", () => {
        const messagesHelper: MessagesHelper = new MessagesHelper();
        const messages: string[] = ["Message 1", "Message 2"];
        const randomMessage = messagesHelper.getRandomMessage(messages);
        expect(messages).to.contains(randomMessage); 
    });
});