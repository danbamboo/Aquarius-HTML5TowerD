
function startLevel2(){
     endLevel1 = true;

}

function level2Debug(){
        timer=0;
        setTimeout(wrapLevel2Begin(),timer);  //17000
}

function wrapLevel2Begin(){
    var timer=5000;
    
    //DEBUG MODE ONLY
    if(DEBUG){
    return function(){
            timer=0;
        
        if(currentGold > 0){
            victoryTextCreate();
            setTimeout(loadLevel2(),timer)  //5000
        }
        else{
            gameOver();
        }
    }}

    //Normal Mode
    else{
        endLevel1 = false;
        victoryTextCreate();
        setTimeout(loadLevel2(),timer);
    }
    


}


function loadLevel2(){
    return function(){
        //Clear arrays
        towerCoordQ1.length = 0;
        towerCoordQ2.length = 0;
        towerCoordQ3.length = 0;
        towerCoordQ4.length = 0;
        
        //Destroy
        victoryTextDestroy();
        berzerkers.destroy();
        spTree.destroy();
        spTree2.destroy();
        spTree3.destroy();
        spTree4.destroy();
        village.destroy();
        villager1.destroy();
        rectangleEnding.destroy();  //Used in update funciton, check for exception when null
       
        destroyMap();
        
        //Create
        sendWaveButton.visible = true;
        setLevel('Level 2', 'Cutthroat');
        setWave('1 / 10');
        currentGold = 650;  //Init player with 250 gold to start game
        setGold(currentGold);
        
        //Groups
        berzerkers = game.add.group();
        game.physics.arcade.enable(enemies);
        
        //MAP
        createMap2();
        rectangleEnding = game.add.sprite(1000, 2100, null);
        game.physics.arcade.enable(rectangleEnding);
        rectangleEnding.body.setSize(50, 50, 0, 0); // set the size of the rectangle
        sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(level2Wave1, this);
        
         //Self Made Path Variables
        path1 = [{x:1850,y:370},{x:1050,y:370},{x:1050,y:1300},{x:1720,y:1300},{x:1720,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path2 = [{x:1850,y:370},{x:1050,y:370},{x:1050,y:740},{x:1720,y:740},{x:1720,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path3 = [{x:1850,y:370},{x:1050,y:370},{x:1050,y:180},{x:220,y:180},{x:220,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path4 = [{x:1850,y:370},{x:1050,y:370},{x:1050,y:740},{x:220,y:740},{x:220,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path5 = [{x:1850,y:370},{x:1050,y:370},{x:1050,y:740},{x:220,y:740},{x:220,y:1050},{x:750,y:1050},{x:750,y:1310},{x:220,y:1310},{x:220,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        path6 = [{x:1850,y:370},{x:1050,y:370},{x:1050,y:180},{x:220,y:180},{x:220,y:1050},{x:750,y:1050},{x:750,y:1310},{x:220,y:1310},{x:220,y:1650},{x:1000,y:1650},{x:1000,y:2100}];
        // level2Path = [path1,path2,path3,path4];
        level2Path = [path1,path2,path3,path4,path5,path6];

    }
}


//ENEMY LEVEL 2 WAVES
function level2Wave1() {
    sendWave(brethren,10,level2Path,null,
    wrapSendWave(scourge,1,level2Path,null,
    wrapSendWave(brethren,2,level2Path,null,level2Wave2)));
    sendWaveButton.visible = false;
}
function level2Wave2(){
    setWave('2 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();

    sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,4,level2Path,sendWaveButton,
        wrapSendWave(scourge,5,level2Path,null,
        wrapSendWave(brethren,1,level2Path,null,
        wrapSendWave(scourge,5,level2Path,null,level2Wave3)))), this);
    
        
}
function level2Wave3(){
    setWave('3 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level2Path,sendWaveButton,
        wrapSendWave(scourge,5,level2Path,null,
        wrapSendWave(brethren,2,level2Path,null,
        wrapSendWave(squirrel,6,level2Path,null,level2Wave4)))), this);
}
function level2Wave4(){
    setWave('4 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,5,level2Path,sendWaveButton,
        wrapSendWave(royal,4,level2Path,null,
        wrapSendWave(brethren,2,level2Path,null,
        wrapSendWave(scourge,9,level2Path,null,level2Wave5)))), this);
}
function level2Wave5(){
    setWave('5 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(royal,5,level2Path,sendWaveButton,
        wrapSendWave(squirrel,2,level2Path,null,
        wrapSendWave(royal,8,level2Path,null,
        wrapSendWave(dragon,1,level2Path,null,level2Wave6)))), this);
}
function level2Wave6(){
    setWave('6 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level2Path,sendWaveButton,
        wrapSendWave(dragon,5,level2Path,null,
        wrapSendWave(brethren,1,level2Path,null,
        wrapSendWave(royal,6,level2Path,null,level2Wave7)))), this);
}
function level2Wave7(){
    setWave('7 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,5,level2Path,sendWaveButton,
        wrapSendWave(royal,15,level2Path,null,level2Wave8)), this);
}
function level2Wave8(){
    setWave('8 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,3,level2Path,sendWaveButton,
        wrapSendWave(admiral,2,level2Path,null,
        wrapSendWave(royal,10,level2Path,null,level2Wave9))), this);
}
function level2Wave9(){
    setWave('9 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,3,level2Path,sendWaveButton,
        wrapSendWave(scourge,1,level2Path,null,
        wrapSendWave(squirrel,2,level2Path,null,
        wrapSendWave(royal,2,level2Path,null,
        wrapSendWave(dragon,5,level2Path,null,
        wrapSendWave(admiral,8,level2Path,null,level2Wave10)))))), this);
}
function level2Wave10(){
    setWave('10 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,10,level2Path,sendWaveButton,
        wrapSendWave(admiral,15,level2Path,null,startLevel3)), this);
}
//ENEMY LEVEL 2 WAVES
//============================




function createMap2(){
     //to load the map into the map
    map = game.add.tilemap('pirateMapLevel2');
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
    
    //Misc Sprites
    spTree = game.add.sprite(1160, 2, 'tree');
    spTree.scale.x = .5;
    spTree.scale.y = .5;
    spTree2 = game.add.sprite(1280, 840, 'tree');
    spTree2.scale.x = .5;
    spTree2.scale.y = .5;
    spTree3 = game.add.sprite(1320, 910, 'tree');
    spTree3.scale.x = .4;
    spTree3.scale.y = .4;
    spTree4 = game.add.sprite(1230, 90, 'tree');
    spTree4.scale.x = .3;
    spTree4.scale.y = .3;
    village = game.add.sprite(1430, 70,'village');
    village.scale.x = .8;
    village.scale.y = .8;
    villager1 = game.add.sprite(1300, 150, 'villager');
    villager1.scale.x = 1.6;
    villager1.scale.y = 1.6;
}

function destroyMap2(){
    map.destroy();
    collisionLayer.destroy();
    layer1.destroy();
    layer2.destroy();
}