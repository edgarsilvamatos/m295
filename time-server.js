const net = require('net');

const server = net.createServer(function (socket){
    
    let date = new Date();

    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1);
    let day = addZero(date.getDate());
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());

    let output = year+'-'+month+'-'+day+' '+hours+':'+minutes;

    socket.end(output+"\n");
})

function addZero(number){
    return number < 10 ? "0" + number: number;
}

server.listen(process.argv[2]);