const con = document.getElementById("gameborder").getContext("2d");
const can = document.getElementById("gameborder");
let player = {
    x:0,
    y:0
};

let apple = {
    x:0,
    y:0
};
const col = {
    color1:"rgba(0, 255, 0, 1)",
    color2:"rgba(100, 255, 100, 1)",
    color3:"rgba(255, 0, 0, 1)"
};

let ocupied = false;
let dead= false;
let segment= [];
let length = 0;
let direction = 2;
let playerSize = 54;
let keys = {
    w: false,
    a: false,
    s: false,
    d: false, 
    space: false
};
class Segment {
    constructor(pos, live) {
        this.pos = pos;
        this.live = live;
    }
}
refresh();
function refresh() {
    segment = [];
    ocupied = false;
    player.x = 7*playerSize;
    player.y = 10*playerSize;
    direction = 1;
    length = 0;
    apple.x = 11*playerSize;
    apple.y = 10*playerSize;
    dead = false;
}

document.addEventListener('keyup', function(event) {
    if(event.code == 'KeyA') {
        keys.a = false;
    }
    if(event.code == 'KeyW') {
        keys.w = false;
    }
    if(event.code == 'KeyS') {
        keys.s = false;
    }
    if(event.code == 'KeyD') {
        keys.d = false;
    }
    if(event.code == 'Space') {
        keys.space = false;
    }
}
)

document.addEventListener('keydown', function(event) {
    if(event.code == 'KeyA') {
        keys.a = true;
    }
    if(event.code == 'KeyW') {
        keys.w = true;
    }
    if(event.code == 'KeyS') {
        keys.s = true;
    }
    if(event.code == 'KeyD') {
        keys.d = true;
    }
    if(event.code == 'Space') {
        keys.space = true;
    }
}
)


setInterval(function() {
    moveDir();
    draw();
},1000/60
);
setInterval(function() {
    move();
},500
);
function draw() {
    con.clearRect(0,0,can.width,can.height);
    board();
    if (!dead) {
        con.fillStyle="rgba(0, 0, 0, 1)";
        for (let i in segment) { 
            con.fillRect(segment[i].pos.x, segment[i].pos.y, playerSize, playerSize);
        }
        con.fillRect(player.x, player.y, playerSize, playerSize);
        con.fillStyle=col.color3; 
        con.fillRect(apple.x+playerSize/4, apple.y+playerSize/4, playerSize/2, playerSize/2);
    }
    else {
        con.fillStyle= "rgba(0, 0, 0, 1)";
        con.font = "70px Georgia";
        con.fillText("Game over!",can.width/2-150, can.height/2);
        con.fillText("press space to respawn",can.width/2-300, can.height/2+100);
    }
}

function board() {
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {
            if ((x % 2 == 0 && y % 2 == 0) || (x % 2 != 0 && y % 2 != 0)) {
                con.fillStyle= col.color2;
            } else {
                con.fillStyle= col.color1;
            }
            con.fillRect(x*54, y*54, 54, 54);
        }
    }
}
function move() {
    segment.push(new Segment({x: player.x, y: player.y}, length));
    for (let i in segment) {
        segment[i].live--;
        if (segment[i].live < 1) {
            segment.splice(i,1);
        }
    }
    if(direction==3) {
        player.x -= 54;
    }
    if(direction==0) {
        player.y -= 54;
    }
    if(direction==2) {
        player.y += 54;
    }
    if(direction==1) {
        player.x += 54;
    }
    for (let i in segment) {
        if (player.x == segment[i].pos.x && player.y == segment[i].pos.y) {
            ocupied = true;
            break;
        }
    }
    if(ocupied || player.x < 0 || player.y <0 || player.x >= 1080 || player.y >= 1080) {
        dead = true;
    }
    if (apple.x == player.x && apple.y == player.y) {
        eatfood();
    }
}

function moveDir() {
    if(keys.a && direction !=1) {
        direction= 3;
    }
    if(keys.w && direction !=2) {
        direction =0;
    }
    if(keys.s && direction !=0) {
        direction= 2;
    }
    if(keys.d && direction !=3) {
        direction= 1;
    }
    if(keys.space && dead) {
        refresh();
    }
}

function eatfood() {
    length++;
    for (let i in segment) {
        segment[i].live++;
    }
    moveApple();
}

function moveApple() {
    while(true) {
        apple.x = Math.round(Math.random()*19)*playerSize;
        apple.y = Math.round(Math.random()*19)*playerSize;
        let meReturn = false;
        if (apple.x != player.x && apple.y != player.y) {
            meReturn = true;
        }
        if (!meReturn) {
            for (let i in segment) {
                if (apple.x == segment[i].pos.x && apple.y == segment[i].pos.y) {
                    meReturn = true;
                    break;
                }
            }
        }
        else {
            return "happy";
        }
    }
}