var hello = require('./helloWorld3');
var args = require('minimist')(process.argv.slice(2), { string: "file" }); // Do not use single quotes

//----------------------------------------------------------------------
function printHello() {
    console.log("4.js (c) Victor Augusto");
    console.log("");
    console.log("Usage:");
    console.log("--file={name}     read file {name} and output it");
    console.log("");
}
//----------------------------------------------------------------------

if(args.help || !args.file) {
    printHello();
    process.exit(1);
}

// val() will run in Sync fashion and seq() in Async
hello.say(args.file).val(function(content) {
    console.log(content.toString());
}).or(function(err) {
    console.error(err.toString())
});
