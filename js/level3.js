
function startLevel3(){
     endLevel2 = true;

}

function level3Debug(){
        timer=0;
        setTimeout(wrapLevel3Begin(),timer); 
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
         if(victoryText){
            victoryTextDestroy();
        }
        
        berzerkers.destroy();
        spTree.destroy();
        spTree2.destroy();
        spTree3.destroy();
        spTree4.destroy();
        village.destroy();
        villager1.destroy();
        rectangleEnding.destroy();  //Used in update funciton, check for exception when null
        
        if(gameOverText){
            gameOverText.destroy();
        }
       
        destroyMap();
        
        //Create
        sendWaveButton.visible = true;
        setLevel('Level 3', 'Mutiny');
        setWave('1 / 10');
        currentGold = 650;  //Init player with 650 gold to start game
        setGold(currentGold);
        
        //Groups
        berzerkers = game.add.group();
        game.physics.arcade.enable(enemies);
        
        //MAP
        createMap3();
        rectangleEnding = game.add.sprite(920, 2100, null);
        game.physics.arcade.enable(rectangleEnding);
        rectangleEnding.body.setSize(50, 50, 0, 0); // set the size of the rectangle
        sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(level3Wave1, this);
        
         //Outer Peremeter
        path1 = [{x:920,y:150},{x:1830,y:150},{x:1830,y:1650},{x:920,y:1650},{x:920,y:2100}];
        path2 = [{x:920,y:150},{x:90,y:150},{x:90,y:1650},{x:920,y:1650},{x:920,y:2100}];
        //Start Out, Go across Map in middle, Stay outside
        path3 = [{x:920,y:150},{x:90,y:150},{x:90,y:678},{x:1830,y:678},{x:1830,y:1650},{x:920,y:1650},{x:920,y:2100}];
        path4 = [{x:920,y:150},{x:1830,y:150},{x:1830,y:678},{x:90,y:678},{x:90,y:1650},{x:920,y:1650},{x:920,y:2100}];
        //Start Out, take first inside path
        path5 = [{x:920,y:150},{x:1830,y:150},{x:1830,y:678},{x:1565,y:678},{x:1565,y:1400},{x:920,y:1400},{x:920,y:2100}];
        path6 = [{x:920,y:150},{x:90,y:150},{x:90,y:678},{x:360,y:678},{x:360,y:1100},{x:920,y:1100},{x:920,y:2100}];
        //Start Out, go down middle vert, go down middle horiz
        path7 = [{x:920,y:150},{x:90,y:150},{x:90,y:678},{x:920,y:678},{x:920,y:2100}];
        path8 = [{x:920,y:150},{x:1830,y:150},{x:1830,y:678},{x:920,y:678},{x:920,y:2100}];
       
        //Start Mid, first inside path
        path9 = [{x:920,y:375},{x:360,y:375},{x:360,y:1100},{x:920,y:1100},{x:920,y:2100}];
        path10 = [{x:920,y:375},{x:1565,y:375},{x:1565,y:1400},{x:920,y:1400},{x:920,y:2100}];
        //Start Mid, Head Outside path
        path11 = [{x:920,y:375},{x:360,y:375},{x:360,y:678}, {x:90,y:678}, {x:90,y:1650},{x:920,y:1650},{x:920,y:2100}];
        path12 = [{x:920,y:375},{x:1565,y:375}, {x:1565,y:678}, {x:1830,y:678}, {x:1830,y:1650},{x:920,y:1650},{x:920,y:2100}];
        //Start Mid, head to Mid
        path13 = [{x:920,y:375},{x:360,y:375},{x:360,y:678},{x:920,y:678},{x:920,y:2100}];
        path14 = [{x:920,y:375},{x:1565,y:375},{x:1565,y:678},{x:920,y:678},{x:920,y:2100}];
        
        level3PathEasy = [path9,path10,path13,path14];
        level3PathMed = [path9,path10,path13,path14,path11,path12];
        level3PathHard = [path1,path2,path3,path4,path5,path6,path7,path8,path9,path10,path11,path12,path13,path14];

    }
}


//ENEMY LEVEL 2 WAVES
function level3Wave1() {
    sendWave(brethren,10,level3PathEasy,null,
    wrapSendWave(scourge,1,level3PathEasy,null,
    wrapSendWave(brethren,2,level3PathEasy,null,level3Wave3)));
    sendWaveButton.visible = false;
}
function level3Wave2(){
    setWave('2 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();

    sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,4,level3PathEasy,sendWaveButton,
        wrapSendWave(scourge,5,level3PathEasy,null,
        wrapSendWave(brethren,1,level3PathEasy,null,
        wrapSendWave(scourge,5,level3PathEasy,null,level3Wave3)))), this);
    
        
}
function level3Wave3(){
    setWave('3 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level3PathMed,sendWaveButton,
        wrapSendWave(scourge,5,level3PathMed,null,
        wrapSendWave(brethren,2,level3PathMed,null,
        wrapSendWave(squirrel,6,level3PathMed,null,level3Wave4)))), this);
}
function level3Wave4(){
    setWave('4 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,5,level3PathMed,sendWaveButton,
        wrapSendWave(royal,4,level3PathMed,null,
        wrapSendWave(brethren,2,level3PathMed,null,
        wrapSendWave(scourge,9,level3PathMed,null,level3Wave5)))), this);
}
function level3Wave5(){
    setWave('5 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(royal,5,level3PathMed,sendWaveButton,
        wrapSendWave(squirrel,2,level3PathMed,null,
        wrapSendWave(royal,8,level3PathMed,null,
        wrapSendWave(dragon,1,level3PathMed,null,level3Wave6)))), this);
}
function level3Wave6(){
    setWave('6 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level3PathMed,sendWaveButton,
        wrapSendWave(dragon,5,level3PathMed,null,
        wrapSendWave(brethren,1,level3PathMed,null,
        wrapSendWave(royal,6,level3PathMed,null,level3Wave7)))), this);
}
function level3Wave7(){
    setWave('7 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,5,level3PathHard,sendWaveButton,
        wrapSendWave(royal,15,level3PathHard,null,level3Wave8)), this);
}
function level3Wave8(){
    setWave('8 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,3,level3PathHard,sendWaveButton,
        wrapSendWave(admiral,2,level3PathHard,null,
        wrapSendWave(royal,10,level3PathHard,null,level3Wave9))), this);
}
function level3Wave9(){
    setWave('9 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,3,level3PathHard,sendWaveButton,
        wrapSendWave(scourge,1,level3PathHard,null,
        wrapSendWave(squirrel,2,level3PathHard,null,
        wrapSendWave(royal,2,level3PathHard,null,
        wrapSendWave(dragon,5,level3PathHard,null,
        wrapSendWave(admiral,8,level3PathHard,null,level3Wave10)))))), this);
}
function level3Wave10(){
    setWave('10 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,10,level3PathHard,sendWaveButton,
        wrapSendWave(admiral,15,level3PathHard,null,level3Over)), this);
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
    
    //Misc Sprites
    spTree = game.add.sprite(1140, 800, 'tree');
    spTree.scale.x = .5;
    spTree.scale.y = .6;
    spTree2 = game.add.sprite(340, 1150, 'tree');
    spTree2.scale.x = .5;
    spTree2.scale.y = .5;
    spTree3 = game.add.sprite(420, 1190, 'tree');
    spTree3.scale.x = .4;
    spTree3.scale.y = .4;
    spTree4 = game.add.sprite(420, 1250, 'tree');
    spTree4.scale.x = .3;
    spTree4.scale.y = .3;
    village = game.add.sprite(180, 1320,'village2');
    village.scale.x = .8;
    village.scale.y = .8;
    villager1 = game.add.sprite(1250, 1060, 'villager');
    villager1.scale.x = 1.6;
    villager1.scale.y = 1.6;
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