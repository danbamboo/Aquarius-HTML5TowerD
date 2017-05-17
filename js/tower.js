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
function setTower(tower){
    if(tower.set ==0){
    console.log("****SETTTTTTTTIIIINNGGGG*********");
    
    var setTile = map.getTileWorldXY(tower.x, tower.y, 32, 32, collisionLayer);
    
    //Check if tower is placed in the water
    if(setTile == null){
    
        if(!tower.placedOnWater && tower.hasBeenMoved){
            currentGold += tower.cost;
            setGold(currentGold);
            tower.placedOnWater = true;
        }
         //console.log("OVER WATER??");
        towerRange.remove(tower);
        tower.kill();
      
        return;
    }
    else
    {    
        if(setTile.x >= 3 && setTile.y >= 50)
        {
            if(!tower.placedOnWater  && tower.hasBeenMoved){
                currentGold += tower.cost;
                setGold(currentGold);
                tower.placedOnWater = true;
            }
            //console.log("OVER WATER??");
            towerRange.remove(tower);
            tower.kill();
            return;
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


//Init tower's weapon to fire at enemy
function boundCheck(tower, enemy){
    
    //to follow first enemy within tower radius
    tower.rotation = game.physics.arcade.angleBetween(tower, enemy) - 80; 
    tower.weapon.trackSprite(tower, 0, 0);
    tower.weapon.fireAtSprite(enemy);
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
