//================================
//ENEMY LEVEL 1 WAVES
function level1Wave1() {
    sendWave(brethren,10,level1Path,null,
    wrapSendWave(scourge,1,level1Path,null,
    wrapSendWave(brethren,2,level1Path,null,level1Wave2)));
    sendWaveButton.visible = false;
}
function level1Wave2(){
    setWave('2 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();

    sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,4,level1Path,sendWaveButton,
        wrapSendWave(scourge,5,level1Path,null,
        wrapSendWave(brethren,1,level1Path,null,
        wrapSendWave(scourge,5,level1Path,null,level1Wave3)))), this);
    
        
}
function level1Wave3(){
    setWave('3 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level1Path,sendWaveButton,
        wrapSendWave(scourge,5,level1Path,null,
        wrapSendWave(brethren,2,level1Path,null,
        wrapSendWave(squirrel,6,level1Path,null,level1Wave4)))), this);
}
function level1Wave4(){
    setWave('4 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,5,level1Path,sendWaveButton,
        wrapSendWave(royal,4,level1Path,null,
        wrapSendWave(brethren,2,level1Path,null,
        wrapSendWave(scourge,9,level1Path,null,level1Wave5)))), this);
}
function level1Wave5(){
    setWave('5 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(royal,5,level1Path,sendWaveButton,
        wrapSendWave(squirrel,2,level1Path,null,
        wrapSendWave(royal,8,level1Path,null,
        wrapSendWave(dragon,1,level1Path,null,level1Wave6)))), this);
}
function level1Wave6(){
    setWave('6 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level1Path,sendWaveButton,
        wrapSendWave(dragon,5,level1Path,null,
        wrapSendWave(brethren,1,level1Path,null,
        wrapSendWave(royal,6,level1Path,null,level1Wave7)))), this);
}
function level1Wave7(){
    setWave('7 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,5,level1Path,sendWaveButton,
        wrapSendWave(royal,15,level1Path,null,level1Wave8)), this);
}
function level1Wave8(){
    setWave('8 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,3,level1Path,sendWaveButton,
        wrapSendWave(admiral,2,level1Path,null,
        wrapSendWave(royal,10,level1Path,null,level1Wave9))), this);
}
function level1Wave9(){
    setWave('9 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,3,level1Path,sendWaveButton,
        wrapSendWave(scourge,1,level1Path,null,
        wrapSendWave(squirrel,2,level1Path,null,
        wrapSendWave(royal,2,level1Path,null,
        wrapSendWave(dragon,5,level1Path,null,
        wrapSendWave(admiral,8,level1Path,null,level1Wave10)))))), this);
}
function level1Wave10(){
    setWave('10 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,10,level1Path,sendWaveButton,
        wrapSendWave(admiral,15,level1Path,null,startLevel2)), this);
    
}
//ENEMY LEVEL 1 WAVES
//============================

function createMap1(){
     //to load the map into the map
    map = game.add.tilemap('pirateMapOcean');
    //add the tileset from the json file
    map.addTilesetImage('tiles_sheet', 'tiles');
   
    layer1 = map.createLayer('Ground');
    layer1.scale.y = .93;
    collisionLayer = map.createLayer('Background');
    collisionLayer.scale.y = .93;
    layer2 = map.createLayer('Foreground');
    layer2.scale.y = .93;
    layer3 = map.createLayer('TowerCollision');
    layer3.scale.y = .93;
    
    //Game Board Alignment
    layer1.resizeWorld();
    layer2.resizeWorld();
    layer3.resizeWorld();
    collisionLayer.resizeWorld();
    
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true; 
    game.scale.refresh();
    
    
    //Misc Sprites
    spTree = game.add.sprite(1400, 1000, 'tree');
    spTree.scale.x = .6;
    spTree.scale.y = .6;
    spTree2 = game.add.sprite(450, 940, 'tree');
    spTree2.scale.x = .5;
    spTree2.scale.y = .5;
    spTree3 = game.add.sprite(550, 980, 'tree');
    spTree3.scale.x = .4;
    spTree3.scale.y = .4;
    spTree4 = game.add.sprite(540, 1040, 'tree');
    spTree4.scale.x = .3;
    spTree4.scale.y = .3;
    village = game.add.sprite(625,1030,'village');
    village.scale.x = .8;
    village.scale.y = .8;
    villager1 = game.add.sprite(900, 1026, 'villager');
    villager1.scale.x = 1.6;
    villager1.scale.y = 1.6;
}

function destroyMap(){
    map.destroy();
    collisionLayer.destroy();
    layer1.destroy();
    layer2.destroy();
    layer3.destroy();
}