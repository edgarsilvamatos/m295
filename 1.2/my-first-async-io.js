const fs = require('fs')

fs.readFile(process.argv[2], function (err, contents) {
    const lines = contents.toString().split('\n').length - 1
    console.log(lines)  
})