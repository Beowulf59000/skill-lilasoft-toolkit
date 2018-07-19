"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const Requests_1 = require("../src/Requests");
describe("Intents", () => {
    it("Intent LAUNCH_REQUEST must be defined", () => {
        chai_1.assert.isDefined(Requests_1.LAUNCH_REQUEST);
    });
    it("Intent LAUNCH_REQUEST must be equal to 'LaunchRequest'", () => {
        chai_1.assert.equal(Requests_1.LAUNCH_REQUEST, 'LaunchRequest');
    });
    it("Intent INTENT_REQUEST must be defined", () => {
        chai_1.assert.isDefined(Requests_1.INTENT_REQUEST);
    });
    it("Intent INTENT_REQUEST must be equal to 'IntentRequest'", () => {
        chai_1.assert.equal(Requests_1.INTENT_REQUEST, 'IntentRequest');
    });
    it("Intent SESSION_ENDED_REQUEST must be defined", () => {
        chai_1.assert.isDefined(Requests_1.SESSION_ENDED_REQUEST);
    });
    it("Intent SESSION_ENDED_REQUEST must be equal to 'SessionEndedRequest'", () => {
        chai_1.assert.equal(Requests_1.SESSION_ENDED_REQUEST, 'SessionEndedRequest');
    });
});
//# sourceMappingURL=Requests.spec.js.map