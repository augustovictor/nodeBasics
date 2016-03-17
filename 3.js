var hello = require('./helloWorld2');
var args = require('minimist')(process.argv.slice(2), { string: "file" }); // Do not use single quotes

//----------------------------------------------------------------------
function printHello() {
    console.log("3.js (c) Victor Augusto");
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

hello.say(args.file).val(function(content) {
    console.log(content.toString());
}).or(function(err) {
    console.error(err.toString())
});
