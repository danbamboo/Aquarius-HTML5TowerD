//**************************
// Tower Related Functions
//**************************

//Crate a new tower object
function dragTower(tower){
    
    var newTower;
    tower.scale.x=1;
    tower.scale.y=1;
    
    removeStats(tower);
    tower.inMenu=false;
    
    
    if(currentGold >= tower.cost)
    {
        currentGold -= tower.cost;
        setGold(currentGold);
        tower.hasBeenMoved =true;
    }
     else{
        tower.kill();
    }
     
    
    if(tower.towerType == "brigBlaster")
    {
        newTower = new BrigBlasterTower(game);
        newTower.events.onDragStart.add(function(){dragTower(newTower)}, this);

    }
    else if(tower.towerType == "clipCatast")
    {
        newTower = new ClipCatastTower(game);
        newTower.events.onDragStart.add(function(){dragTower(newTower)}, this);
    }
    else if(tower.towerType == "fleetSinker")
    {
        newTower = new FleetSinkerTower(game);
        newTower.events.onDragStart.add(function(){dragTower(newTower)}, this);
    }
    
    towerRange.add(newTower);
    
}
   


//Set tower in placed
function setTower(tower)
{
    if(tower.set ==0)
    {
        console.log("****SETTTTTTTTIIIINNGGGG*********");
        
        var setTile = map.getTileWorldXY(tower.x, tower.y, 32, 29, collisionLayer);
        var indexTile = map.getTileWorldXY(tower.x, tower.y, 32, 29, layer1);
        
        console.log(indexTile);
        
        if(setTile == null)   //Check for tower/water overlap
        {
        
            if(!tower.placedOnWater && tower.hasBeenMoved)
            {
                currentGold += tower.cost;
                setGold(currentGold);
                tower.placedOnWater = true;
            }
             //console.log("OVER WATER??");
            towerRange.remove(tower);
            tower.kill();
            return;
        }
        else  //Init tower/tower overlap check
        {
            var xPos = indexTile.x;
            var yPos = indexTile.y;
            
            if(xPos < 30 && yPos < 30){
            
                checkTowerCoord(xPos, yPos, towerCoordQ1, tower);
            }
            else if(xPos >= 30 && yPos < 30){
                
                 checkTowerCoord(xPos, yPos, towerCoordQ2, tower);
            }
            else if(xPos < 30 && yPos >=30){
                
                 checkTowerCoord(xPos, yPos, towerCoordQ3, tower);
            }
            else if(xPos >= 30 && yPos >= 30){
                
                 checkTowerCoord(xPos, yPos, towerCoordQ4, tower);
            }
        }

        game.physics.arcade.enable(tower);
        
        console.log("BERZ LENGTH: " + berzerkers.length);
        
        
        //to set the radius of each different type of tower for collision detection
        if(tower.towerType == "brigBlaster")
        {
            tower.body.setCircle(550, -550, -550);
            
        }
        else if(tower.towerType == "clipCatast")
        {
            tower.body.setCircle(400,-400,-400);
        }
        else if(tower.towerType == "fleetSinker")
        {
            tower.body.setCircle(250,-250,-250);
        }  
        
        
        console.log("Berz " + berzerkers.length + " towerR " + towerRange.length);
        //console.log("TOWERR " + towerRange.children[0].towerType);
            
        tower.input.disableDrag();
        tower.children[1].visible = false;
        berzerkers.add(tower);
        //to mark tower as set
        tower.set = 1;
    }
}


//Add tower coordinates to appropriate array
function addCoord(xPos, yPos, array){
    
    array.push({x: xPos, y: yPos});
}

//Check for tower/tower overlap
function checkTowerCoord(newX, newY, array, tower){

    console.log("Array Length: " + array.length);

    if(array.length == 0)
    {
        addCoord(newX, newY, array);
        console.log("store coords");
        console.log("Array Length: " + array.length);
    }
    else
    {
        for(var i=0; i < array.length; i++)
        {
            //console.log("i: " + i);
            
            var xOverlap = false;
            var yOverlap = false;
            var overlap = false;
            
            var oldX = array[i].x;
            var oldY = array[i].y;
            
            var maxX = Math.max(oldX, newX);
            var minX = Math.min(oldX, newX);
            var maxY = Math.max(oldY, newY);
            var minY = Math.min(oldY, newY);
            
            var resultX = maxX - minX; 
            var resultY = maxY - minY;
            
            //Check for x-overlap
            if(resultX < 3)
            {
                xOverlap = true;
            }
            
            //Check for y-overlap
            if(resultY < 3)
            {
                yOverlap = true;
            }
            
            //console.log("xOverlap: " + xOverlap);
            //console.log("yOverlap: " + yOverlap);

            if((xOverlap == true) && (yOverlap == true))
            {
                overlap = true;
                break;
            }
        }
        
        if(overlap == false)
        {
            addCoord(newX, newY, array);
            console.log("store coords");
            console.log("NO OVERLAP");
            console.log("Array Length: " + array.length);
        }
        else
        {
            if(!tower.placedOnWater && tower.hasBeenMoved)
            {
                currentGold += tower.cost;
                setGold(currentGold);
                tower.placedOnWater = true;
            }
            
            console.log("TOWER OVERLAP??");
            towerRange.remove(tower);
            tower.kill();
            return;
        }
    }
}


//Init tower's weapon to fire at enemy
function boundCheck(tower, enemy){
    
    //to follow first enemy within tower radius
    //tower.rotation = game.physics.arcade.angleBetween(tower.weapon, enemy) - 80; 
    tower.weapon.trackSprite(tower, 0, 0, true);
    while(tower.weapon.fireAtSprite(enemy)){
        if(tower.towerType == 'brigBlaster'){
            brigSound.play();
        }
        if(tower.towerType == 'clipCatast'){
            clipSound.play();
        }
        if(tower.towerType == 'fleetSinker'){
            fleetSound.play();
        }
        tower.rotation = game.physics.arcade.angleBetween(tower, enemy) -80;
    }
}


function getStats(tower){
    tower.statsMenu = game.add.sprite(tower.x,tower.y-100,'scroll');
    tower.statsMenu.anchor.setTo(.5,.5);
    tower.statsMenu.scale.x = .15;
    tower.statsMenu.scale.y = .15;
    tower.pointerOn = true;
    
    tower.nameMenuText = game.add.text(tower.x,tower.y-130, tower.towerName, { font: "15px Arial", fill: "#641E16" });
    tower.nameMenuText.anchor.setTo(.5,.5);
    
    tower.damageMenuText = game.add.text(tower.x-18,tower.y-105, 'Damage:  ' + tower.weapon.damage, { font: "16px Arial", fill: "#212F3C" });
    tower.damageMenuText.anchor.setTo(.5,.5);
    
    tower.fireRateText = game.add.text(tower.x-8,tower.y-85, 'Fire Rate: ' + tower.weapon.fireRate, { font: "16px Arial", fill: "#212F3C" });
    tower.fireRateText.anchor.setTo(.5,.5);
    
    tower.rangeText = game.add.text(tower.x-18,tower.y-65, 'Range:  ' + tower.weapon.bulletKillDistance, { font: "16px Arial", fill: "#212F3C" });
    tower.rangeText.anchor.setTo(.5,.5);
    
    
}

function removeStats(tower){
    tower.pointerOn = false;
    if(tower.statsMenu){
        tower.statsMenu.kill();
        tower.nameMenuText.kill();
        tower.damageMenuText.kill();
        tower.fireRateText.kill();
        tower.rangeText.kill();
    }
}

function towerCollision(towerGroup, tower){
     
     var collisionYN = 0
     towerGroup.forEach(function(setTower){
        
        //console.log("CHECKING DISTANCE");
        //console.log("X " + tower.x);
        //console.log("DISTANCE IS: " + setTower.radius);
        var tester = game.physics.arcade.distanceBetween(tower, setTower);
        //console.log("TESTER " + tester);
        
        if(game.physics.arcade.distanceBetween(tower, setTower) < tower.radius){
            //console.log("TOWER OVERLAP");
            if(tower.set == 0){
                tower.children[1].visible = true;
                collisionYN = 1;
            }
            
        }
        else{
            tower.children[1].visible = false;
        }

    });
    
        return collisionYN;
}
