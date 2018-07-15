import { STOP_INTENT, CANCEL_INTENT, HELP_INTENT } from "../src/Intents";
import 'mocha';
import { assert } from 'chai';

describe("Intents", () => {

    it("Intent HELP_INTENT must be defined", () => {
        assert.isDefined(HELP_INTENT);
    });

    it("Intent HELP_INTENT must be equal to 'AMAZON.HelpIntent'", () => {
        assert.equal(HELP_INTENT, 'AMAZON.HelpIntent');
    });

    it("Intent CANCEL_INTENT must be defined", () => {
        assert.isDefined(CANCEL_INTENT);
    });

    it("Intent CANCEL_INTENT must be equal to 'AMAZON.CancelIntent'", () => {
        assert.equal(CANCEL_INTENT, 'AMAZON.CancelIntent');
    });

    it("Intent STOP_INTENT must be defined", () => {
        assert.isDefined(STOP_INTENT);
    });

    it("Intent STOP_INTENT must be equal to 'AMAZON.StopIntent'", () => {
        assert.equal(STOP_INTENT, 'AMAZON.StopIntent');
    });
});