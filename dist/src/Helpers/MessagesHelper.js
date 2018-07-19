"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_format_1 = require("string-format");
class MessagesHelper {
    getRandomMessage(messages) {
        let i = 0;
        i = Math.floor(Math.random() * messages.length);
        return (messages[i]);
    }
    ;
    /* istanbul ignore next */
    getRandomMessageWithParameter(messages, parameter) {
        let message = this.getRandomMessage(messages);
        return string_format_1.format(message, parameter);
    }
}
exports.default = MessagesHelper;
;
//# sourceMappingURL=MessagesHelper.js.map