
window.addEventListener('load', function(){
    //CANVAS SETUP
    
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

