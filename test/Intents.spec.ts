import { STOP_INTENT, CANCEL_INTENT, HELP_INTENT } from "../src/Intents";
import 'mocha';
import { assert } from 'chai';

describe("Intents", () => {

    describe("Intent HELP_INTENT must be defined", () => {
        assert.isDefined(HELP_INTENT);
    });

    describe("Intent HELP_INTENT must be equal to 'AMAZON.HelpIntent'", () => {
        assert.equal(HELP_INTENT, 'AMAZON.HelpIntent');
    });

    describe("Intent CANCEL_INTENT must be defined", () => {
        assert.isDefined(CANCEL_INTENT);
    });

    describe("Intent CANCEL_INTENT must be equal to 'AMAZON.CancelIntent'", () => {
        assert.equal(CANCEL_INTENT, 'AMAZON.CancelIntent');
    });

    describe("Intent STOP_INTENT must be defined", () => {
        assert.isDefined(STOP_INTENT);
    });

    describe("Intent STOP_INTENT must be equal to 'AMAZON.StopIntent'", () => {
        assert.equal(STOP_INTENT, 'AMAZON.StopIntent');
    });
});