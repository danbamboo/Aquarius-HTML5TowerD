//************************
// Enemy Class
//************************

var enemy = function (game,enemyType){
    
    //Inital Position Based On Level
    if(currentLevel=="Level 1"){
        Phaser.Sprite.call(this, game, 135, -400, enemyType.spriteSheet, enemyType.sprite);

    }
    else if(currentLevel=="Level 2"){
        Phaser.Sprite.call(this, game, 1850, -400, enemyType.spriteSheet, enemyType.sprite);
    }
    
    this.name = enemyType.name;
    this.health = enemyType.health;
    this.gold = enemyType.goldValue;
    this.speed = enemyType.speed;
    this.spriteSheet = enemyType.spriteSheet;
    this.sprite = enemyType.sprite;
   
    
    // game.add.sprite(135,-400,this.spriteSheet,this.sprite); 
    this.anchor.setTo(.5,.5);
    game.physics.arcade.enable(this);
    enemies.add(this);
    
    //DEBUG  for enemy health update
    if(DEBUG){
        var enemyHealthText;
           if(currentLevel=="Level 1"){
               enemyHealthText = game.add.text(this.x-135,this.y+300, this.health, { font: "50px Arial", fill: "#4A235A" });
           }
           else if(currentLevel=="Level 2"){
                enemyHealthText = game.add.text(this.x-1800,this.y+300, this.health, { font: "50px Arial", fill: "#4A235A" });
           }
                this.addChild(enemyHealthText);

    }
}

enemy.prototype = Object.create(Phaser.Sprite.prototype);
enemy.prototype.constructor = enemy;


/*SHIP ENEMIES BY DIFFICULTY
1- brethren
2- scourge
3- squirrel
4- royal
5- dragon
6- admiral
*/

/*WAVES
1- brethren(10) + scourge(1) + brethren(2)
2- brethren(4) + scourge(5) + brethren(1) + scourge(5)
3- squirrel(2) + scourge(5) + brethren(2) + squirrel(6)
4- squirrel(5) + royal(3) + brethren(2) + scourge(9)
5- royal(5) + squirrel(2) + royal(8) + dragon(1)
6- squirrel(2) + dragon(5) + brethren(1) + royal(6)
7- dragon(5) + royal(15)
8- squirrel(3) + admiral(2) + royal(10)
9- brethren(3) + scourge(1) + squirrel(2) + royal(2) + dragon(5) + admiral(8)
10- admiral(15) + dragon(10)
*/

//************************
// Enemy Related Functions
//************************

function movePath(enemy,pathArr){
    var tempTween = [];
    var tempRotateTween = [];
    var time;
    var randomPathChoosen;
    var rotateThisWay;
    var rotateTween;
    
    //External Function chooses a random path to send current unit
    randomPathChoosen = pickRandomPathLevel1(pathArr.length);
    
    var path = pathArr[randomPathChoosen];
    
    for(var i=0, len = path.length; i < len; i++)
    {
        //If inital travel path, use current enemy position to first x/y vertex
        if(i==0)
        {
            time = normalizeDist(enemy.speed,enemy.position.x,enemy.position.y,path[i].x,path[i].y);
            tempTween[i] = game.add.tween(enemy).to({x:path[i].x, y:path[i].y},time);
            //rotate
            rotateThisWay = rotateBasedOnNextDirection(i,pathArr[randomPathChoosen]);
            tempRotateTween[i] = game.add.tween(enemy).to({angle:rotateThisWay}, 150);
            tempTween[i].chain(tempRotateTween[i]);
        }
        else{
            time = normalizeDist(enemy.speed,path[i-1].x,path[i-1].y, path[i].x,path[i].y);
            tempTween[i] = game.add.tween(enemy).to({x:path[i].x,y:path[i].y},time);
           //Give Rotation
            if(i+1<len){  //The last point on map does not require rotation after reacing
                rotateThisWay = rotateBasedOnNextDirection(i,pathArr[randomPathChoosen]);
                tempRotateTween[i] = game.add.tween(enemy).to({angle:rotateThisWay}, 150);
               //Chain previous rotation to next movement
                tempRotateTween[i-1].chain(tempTween[i]);
                //Chain new rotation to current movement
                tempTween[i].chain(tempRotateTween[i]);
            }
            else{
                tempRotateTween[i-1].chain(tempTween[i]);
            }
    }
}
    //Start movement
    tempTween[0].start();
}

//Inputs are current point (x1,y1) to point (x2,y2)
//Returns Velocity to travel
//IN THE FUTURE, HAVE THREE VARIABLES FOR SPEED CONTROL (SLOW/MEDIUM/FAST)
//AND PASS IN OBJECT PROPERTIES TO DETERMINE SPEED OF UNIT
function normalizeDist(enemySpeed,x1,y1,x2,y2){
    // var speedControl=.3;  //The smaller the variable, the slower
    
    var speedControl;
    switch(enemySpeed){
        case 'slow':
            speedControl = .15;
            break;
        case 'medium':
            speedControl = .25;
            break;
        default:  //Fast
            speedControl = .5;
    }
    
    var velocity;
    velocity = (Math.abs(x2-x1) + Math.abs(y2-y1))/speedControl;
    return velocity;
}

//Determine which way the ship should rotate based on current and next x/y corrdinates.
//Return  rotation angle function variable
function rotateBasedOnNextDirection(i,pathArr){
    
    //Subtract x1-x2, if not 0, than vertical rotation required
    var xAxisRotation = pathArr[i].x-pathArr[i+1].x;
    var yAxisRotation = pathArr[i].y-pathArr[i+1].y;
    
    if(xAxisRotation!=0){
        if(xAxisRotation>0){
           return 90;
        }
        else{
            return -90;
        }
    }
    //Subtract y1-y2, if not 0, than horizontal rotation required
    else if(yAxisRotation!=0){
         if(yAxisRotation>0){
           return -180;
        }
        else{
            return 0;
        }
    }
}



//This function was created in order to use the setTimeout function in a loop
//because placing setTimout() in a for loop is non-blocking
function sendWave(enemyType, howMany,pathArr,text,callNext){
    var timeBetweenUnits = Math.floor((Math.random()*1000) % 2000) + 2500;
     if(text){text.visible=false;}
    setTimeout(function (){
        var currentSprite = new enemy(game,enemyType);
        movePath(currentSprite,pathArr);
        timeoutIndex++;
    if(timeoutIndex<howMany){
        sendWave(enemyType, howMany,pathArr,text,callNext);
    }
    else{
        timeoutIndex=0;
        if(callNext){
        callNext();
        }
    }
    },timeBetweenUnits)
}


function wrapSendWave(enemyType, howMany,pathArr,text,callNext){
    return function(){
        sendWave(enemyType, howMany,pathArr,text,callNext);
}}


//Retruns a random number from 0 to (numberOfPossiblePaths-1)
//to account for array index base 0
//i.e if 3 paths, returns 0,1,or 2
function pickRandomPathLevel1(numberOfPossiblePaths){
    return Math.floor((Math.random()*100) % numberOfPossiblePaths);
}

function updateEnemyHealth(enemy){
        enemy.children[0].destroy();
        var enemyHealthText = game.add.text(this.x,this.y, enemy.health, { font: "50px Arial", fill: "#4A235A" });
        enemy.addChild(enemyHealthText);
    }