var fs = require('fs');
var ASQ = require('asynquence');
require('asynquence-contrib');

function readFile(fileName) {
    return ASQ(function(done) {
        var stream = fs.createReadStream(fileName);
        var content = "";

        stream.pipe( fs.createWriteStream(fileName + ".bkp") );

        // Listen for events
        // It will run every time an event is fired
        stream.on('data', function(data) {
            // console.log("data");
            content += data;
        });

        stream.on('end', function() {
            done(content);
        });
    });
}

function say(fileName) {
    return readFile(fileName)
        .then(delayMsg);
}

function delayMsg(done, fileContent) {
    setTimeout(function() {
        done(fileContent);
    }, 2000);
}

module.exports.say = say
