const util = require('util');

exports.name = 'javascript';
exports.permission = 'botdev';
exports.aliases = ['eval', 'js'];
exports.eval = function(msg) {
    try {
        var result = eval(msg.args);
        result = util.inspect(result);
    } catch (err) {
        result = err?.name + ':' + err?.message;
    }
    return result;
}