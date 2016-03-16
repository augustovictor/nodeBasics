var fs = require('fs');

function say(filename) {
    return fs.readFileSync(filename);
}

module.exports.say = say
