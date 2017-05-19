
function startLevel2(){
    var timer=17000;
    if(DEBUG){
        timer=0;
        skipLevel2.destroy();
    }
     setTimeout(wrapLevel2Begin(),timer);  //17000
}

function wrapLevel2Begin(){
    return function(){
        var timer=5000;
        if(DEBUG)
        {
            timer=0;
        }
        if(currentGold > 0){
            victoryTextCreate();
            setTimeout(loadLevel2(),timer)  //5000
        }
        else{
            gameOver();
        }
}}

function loadLevel2(){
    return function(){
        //Destroy
        victoryTextDestroy();
        enemies.callAll('kill');
        berzerkers.callAll('kill');
        spTree.destroy();
        village.destroy();
        villager1.destroy();
        rectangleEnding.destroy();  //Used in update funciton, check for exception when null
       
        destroyMap1();
        
        //Create
        sendWaveButton.visible = true;
        setLevel('Level 2', 'Cutthroat');
        setWave('1 / 10');
        currentGold = 250;  //Init player with 250 gold to start game
        setGold(currentGold);
        
        //MAP
        createMap2();
        rectangleEnding = game.add.sprite(2100, 1715, null);
        sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(level1Wave1, this);
    }
}

function createMap2(){
     //to load the map into the map
    map2 = game.add.tilemap('pirateMapLevel2');
    //add the tileset from the json file
    map2.addTilesetImage('tiles_sheet', 'tiles');
    map2.addTilesetImage('towerDefense_tilesheet', 'tiles2');

    layer1 = map2.createLayer('Water');
    layer1.scale.y=.93;
    collisionLayer = map2.createLayer('Background');
    collisionLayer.scale.y = .93;
    layer2 = map2.createLayer('Ground');
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

function destroyMap2(){
    map2.destroy();
    collisionLayer.destroy();
    layer1.destroy();
    layer2.destroy();
}