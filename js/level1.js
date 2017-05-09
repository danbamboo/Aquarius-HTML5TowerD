//================================
//ENEMY LEVEL 1 WAVES
function wave1() {
    sendWave(brethren,10,level1Path,null,
    wrapSendWave(scourge,1,level1Path,null,
    wrapSendWave(brethren,2,level1Path,null,wave2)));
    sendWaveButton.visible = false;
}
function wave2(){
    setWave('2 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
    // sendWaveButton.events.onInputDown.add(wrapSendWave(admiral,1,level1Path,sendWaveButton), this);
    sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,4,level1Path,sendWaveButton,
        wrapSendWave(scourge,5,level1Path,null,
        wrapSendWave(brethren,1,level1Path,null,
        wrapSendWave(scourge,5,level1Path,null,wave3)))), this);
}
function wave3(){
    setWave('3 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level1Path,sendWaveButton,
        wrapSendWave(scourge,5,level1Path,null,
        wrapSendWave(brethren,2,level1Path,null,
        wrapSendWave(squirrel,6,level1Path,null,wave4)))), this);
}
function wave4(){
    setWave('4 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,5,level1Path,sendWaveButton,
        wrapSendWave(royal,4,level1Path,null,
        wrapSendWave(brethren,2,level1Path,null,
        wrapSendWave(scourge,9,level1Path,null,wave5)))), this);
}
function wave5(){
    setWave('5 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(royal,5,level1Path,sendWaveButton,
        wrapSendWave(squirrel,2,level1Path,null,
        wrapSendWave(royal,8,level1Path,null,
        wrapSendWave(dragon,1,level1Path,null,wave6)))), this);
}
function wave6(){
    setWave('6 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,2,level1Path,sendWaveButton,
        wrapSendWave(dragon,5,level1Path,null,
        wrapSendWave(brethren,1,level1Path,null,
        wrapSendWave(royal,6,level1Path,null,wave7)))), this);
}
function wave7(){
    setWave('7 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,5,level1Path,sendWaveButton,
        wrapSendWave(royal,15,level1Path,null,wave8)), this);
}
function wave8(){
    setWave('8 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(squirrel,3,level1Path,sendWaveButton,
        wrapSendWave(admiral,2,level1Path,null,
        wrapSendWave(royal,10,level1Path,null,wave9))), this);
}
function wave9(){
    setWave('9 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(brethren,3,level1Path,sendWaveButton,
        wrapSendWave(scourge,1,level1Path,null,
        wrapSendWave(squirrel,2,level1Path,null,
        wrapSendWave(royal,2,level1Path,null,
        wrapSendWave(dragon,5,level1Path,null,
        wrapSendWave(admiral,8,level1Path,null,wave10)))))), this);
}
function wave10(){
    setWave('10 / 10');
    sendWaveButton.visible = true;
    sendWaveButton.events.onInputDown.removeAll();
        sendWaveButton.events.onInputDown.add(
        wrapSendWave(dragon,10,level1Path,sendWaveButton,
        wrapSendWave(admiral,15,level1Path,null)), this);
        
    //Next Level TEXT
    setLevel('Level 2', 'Cutthroat');
}
//ENEMY LEVEL 1 WAVES
//============================