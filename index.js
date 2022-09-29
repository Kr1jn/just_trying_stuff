const con = document.getElementById("gameborder").getContext("2d");
const can = document.getElementById("gameborder");
let player = {
    x:0,
    y:0
};
let keys = {
    w: false,
    a: false,
    s: false,
    d: false, 
    space: false
};

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
    move();
    draw();
},1000/60
);
function draw() {
    con.clearRect(0,0,can.width,can.height);
    con.fillRect(player.x, player.y, 100, 100);
}

function move() {
    if(keys.a) {
        player.x -= 3;
    }
    if(keys.w) {
        player.y -= 3;
    }
    if(keys.s) {
        player.y += 3;
    }
    if(keys.d) {
        player.x += 3;
    }
}