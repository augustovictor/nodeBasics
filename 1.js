function printHello() {
    console.log("1.js (c) Victor Augusto");
    console.log("");
    console.log("Usage:");
    console.log("--help            print this help");
    console.log("--name            say hello {name}");
    console.log("");
}

var args = require('minimist')(process.argv.slice(2), { string: "name" }); // Do not use single quotes

if(args.help || !args.name) {
    printHello();
    process.exit(1);
}

var name = args.name;

console.log('Hello ' + name);
