var fs = require('fs');

function say(filename, done) {
    return fs.readFile(filename, done);
}

module.exports.say = say
