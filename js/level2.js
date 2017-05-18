//Level 2 Global Variables



function startLevel2(){
    
    
    //Next Level TEXT
    
    
     setTimeout(wrapLevel2Begin(),17000);
}

// function loadNextLevel(){
//     console.log("level2begin");
// }

function wrapLevel2Begin(){
    return function(){
        if(currentGold > 0){
            victoryTextCreate();
            setTimeout(loadLevel2(),5000)
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
        map.destroy();
        spTree.destroy();
        village.destroy();
        villager1.destroy();
        rectangleEnding.destroy();  //Used in update funciton, check for exception when null
        
        //Create
        sendWaveButton.visible = true;
        setLevel('Level 2', 'Cutthroat');
        setWave('1 / 10');
        currentGold = 250;  //Init player with 250 gold to start game
        setGold(currentGold);
        
        //MAP
        map = game.add.tilemap('pirateMapLevel2');
        map.addTilesetImage('tiles_sheet', 'tiles');
        map.addTilesetImage('towerDefense_tilesheet', 'tiles2');
        layer = map.createLayer('Water');
        layer.scale.y = .93;
        collisionLayer = map.createLayer('Background');
        collisionLayer.scale.y = .93;
        //layer = map.createLayer('Background');
        //layer.scale.y = .95;
        layer = map.createLayer('Ground');
        layer.scale.y = .93;
    
    
    //Game Board Alignment
    layer.resizeWorld();
    collisionLayer.resizeWorld();
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true; 
    game.scale.refresh();
        
        
        rectangleEnding = game.add.sprite(2100, 1715, null);
        
        sendWaveButton.events.onInputDown.add(level1Wave1, this);
    }
}

