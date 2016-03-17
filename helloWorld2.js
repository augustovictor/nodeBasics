var fs = require('fs');
var ASQ = require('asynquence');
require('asynquence-contrib');

function readFile(fileName) {
    var sq = ASQ();

    fs.readFile( fileName, sq.errfcb() );

    return sq;
}

function say(fileName) {
    return readFile(fileName)
        .then(delayMsg);
}

function delayMsg(done, fileContent) {
    setTimeout(function() {
        done(fileContent);
    }, 1000);
}

module.exports.say = say
