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
    
    tower.input.disableDrag();
    tower.rotation = game.physics.arcade.angleBetween(tower, enemies); 
}


//Init tower's weapon to fire at enemy
function boundCheck(tower, enemy){
    
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
