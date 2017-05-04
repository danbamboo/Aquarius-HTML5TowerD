//**************************
// Tower Related Functions
//**************************

//Crate a new tower object
function dragTower(tower){
    
    var newTower;
        
    if(tower.towerType == "brigBlaster")
    {
        newTower = new BrigBlasterTower(game);
    }
    else if(tower.towerType == "clipCatast")
    {
        newTower = new ClipCatastTower(game);
    }
    else if(tower.towerType == "fleetSinker")
    {
        newTower = new FleetSinkerTower(game);
    } 
} 


//Set tower in placed
function setTower(tower){
    
    game.physics.arcade.enable(tower);
    
    //to set the radius of each different type of tower for collision detection
    if(tower.towerType == "brigBlaster")
    {
        tower.body.setCircle(300, -300, -300);
    }
    else if(tower.towerType == "clipCatast")
    {
        tower.body.setCircle(250,-250,-250);
    }
    else if(tower.towerType == "fleetSinker")
    {
        tower.body.setCircle(150,-150,-150);
    }  

    berzerkers.add(tower);

    tower.input.disableDrag();
}


//Init tower's weapon to fire at enemy
function boundCheck(tower, enemy){
    
    //to follow first enemy within tower radius
    tower.rotation = game.physics.arcade.angleBetween(tower, enemy) - 80; 
    
   if(tower.towerType == "brigBlaster")
    {
        weaponBrigBlaster.trackSprite(tower, 0, 0);
        weaponBrigBlaster.fireAtSprite(enemy);
        weaponBrigBlaster.fire();
        
    }
    else if(tower.towerType == "clipCatast")
    {
        weaponClipCatast.trackSprite(tower, 0, 0);
        weaponClipCatast.fireAtSprite(enemy);
        weaponClipCatast.fire();
    }
    else if(tower.towerType == "fleetSinker")
    {
        weaponFleetSinker.trackSprite(tower, 0, 0);
        weaponFleetSinker.fireAtSprite(enemy);
        weaponFleetSinker.fire();
    }  
}