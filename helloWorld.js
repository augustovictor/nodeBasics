var fs = require('fs');

function say(filename, done) {
    return fs.readFile(filename, function(err, content) {

        if(err) throw err;

        // Simulation of doing something
        setTimeout(function() {
            done(null, content);
        }, 2000);

    });
}

module.exports.say = say
