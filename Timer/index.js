let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let timer = document.getElementById('timer');
socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};

let tempState;
let tempTime;
let tempTimeMax;

socket.onmessage = event => {  
    let data = JSON.parse(event.data);
    if (data.menu.state !== tempState) {
        tempState = data.menu.state
        if (tempState !== 2) {
            timer.style.opacity = 0;
        } else {
            timer.style.opacity = 1;
        }
    }
    if(tempTime !== data.menu.bm.time.current || tempTimeMax !== data.menu.bm.time.full) {
        tempTime = data.menu.bm.time.current;
        if(tempTimeMax !== data.menu.bm.time.full) {
            tempTimeMax = data.menu.bm.time.full;
        }
        time = (tempTime / tempTimeMax) * 100;
        timeString = time.toString();
        style = "conic-gradient(#999999 " + timeString + "%, rgba(0,0,0,0) 0)";
        timer.style.background = style;
    }
}