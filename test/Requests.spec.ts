import 'mocha';
import { assert } from 'chai';
import { LAUNCH_REQUEST, INTENT_REQUEST, SESSION_ENDED_REQUEST } from '../src/Requests';

describe("Intents", () => {

    it("Intent LAUNCH_REQUEST must be defined", () => {
        assert.isDefined(LAUNCH_REQUEST);
    });

    it("Intent LAUNCH_REQUEST must be equal to 'LaunchRequest'", () => {
        assert.equal(LAUNCH_REQUEST, 'LaunchRequest');
    });

    it("Intent INTENT_REQUEST must be defined", () => {
        assert.isDefined(INTENT_REQUEST);
    });

    it("Intent INTENT_REQUEST must be equal to 'IntentRequest'", () => {
        assert.equal(INTENT_REQUEST, 'IntentRequest');
    });

    it("Intent SESSION_ENDED_REQUEST must be defined", () => {
        assert.isDefined(SESSION_ENDED_REQUEST);
    });

    it("Intent SESSION_ENDED_REQUEST must be equal to 'SessionEndedRequest'", () => {
        assert.equal(SESSION_ENDED_REQUEST, 'SessionEndedRequest');
    });
});