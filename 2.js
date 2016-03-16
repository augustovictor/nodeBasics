var hello = require('./helloWorld');
var args = require('minimist')(process.argv.slice(2), { string: "file" }); // Do not use single quotes

//----------------------------------------------------------------------
function printHello() {
    console.log("2.js (c) Victor Augusto");
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

var content = hello.say(args.file);
console.log(content.toString());
