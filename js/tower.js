//**************************
// Tower Related Functions
//**************************

//Crate a new tower object
function dragTower(tower){
    
    var newTower;
    tower.scale.x=1;
    tower.scale.y=1;
        
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
    console.log("****SETTTTTTTTIIIINNGGGG*********");
    
    var setTile = map.getTileWorldXY(tower.x, tower.y, 32, 32, collisionLayer);
    
    //Check if tower is placed in the water
    if(setTile == null){
    
        //console.log("OVER WATER??");
        towerRange.remove(tower);
        tower.kill();
        return;
    }
    else
    {    
        if(setTile.x >= 3 && setTile.y >= 50)
        {
            //console.log("OVER WATER??");
            towerRange.remove(tower);
            tower.kill();
            return;
        }
    }
  
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
    
    
    console.log("Berz " + berzerkers.length + " towerR " + towerRange.length);
    //console.log("TOWERR " + towerRange.children[0].towerType);
    
    tower.input.disableDrag();
    tower.children[1].visible = false;
    berzerkers.add(tower);

    
}


//Init tower's weapon to fire at enemy
function boundCheck(tower, enemy){
    
    //to follow first enemy within tower radius
    tower.rotation = game.physics.arcade.angleBetween(tower, enemy) - 80; 
    tower.weapon.trackSprite(tower, 0, 0);
    tower.weapon.fireAtSprite(enemy);
}

function towerCollide(tower, colTower){
    
    console.log("BOUNDS 1 " + tower.children[0].getBounds());
    console.log("BOUNDS 2 " + colTower.children[0].getBounds());
        tower.children[1].visible = true;
        tower.input.enableDrag();
    
}