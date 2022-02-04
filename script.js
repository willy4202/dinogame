var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// ctx.fillStyle = 'green';
// ctx.fillRect(10, 10, 100, 100);
// // 10x10의 위치에 100x100의 사각형을 초록색으로 그리라는 코드

//오브젝트에 이를 넣어줌으로 호출할 수 있다.

var img1 = new Image();
img1.src = './img/dino.png'

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y, 50, 50);
    }
}

// 장애물은 랜덤이니 클래스로 만들어준다.
var img2 = new Image();
img2.src = './img/cactus.png'

class Cactus {
    constructor() {
        this.x = 800;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y, 40, 40)
    }
}

// 클래스로 만들어준 장애물을 객체로 뽑아내기 위해 var로 지정해준다


// 애니메이션에 필요한 타이머
var timer = 0;
//장애물 어레이 생성
var manyCactus = [];
var jumpTimer = 0;
var anima;

// 애니메이션이 필요하다.

dino.draw();

function frameAnima() {
    anima = requestAnimationFrame(frameAnima)
    timer += 1;
    let CactusSpawn = Math.floor(Math.random() * 300) + 6;
    let CactusSpeed = Math.floor(Math.random() * 4) + 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (timer % CactusSpawn === 0) {
        var cactus = new Cactus();
        manyCactus.push(cactus);
    }

    manyCactus.forEach((a, i, o) => {
        // x 좌표가 0 미만이면 array에서 제거하기
        // Object 
        if (a.x < 0) {
            o.splice(i, 1)
        }
        a.x -= CactusSpeed;
        collison(dino, a);

        a.draw();
    })
    dino.draw()

    //점프기능
    if (dinoJumping == true) {
        dino.y -= 6;
        jumpTimer += 1;
    }
    if (jumpTimer > 20) {
        dinoJumping = false;
    }
    if (dinoJumping == false) {
        if (dino.y < 200) {
            dino.y += 6;
        }
        jumpTimer = 0;
    }
}
frameAnima();

// 충돌 확인

function collison(dino, cactus) {
    var compareX = cactus.x - (dino.x + dino.width);
    var compareY = cactus.y - (dino.y + dino.height);
    if (compareX < 0 && compareY < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(anima);
    }
}


//점프 스위치
var dinoJumping = false;

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        dinoJumping = true;
    }
})

document.addEventListener('touchstart', function (e) {
    dinoJumping = true;
}
)