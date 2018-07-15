"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Intents_1 = require("../src/Intents");
require("mocha");
const chai_1 = require("chai");
describe("Intents", () => {
    describe("Intent HELP_INTENT must be defined", () => {
        chai_1.assert.isDefined(Intents_1.HELP_INTENT);
    });
    describe("Intent HELP_INTENT must be equal to 'AMAZON.HelpIntent'", () => {
        chai_1.assert.equal(Intents_1.HELP_INTENT, 'AMAZON.HelpIntent');
    });
    describe("Intent CANCEL_INTENT must be defined", () => {
        chai_1.assert.isDefined(Intents_1.CANCEL_INTENT);
    });
    describe("Intent CANCEL_INTENT must be equal to 'AMAZON.CancelIntent'", () => {
        chai_1.assert.equal(Intents_1.CANCEL_INTENT, 'AMAZON.CancelIntent');
    });
    describe("Intent STOP_INTENT must be defined", () => {
        chai_1.assert.isDefined(Intents_1.STOP_INTENT);
    });
    describe("Intent STOP_INTENT must be equal to 'AMAZON.StopIntent'", () => {
        chai_1.assert.equal(Intents_1.STOP_INTENT, 'AMAZON.StopIntent');
    });
});
//# sourceMappingURL=Intents.spec.js.map