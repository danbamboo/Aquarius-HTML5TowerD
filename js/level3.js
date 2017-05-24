
function startLevel3(){
    //DEBUG MODE ONLY
    var timer=17000;
    if(DEBUG){
        timer=0;
        skipLevel3.destroy();
        setTimeout(wrapLevel3Begin(),timer);  //17000
    }
    else{
    //Called on end of last wave
     endLevel2 = true;
    }
}

function wrapLevel3Begin(){
    var timer=5000;
    
    //DEBUG MODE ONLY
    if(DEBUG){
    return function(){
            timer=0;
        
        if(currentGold > 0){
            victoryTextCreate();
            setTimeout(loadLevel3(),timer)  //5000
        }
        else{
            gameOver();
        }
    }}

    //Normal Mode
    else{
        endLevel2 = false;
        victoryTextCreate();
        setTimeout(loadLevel3(),timer);
    }
    


}


function loadLevel3(){
    return function(){
        //Clear arrays
        towerCoordQ1.length = 0;
        towerCoordQ2.length = 0;
        towerCoordQ3.length = 0;
        towerCoordQ4.length = 0;
        
        //Destroy
        victoryTextDestroy();
        enemies.destroy();
        berzerkers.destroy();
        spTree.destroy();
        village.destroy();
        villager1.destroy();
        rectangleEnding.destroy();  //Used in update funciton, check for exception when null
       
        destroyMap();
        
        //Create
        sendWaveButton.visible = true;
        setLevel('Level 3', 'Mutiny');
        setWave('1 / 10');
        currentGold = 250;  //Init player with 250 gold to start game
        setGold(currentGold);
        
        //Groups
        berzerkers = game.add.group();
        enemies = game.add.group();
        game.physics.arcade.enable(enemies);
        
        //MAP
        createMap3();
        rectangleEnding = game.add.sprite(1000, 2100, null);
        game.physics.arcade.enable(rectangleEnding);
        rectangleEnding.body.setSize(50, 50, 0, 0); // set the size of the rectangle
        sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(level3Wave1, this);
        
         //Self Made Path Variables
        path1 = [{x:920,y:1000},{x:960,y:370},{x:1050,y:1300},{x:1720,y:1300},{x:1720,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path2 = [{x:920,y:1000},{x:960,y:370},{x:1050,y:740},{x:1720,y:740},{x:1720,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path3 = [{x:920,y:1000},{x:960,y:370},{x:1050,y:180},{x:220,y:180},{x:220,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path4 = [{x:920,y:1000},{x:960,y:370},{x:1050,y:740},{x:220,y:740},{x:220,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path5 = [{x:920,y:1000},{x:960,y:370},{x:1050,y:740},{x:220,y:740},{x:220,y:1050},{x:750,y:1050},{x:750,y:1310},{x:220,y:1310},{x:220,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path6 = [{x:920,y:1000},{x:960,y:370},{x:1050,y:180},{x:220,y:180},{x:220,y:1050},{x:750,y:1050},{x:750,y:1310},{x:220,y:1310},{x:220,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        // level3Path = [path1,path2,path3,path4];
        level3Path = [path1,path2,path3,path4,path5,path6];

    }
}


//ENEMY LEVEL 2 WAVES
function level3Wave1() {
    sendWave(brethren,10,level3Path,null,
    wrapSendWave(scourge,1,level3Path,null,
    wrapSendWave(brethren,2,level3Path,null,level3Wave3)));
    sendWaveButton.visible = false;
}
function level3Wave2(){
    setWave('2 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();

    sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,4,level3Path,sendWaveButton,
        wrapSendWave(scourge,5,level3Path,null,
        wrapSendWave(brethren,1,level3Path,null,
        wrapSendWave(scourge,5,level3Path,null,level3Wave3)))), this);
    
        
}
function level3Wave3(){
    setWave('3 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level3Path,sendWaveButton,
        wrapSendWave(scourge,5,level3Path,null,
        wrapSendWave(brethren,2,level3Path,null,
        wrapSendWave(squirrel,6,level3Path,null,level3Wave4)))), this);
}
function level3Wave4(){
    setWave('4 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,5,level3Path,sendWaveButton,
        wrapSendWave(royal,4,level3Path,null,
        wrapSendWave(brethren,2,level3Path,null,
        wrapSendWave(scourge,9,level3Path,null,level3Wave5)))), this);
}
function level3Wave5(){
    setWave('5 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(royal,5,level3Path,sendWaveButton,
        wrapSendWave(squirrel,2,level3Path,null,
        wrapSendWave(royal,8,level3Path,null,
        wrapSendWave(dragon,1,level3Path,null,level3Wave6)))), this);
}
function level3Wave6(){
    setWave('6 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level3Path,sendWaveButton,
        wrapSendWave(dragon,5,level3Path,null,
        wrapSendWave(brethren,1,level3Path,null,
        wrapSendWave(royal,6,level3Path,null,level3Wave7)))), this);
}
function level3Wave7(){
    setWave('7 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,5,level3Path,sendWaveButton,
        wrapSendWave(royal,15,level3Path,null,level3Wave8)), this);
}
function level3Wave8(){
    setWave('8 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,3,level3Path,sendWaveButton,
        wrapSendWave(admiral,2,level3Path,null,
        wrapSendWave(royal,10,level3Path,null,level3Wave9))), this);
}
function level3Wave9(){
    setWave('9 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,3,level3Path,sendWaveButton,
        wrapSendWave(scourge,1,level3Path,null,
        wrapSendWave(squirrel,2,level3Path,null,
        wrapSendWave(royal,2,level3Path,null,
        wrapSendWave(dragon,5,level3Path,null,
        wrapSendWave(admiral,8,level3Path,null,level3Wave10)))))), this);
}
function level3Wave10(){
    setWave('10 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,10,level3Path,sendWaveButton,
        wrapSendWave(admiral,15,level3Path,null,level3Over)), this);
}
//ENEMY LEVEL 2 WAVES
//============================




function createMap3(){
     //to load the map into the map
    map = game.add.tilemap('pirateMapLevel3');
    //add the tileset from the json file
    map.addTilesetImage('tiles_sheet', 'tiles');
    map.addTilesetImage('towerDefense_tilesheet', 'tiles2');

    layer1 = map.createLayer('Water');
    layer1.scale.y=.93;
    collisionLayer = map.createLayer('Background');
    collisionLayer.scale.y = .93;
    layer2 = map.createLayer('Ground');
    layer2.scale.y = .93;
    
    //SendToBack
    layer2.sendToBack();
    collisionLayer.sendToBack();
    layer1.sendToBack();
   
    //Game Board Alignment
    layer1.resizeWorld();
    layer2.resizeWorld();
    collisionLayer.resizeWorld();
    
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true; 
    game.scale.refresh();
}


function level3Over(){
     endLevel3 = true;
}

function gameHasEnded(){
  
       if(currentGold > 0){
            victoryTextCreate();
        }
        else{
            gameOver();
        }


}