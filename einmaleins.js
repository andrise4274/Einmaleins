// Retrieve the data from the URL
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('data');

// Use the data as needed
console.log('Mode Selected:', decodeURIComponent(mode));


//CANVAS SETUP
window.addEventListener('load', function(){

    // global variables
    let running = false;

    let jumping = false;
    let resetting = false;
    let resetCount = 0;
    let resetTime = 50;


    let num_platforms = 3;
    let start_x = window.innerWidth / 2;
    let start_y = window.innerHeight *2/3;

    let platforms = [];
    let plat_gap = window.innerHeight * 0.8 / 4

    let bottomLine = [];

    // boolean that defines if guess is correct
    let correct = null;
    let guess = null;

    // mode
    let mode = 12;


    // stores which is the correct result, either 0,1 or 2
    let data = [["7 x 6", [53, 49, 42], 2],
    ["6 x 8", [23, 11, 48], 2],
    ["6 x 9", [23, 54, 48], 1],
    ["8 x 8", [64, 11, 48], 0],
    ["4 x 8", [23, 32, 48], 1],
    ["3 x 8", [23, 32, 24], 2],
    ["4 x 7", [28, 32, 24], 0],
    ["3 x 9", [28, 27, 24], 1],
    ["7 x 7", [49, 50, 48], 0],
    ["8 x 9", [68, 74, 72], 2],
    ["9 x 7", [81, 64, 63], 2],
    [ "1 x 1", [ 0, 1, 3 ], 1 ],
    [ "1 x 2", [ 3, 5, 2 ], 2 ],
    [ "1 x 3", [ 0, 3, 6 ], 1 ],
    [ "1 x 4", [ 4, 3, 5 ], 0 ],
    [ "1 x 5", [ 0, 5, 7 ], 1 ],
    [ "1 x 6", [ 6, 0, 8 ], 0 ],
    [ "1 x 7", [ 0, 8, 7 ], 2 ],
    [ "1 x 8", [ 8, 19, 9 ], 0 ],
    [ "1 x 9", [ 18, 9, 12 ], 1 ],
    [ "1 x 10", [ 20, 13, 10 ], 2 ],
    [ "2 x 1", [ 2, 1, 6 ], 0 ],
    [ "2 x 2", [ 2, 4, 6 ], 1 ],
    [ "2 x 3", [ 3, 6, 12 ], 1 ],
    [ "2 x 4", [ 4, 12, 8 ], 2 ],
    [ "2 x 5", [ 5, 12, 10 ], 2 ],
    [ "2 x 6", [ 12, 0, 18 ], 0 ],
    [ "2 x 7", [ 7, 14, 18 ], 1 ],
    [ "2 x 8", [ 8, 16, 22 ], 1 ],
    [ "2 x 9", [ 9, 18, 22 ], 1 ],
    [ "2 x 10", [ 0, 24, 20 ], 2 ],
    [ "3 x 1", [ 2, 12, 3 ], 2 ],
    [ "3 x 2", [ 0, 9, 6 ], 2 ],
    [ "3 x 3", [ 9, 3, 12 ], 0 ],
    [ "3 x 4", [ 0, 21, 12 ], 2 ],
    [ "3 x 5", [ 0, 21, 15 ], 2 ],
    [ "3 x 6", [ 0, 18, 24 ], 1 ],
    [ "3 x 7", [ 0, 30, 21 ], 2 ],
    [ "3 x 8", [ 24, 8, 27 ], 0 ],
    [ "3 x 9", [ 9, 27, 36 ], 1 ],
    [ "3 x 10", [ 30, 10, 33 ], 0 ],
    [ "4 x 1", [ 4, 3, 16 ], 0 ],
    [ "4 x 2", [ 2, 8, 16 ], 1 ],
    [ "4 x 3", [ 6, 16, 12 ], 2 ],
    [ "4 x 4", [ 8, 16, 28 ], 1 ],
    [ "4 x 5", [ 10, 28, 20 ], 2 ],
    [ "4 x 6", [ 18, 24, 32 ], 1 ],
    [ "4 x 7", [ 21, 28, 32 ], 1 ],
    [ "4 x 8", [ 16, 44, 32 ], 2 ],
    [ "4 x 9", [ 9, 40, 36 ], 2 ],
    [ "4 x 10", [ 30, 48, 40 ], 2 ],
    [ "5 x 1", [ 4, 10, 5 ], 2 ],
    [ "5 x 2", [ 10, 6, 20 ], 0 ],
    [ "5 x 3", [ 15, 9, 20 ], 0 ],
    [ "5 x 4", [ 16, 35, 20 ], 2 ],
    [ "5 x 5", [ 15, 25, 30 ], 1 ],
    [ "5 x 6", [ 18, 45, 30 ], 2 ],
    [ "5 x 7", [ 21, 40, 35 ], 2 ],
    [ "5 x 8", [ 32, 40, 50 ], 1 ],
    [ "5 x 9", [ 45, 18, 55 ], 0 ],
    [ "5 x 10", [ 40, 60, 50 ], 2 ],
    [ "6 x 1", [ 4, 6, 18 ], 1 ],
    [ "6 x 2", [ 12, 10, 30 ], 0 ],
    [ "6 x 3", [ 9, 36, 18 ], 2 ],
    [ "6 x 4", [ 12, 24, 42 ], 1 ],
    [ "6 x 5", [ 20, 36, 30 ], 2 ],
    [ "6 x 6", [ 36, 30, 42 ], 0 ],
    [ "6 x 7", [ 21, 54, 42 ], 2 ],
    [ "6 x 8", [ 48, 32, 54 ], 0 ],
    [ "6 x 9", [ 27, 60, 54 ], 2 ],
    [ "6 x 10", [ 60, 40, 72 ], 0 ],
    [ "7 x 1", [ 4, 14, 7 ], 2 ],
    [ "7 x 2", [ 12, 35, 14 ], 2 ],
    [ "7 x 3", [ 21, 15, 35 ], 0 ],
    [ "7 x 4", [ 16, 28, 35 ], 1 ],
    [ "7 x 5", [ 25, 49, 35 ], 2 ],
    [ "7 x 6", [ 36, 42, 49 ], 1 ],
    [ "7 x 7", [ 35, 49, 56 ], 1 ],
    [ "7 x 8", [ 32, 63, 56 ], 2 ],
    [ "7 x 9", [ 54, 63, 77 ], 1 ],
    [ "7 x 10", [ 50, 70, 91 ], 1 ],
    [ "8 x 1", [ 6, 24, 8 ], 2 ],
    [ "8 x 2", [ 16, 14, 24 ], 0 ],
    [ "8 x 3", [ 21, 24, 32 ], 1 ],
    [ "8 x 4", [ 20, 32, 56 ], 1 ],
    [ "8 x 5", [ 25, 64, 40 ], 2 ],
    [ "8 x 6", [ 36, 48, 56 ], 1 ],
    [ "8 x 7", [ 49, 56, 72 ], 1 ],
    [ "8 x 8", [ 56, 64, 72 ], 1 ],
    [ "8 x 9", [ 72, 45, 88 ], 0 ],
    [ "8 x 10", [ 60, 96, 80 ], 2 ],
    [ "9 x 1", [ 9, 8, 36 ], 0 ],
    [ "9 x 2", [ 14, 45, 18 ], 2 ],
    [ "9 x 3", [ 27, 24, 36 ], 0 ],
    [ "9 x 4", [ 24, 54, 36 ], 2 ],
    [ "9 x 5", [ 40, 63, 45 ], 2 ],
    [ "9 x 6", [ 48, 54, 63 ], 1 ],
    [ "9 x 7", [ 49, 63, 72 ], 1 ],
    [ "9 x 8", [ 48, 90, 72 ], 2 ],
    [ "9 x 9", [ 81, 63, 90 ], 0 ],
    [ "9 x 10", [ 70, 90, 117 ], 1 ],
    [ "10 x 1", [ 8, 10, 20 ], 1 ],
    [ "10 x 2", [ 16, 20, 30 ], 1 ],
    [ "10 x 3", [ 27, 50, 30 ], 2 ],
    [ "10 x 4", [ 32, 40, 60 ], 1 ],
    [ "10 x 5", [ 50, 45, 80 ], 0 ],
    [ "10 x 6", [ 42, 90, 60 ], 2 ],
    [ "10 x 7", [ 70, 63, 80 ], 0 ],
    [ "10 x 8", [ 56, 80, 110 ], 1 ],
    [ "10 x 9", [ 90, 63, 120 ], 0 ],
    [ "10 x 10", [ 80, 100, 130 ], 1 ]
            ];

    //console.log(data[1][2])

    // array which stores the indicies

    let indicies = [
        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11,
       12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
       24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
       36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
       48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
       60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
       72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
       84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95,
       96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111
     ]

    // make this random, and make difficult calculations occur more often


    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.8;

    // size and position of control buttons
    let deltaButton = canvas.width/3;
    let buttonheight = canvas.height * 0.125

    const buttonUp = this.document.getElementById('buttonUp');
    buttonUp.style.left = 1*deltaButton + 'px';
    buttonUp.style.bottom =  0 + 'px';
    buttonUp.style.width = deltaButton + 'px';
    buttonUp.style.height = buttonheight + 'px';

    const buttonLeft = this.document.getElementById('buttonLeft');
    buttonLeft.style.left = 0*deltaButton + 'px';
    buttonLeft.style.bottom =  0 + 'px';
    buttonLeft.style.width = deltaButton + 'px';
    buttonLeft.style.height = buttonheight + 'px';

    const buttonRight = this.document.getElementById('buttonRight');
    buttonRight.style.left = 2*deltaButton + 'px';
    buttonRight.style.bottom =  0 + 'px';
    buttonRight.style.width = deltaButton + 'px';
    buttonRight.style.height = buttonheight + 'px';

    // text field which shows multiplication
    const tfMul = this.document.getElementById('tfMul');
    tfMul.style.left = 100 + 'px';
    tfMul.style.top = 0 + 'px';
    tfMul.style.width = canvas.width - 200 + 'px';
    tfMul.style.height = buttonheight + 'px'

    //dropdown list to select level
    const selectlvl = this.document.getElementById('level');
    selectlvl.style.left = canvas.width - 100 + 'px';
    selectlvl.style.top = 0*deltaButton + 'px';
    selectlvl.style.width = 100 + 'px';
    selectlvl.style.height = buttonheight + 'px';

    // start stop button
    
    const btnStart = this.document.getElementById('start');
    btnStart.style.left = 0 + 'px';
    btnStart.style.top = 0 + 'px';
    btnStart.style.width = 100 + 'px';
    btnStart.style.height = buttonheight + 'px';

    // reload button
    const btnReload = this.document.getElementById('reload');
    btnReload.style.left = 0 + 'px';
    btnReload.style.top = 0 + 'px';
    btnReload.style.width = 100 + 'px';
    btnReload.style.height = buttonheight + 'px';

//---------------------------------------------------------------------------------

    // event listeners
    buttonUp.addEventListener("click", function() {
        if (!jumping && !resetting) {
            guess = 1;
            jumping = true;

            // check if the guess was correct
            if (platforms[0].correctindex == guess) {
                correct = true;
            } else {
                correct = false;
            }  
        }
    });


    buttonLeft.addEventListener("click", function() {
        if (!jumping && !resetting) {
            guess = 0;
            jumping = true;

            // check if the guess was correct
            if (platforms[0].correctindex == guess) {
                correct = true;
            } else {
                correct = false;
            }
        }
        
    });


    buttonRight.addEventListener("click", function() {
        if (!jumping && !resetting) {
            guess = 2;
            jumping = true;

            // check if the guess was correct
            if (platforms[0].correctindex == guess) {
                correct = true;
            } else {
                correct = false;
            }
        
        }
    });


    btnStart.addEventListener("click", function() {
        running = true;
        start();
        btnStart.style.visibility = 'hidden';
        btnReload.style.visibility = 'visible';
    });

    btnReload.addEventListener("click", function() {
        location.reload();
    });

    selectlvl.addEventListener('change', function() {
        let selectedOption = selectlvl.options[selectlvl.selectedIndex];
        if (selectedOption.value == 'gemütlich') {
            Game.speedY = plat_gap/400;
            resetTime = 50;
        } else if (selectedOption.value == 'mittel') {
            Game.speedY = plat_gap/240;
            resetTime = 50;
        } else if (selectedOption.value == 'schwer') {
            Game.speedY = plat_gap/119;
            resetTime = 50;
        } else if (selectedOption.value == 'Endgegner') {
            Game.speedY = plat_gap/80;
            resetTime = 15;
        }
      });

    //---------------------------------------------------------------------------------
    class Layer {
        constructor(game, img, speedMod) {
            this.game = game;
            this.image = img;
            this.speedModifier = speedMod;
            this.width = canvas.width;
            this.height = 4056;
            this.x = 0;
            this.y = 0;
        }

        update() {
            if (this.y >= this.height) this.y = 0;
            else this.y += Game.speedY * this.speedModifier;
        }

        draw(context) {
            context.drawImage(this.image, this.x, this.y - this.height);
        }
        
    }

    class Background {
        constructor(game) {
            this.game = game;
            this.image1 = document.getElementById('layer2');
            this.image2 = document.getElementById('layer2');
            this.layer1 = new Layer(this.game, this.image1, 1);
            this.layer2 = new Layer(this.game, this.image2, 1);
            this.layers = [this.layer1];
        }

        update(){
            this.layers.forEach(layer => layer.update());
        }

        draw(context){
            this.layers.forEach(layer => layer.draw(context));
        }
    }
    //---------------------------------------------------------------------------------
    
    class Platform {
        constructor(game, y, answers, correctindex, mul) {
            this.game = game;
            this.x = 0;
            this.y = y;
            this.width = canvas.width;
            this.height = 0.01 * window.innerHeight;
            this.correctindex = correctindex;
            this.answers = answers;
            this.mul = mul;
            this.image = document.getElementById('prov_platform');
        }

        update(){
            // if game window is moving up
            this.y += Game.speedY;

        }
        draw(context){
            //draw a platfo
            for (let i=0; i<3; i++) {
                context.fillStyle = 'blue';
                context.drawImage(this.image, (this.width/3 * i), this.y, this.width/3, this.height*5);
                //context.fillRect((this.width/3 * i), this.y, this.width/3, this.height); 

                //draw the number above platforms
                context.fillStyle = 'black';
                context.font = Math.floor(0.07 * window.innerHeight) + "px Georgia";
                context.fillText(this.answers[i], (this.width/3 * i) + deltaButton/2 , this.y - 2);
            }
        }
    }

    class Net {
        constructor(game, y) {
            this.game = game;
            this.x = 0;
            this.y = y;

            this.imgnet = document.getElementById('net');
        }
        update() {
            this.y += Game.speedY;
        }
        draw(context) {
            context.fillStyle = 'green';
            context.fillRect(this.x + canvas.width/2 - 30, this.y, 110, 6);
            //context.drawImage(this.imgnet, this.x + canvas.width/2 - 30, this.y, 110, 6)
        }
    }

//---------------------------------------------------------------------------------


    class Player {
        static jumping = false;
        constructor(game, net) {
            this.game = game;
            this.net = net;
            
            this.speedY = -plat_gap/8;
            this.speedX = canvas.width / 80;
            this.width = 50;
            this.height = 50;
            this.playerX = canvas.width/2;
            this.playerY = bottomLine[0].y - 50;

            this.d_speedY = 1;

            this.icon = document.getElementById('einstein');

            this.correct = document.getElementById('correct');
            this.false = document.getElementById('false');
        }

        upjump() {
            this.speedY = this.speedY + (plat_gap/150);
            this.playerY += this.speedY;
            //this.playerX += this.speedX;
            // when jump is finished

            if (this.playerY >= bottomLine[0].y - 50 - plat_gap && this.speedY > 0) {
                return 1;
            }
        }

        leftjump(){
            this.speedY = this.speedY + (plat_gap/150);
            this.playerY += this.speedY;
            this.playerX -= this.speedX;

            if (this.playerY >= bottomLine[0].y - 50 - plat_gap && this.speedY > 0) {
                return 0;
            }
        }

        rightjump(){
            this.speedY = this.speedY + (plat_gap/150);
            this.playerY += this.speedY;
            this.playerX += this.speedX;

            if (this.playerY >= bottomLine[0].y - 50 - plat_gap && this.speedY > 0) {
                return 2;
            }
        }


        falseupjump() {
            this.speedY = this.speedY + (plat_gap/150);
            this.playerY += this.speedY;
            //this.playerX += this.speedX;
            // when jump is finished

            if (this.playerY >= bottomLine[0].y - 50 && this.speedY > 0) {
                return 1;
            }
        }

        falserightjump() {
            this.speedY = this.speedY + (plat_gap/150);
            this.playerY += this.speedY;
            this.playerX += this.speedX;

            if (this.playerY >= bottomLine[0].y - 50 && this.speedY > 0) {
                return 2;
            }
        }

        falseleftjump() {
            this.speedY = this.speedY + (plat_gap/150);
            this.playerY += this.speedY;
            this.playerX -= this.speedX;

            if (this.playerY >= bottomLine[0].y - 50 && this.speedY > 0) {
                return 0;
            }
        }

        update() {
            // check if still resetting
            if (!jumping && !resetting){
                this.playerY = bottomLine[0].y - 50;

            } else if (resetting && resetCount < resetTime) {
                resetCount += 1;
                
                this.playerY = bottomLine[0].y - 50;
                
            } else if (resetting) {
                resetting = false;
                resetCount = 0;
                
                this.playerY = bottomLine[0].y - 50;
                this.playerX = canvas.width/2;
            }

        }

        draw(context) {
            context.fillStyle = 'black';
            context.drawImage(this.icon, this.playerX, this.playerY);
            //context.fillRect(this.playerX, this.playerY, 50, 50);

            // check if still resetting
            if (resetting && resetCount < resetTime) {
                if (correct) {
                    context.drawImage(this.correct, this.playerX, this.playerY);
                } else {
                    context.drawImage(this.false, this.playerX, this.playerY);
                }
            }
        }
    }


    //---------------------------------------------------------------------------------
    class Game {
        static points = 0;

        // how hard the game is to play
        static speedY = canvas.height/1500;
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            this.net = new Net(this, 2*plat_gap);
            // store net in container that class player can acess height
            bottomLine.push(this.net);
            this.dataindex = Math.floor(Math.random()*data.length)
            this.player = new Player(this, this.net);

            //audio
            this.soundtrack = document.getElementById('audio');
        }

        settfMul(ind) {
            tfMul.value = data[ind][0];
        }

        initPlatforms(height1, height2, height3) {
            var heights = [height3, height2, height1];

            for (let i=0; i<num_platforms; i++) {
                //var rand = Math.floor(Math.random()*data.length);
                var ind = indicies[i];
                let plat1 = new Platform(this, heights[i], data[ind][1], data[ind][2], ind);
                platforms.push(plat1);
            }
            this.settfMul(indicies[0])
        }


        createPlatform(height){
            var rand = Math.floor(Math.random()*data.length);
            var ind = indicies[rand];
            let plat = new Platform(this, height, data[ind][1], data[ind][2], ind);
            platforms.push(plat);
            console.log("platform created");
        }


        update(){

            //this.background.update();
            if (correct && jumping) {
                // variable to check if jump is funishe
                var x = 10;
                // check whether left, middle or right jump
                if (guess == 0) {
                    x = this.player.leftjump();
                } else if (guess == 1) {
                    x = this.player.upjump();
                } else if (guess == 2){
                    x = this.player.rightjump();
                }
                    if (x == 0 ||  x == 1 || x == 2) {
                        jumping = false;
                        this.player.playerY = bottomLine[0].y - 50;

                        this.net.y = platforms[0].y;
                        platforms.shift();
                        this.createPlatform(platforms[0].y - 2*plat_gap);
                        Game.points += 1;
                
                        var ind = platforms[0].mul;
                        this.settfMul(ind);

                        // reset speedy
                        this.player.speedY = -plat_gap/8;

                        // reset player position
                        resetCount = 0;
                        resetting = true;
                        //this.player.playerX = canvas.width/2;
                        //this.player.playerY = bottomLine[0].y - 50;

                    }

                } else if (!correct && jumping){
                    // variable to check if jump is funishe
                var y = 10;
                // check whether left, middle or right jump
                if (guess == 0) {
                    y = this.player.falseleftjump();
                } else if (guess == 1) {
                    y = this.player.falseupjump();
                } else if (guess == 2){
                    y = this.player.falserightjump();
                }
                    if (y == 0 ||  y == 1 || y == 2) {
                        jumping = false;
                        // reset speedy and speedx
                        this.player.speedY = -plat_gap/8;
                        //this.player.speedX = 0;

                        resetting = true;
                        resetCount = 0;
                        //this.player.playerX = canvas.width/2;
                        //this.player.playerY = bottomLine[0].y - 50;
                        // reset player position
                    }
                }


                this.net.update();

                this.player.update();

            // check if one platform is remaining
            if (platforms[2].y - 50 >= canvas.height) {
                running = false;
                
                function showScore() {
                    tfMul.value = "Sehr gut!, du hast " + Game.points + " Punkte";
                }
                window.setTimeout(showScore, 1000);
                //this.soundtrack.stop();

            }
        
            platforms.forEach(plat => {
                plat.update();
            });
        }

        draw(context){
            //this.background.draw(context);
            platforms.forEach(plat => {
                plat.draw(context);
            });
            this.net.draw(context);
            this.player.draw(context);
        }
    }

//---------------------------------------------------------------------------------

    const game = new Game(canvas.width, canvas.height);

    //create initial platforms
    game.initPlatforms(-plat_gap, 0, plat_gap);





    // animation loop
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }

    function start() {
        animate();
        game.soundtrack.play();
    }


    function stop(){
        cancelAnimationFrame(animate)
    }

    
})

