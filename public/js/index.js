import {actExpSmryBtn, endSession, startSession, joinQuiz, changeDisplay} from "/js/expNav.js";
import {PlayerDisplay, GameState} from "/js/gameUtils.js"
import {phaserConfig, getMapData, getGameData, socketURL, getRandomConfig} from "/js/config.js"


var roomIdx = "na";
var playerId = "na";
var leaderId = "1";
var socketId = "na";
var gameTimer = new Timer();
var sessionId = 1;
var sessionLimit = 1;
var victimCount;
var feedback_str = "No Feedback Given";
var replay_moves = new Array();
const socket = io(socketURL, {transports: ['websocket']})
var gamePlayState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(){
        console.log("GamePlay init");
        Phaser.Scene.call(this, {key: 'GamePlay'});
        socket.on('player_move_success', (message)=>{this._playersMovementDisplay(message)});
        socket.on('victim_save_success', (message)=>{this._victimSave(message)});

        gameTimer.addEventListener('targetAchieved', ()=>{
            this.input.keyboard.removeAllKeys()
            sessionId = endSession(game, socket, gameTimer, playerId, roomIdx, sessionId, turk.emit(), socketId, "go_time", sessionLimit, "Game Time Over")
        });

        gameTimer.addEventListener('secondTenthsUpdated', function() {
            $('#timerTime').text(" "+ gameTimer.getTimeValues().toString());
        });

        // gameTimer.addEventListener('started', function () {
        //         $('#timerTime').text(" 00:"+String(this.gameConfig[gameTime])+":00");
        // });

    },

    preload: function() {
        console.log("GamePlay preload");
        this.mapConfig = getMapData();
        this.gameConfig = getGameData();
        var initializedGameData = {"event":"game_created", "map_config": this.mapConfig, "game_config":this.gameConfig, 
            globalVariable:{"rm_id":roomIdx, "p_id":playerId, "aws_id": turk.emit(),"socket_id": socketId, "session_id":sessionId, "session_limit":sessionLimit}}
        socket.emit("game_config", initializedGameData);

        if (this.gameConfig["leaderName"]!=null){
            this.load.spritesheet(this.gameConfig["leaderName"], "/assets/"+this.gameConfig["leaderName"]+".png",
            {frameWidth: this.gameConfig["playerFrameWidth"], frameHeight: this.gameConfig["playerFrameHeight"]});
        }

        this.load.spritesheet(this.gameConfig["playerName"], "/assets/"+this.gameConfig["playerName"]+".png",
        {frameWidth: this.gameConfig["playerFrameWidth"], frameHeight: this.gameConfig["playerFrameHeight"]});
    },

    create: async function() {
        replay_moves = await this._parseCSV();
        let randomSelectionValues = getRandomConfig();
            if (randomSelectionValues!=null){
                this._updateGameConfig(randomSelectionValues)
            }
        victimCount = this.mapConfig["victimIndexes"].length;

        console.log("GamePlay create");
        this.gameState = new GameState(this.mapConfig, this)
        
        /*
        console.log("Replay length", replay_moves.length)
        for(let i = 0; i < replay_moves.length; i++) {
            for(let j = 0; j < replay_moves[i].length; j++) {
                console.log(replay_moves[i][j]);
            }
        }*/

        this.playerList = Array();
        this.playersCurrentLoc = Array();
        //this.playerDude = new PlayerDisplay(this, {"x": this.gameConfig.playerX, "y":this.gameConfig.playerY, "name":this.gameConfig["playerName"]});
        //this.playersCurrentLoc.push((this.playerDude.y*this.mapConfig.cols)+ this.playerDude.x);
        this.playerList.push(null);

        gameTimer.start(this.gameConfig["gameTimeArg"])

        if (this.gameConfig["leaderX"]!=null){
            this.leaderDude = new PlayerDisplay(this, {"x": this.gameConfig.leaderX, "y":this.gameConfig.leaderY, "name":this.gameConfig["leaderName"]});
            this.playersCurrentLoc.push((this.leaderDude.y*this.mapConfig.cols)+ this.leaderDude.x);
            this.playerList.push(this.leaderDude);
            this.leaderTimer = this.time.addEvent({
                delay: this.gameConfig["leaderDelay"],
                callback: this._leaderAnimation,
                args: [],
                callbackScope: this,
                repeat: replay_moves.length - 1
            });
        }

        this.cameras.main.setBounds(0, 0, 775, 625).setName('main');
        this.cameras.main.setZoom(4);
        this.cameras.main.startFollow(this.leaderDude.physicsObj);
        this.cameras.main.setLerp(0.2);

        var keys = this.input.keyboard.addKeys('UP, DOWN, RIGHT, LEFT, R')
        this.input.keyboard.preventDefault = false
        keys.UP.on('down', ()=>{this._playerMove(this.playerList[playerId].x, this.playerList[playerId].y - 1, "up")});
        keys.DOWN.on('down', ()=>{this._playerMove(this.playerList[playerId].x, this.playerList[playerId].y + 1, "down")});
        keys.RIGHT.on('down', ()=>{this._playerMove(this.playerList[playerId].x + 1, this.playerList[playerId].y, "right")});
        keys.LEFT.on('down', ()=>{this._playerMove(this.playerList[playerId].x - 1, this.playerList[playerId].y, "left")});
        keys.R.on('down', ()=>{this._victimSave()});
    },


    _playersMovementDisplay (message){
        console.log("playerMovementDisplay, id: " + message["p_id"]);
        console.log(message["x"], message["y"], message["p_id"])
        let newIdx = ((parseInt(message["y"]))*this.mapConfig.cols)+ parseInt(message["x"])
        if (message["p_id"] == leaderId){
            console.log("leaderId matches p_id");
            console.log("x: " + message["x"] + " y: " + message["y"] + " cols: " + this.mapConfig.cols);
            console.log("newIdx: " + newIdx);
            this.gameConfig.roundCount = message["r"];
            if (this.mapConfig.doorIndexes.includes(newIdx)){
                console.log("found door");
                this.gameState.makeVictimsVisible(this.gameState.roomVictimObj[String(newIdx)]);
                this.gameState.makeRoomVisible(this.gameState.roomViewObj[String(newIdx)]);
            }else if (this.mapConfig.gapIndexes.includes(newIdx)){
                for (let roomIndex in this.mapConfig.roomGapMapping){
                    if(this.mapConfig.roomGapMapping[roomIndex].includes(newIdx)){
                        console.log("Entered room " + roomIndex 
                        + " through gap");
                        this.gameState.makeVictimsVisible(this.gameState.roomVictimObj[roomIndex]);
                        this.gameState.makeRoomVisible(this.gameState.roomViewObj[roomIndex]);
                    }
                }
            }
        }
        this.playersCurrentLoc[message["p_id"]] = newIdx
        this.playerList[message["p_id"]].move(message["x"], message["y"], message["event"])

        message["display_p_id"] = playerId;
        message["time"] = new Date().toISOString();
        message["socket_id"] = socketId;
        socket.emit("player_move_displayed", message);
        if (this.gameConfig.roundLimit - this.gameConfig.roundCount <= 0){
            this.input.keyboard.removeAllKeys()
            sessionId = endSession(game, socket, gameTimer, playerId, roomIdx, sessionId, turk.emit(),  socketId, "go_round", sessionLimit, "All Rounds Used")
        }
    },

    _leaderAnimation: function(){
        let currentLeaderloc = replay_moves.length - (this.leaderTimer.getRepeatCount())
        if (replay_moves[currentLeaderloc][2] == "rs"){
            console.log("entered if rs")
            socket.emit("rescue_success", {'x': replay_moves[currentLeaderloc][0], 'y': replay_moves[currentLeaderloc][1],
            "s_id":sessionId, "socket_id":socketId, "event":replay_moves[currentLeaderloc][2], "aws_id": turk.emit(),'rm_id':roomIdx,
            'p_id': 1, "input_time":new Date().toISOString() 
            })
        }else{
            socket.emit("player_move", {'x': replay_moves[currentLeaderloc][0], 'y': replay_moves[currentLeaderloc][1],
            "s_id":sessionId, "socket_id":socketId, "event":replay_moves[currentLeaderloc][2], "aws_id": turk.emit(),'rm_id':roomIdx,
            'p_id': 1, "input_time":new Date().toISOString()
            })
        }
        if (this.leaderTimer.getRepeatCount()===0){
            console.log(this.playersCurrentLoc);
        }
    },

    _leaderInRoom: function(x, y){
        let newIdx = (y*this.mapConfig.cols)+ x;
        if (this.mapConfig.doorIndexes.includes(newIdx)){
            this.gameState.makeVictimsVisible(this.gameState.roomVictimObj[String(newIdx)]);
            this.gameState.makeRoomVisible(this.gameState.roomViewObj[String(newIdx)]);
        }else if (this.mapConfig.gapIndexes.includes(newIdx)){
            for (let roomIndex in this.mapConfig.roomGapMapping){
                if(this.mapConfig.roomGapMapping[roomIndex].includes(newIdx)){
                    console.log("Entered room " + roomIndex 
                    + " through gap");
                    this.gameState.makeVictimsVisible(this.gameState.roomVictimObj[roomIndex]);
                    this.gameState.makeRoomVisible(this.gameState.roomViewObj[roomIndex]);
                }
            }
        }
    },

    _victimSave(){
        console.log("reached victim save function")
        console.log("x coord: " + this.playerList[leaderId].x + " y coord: " + this.playerList[leaderId].y);
        let rescueIndexes = this.gameState.getVictimRescueIndexes(this.playerList[leaderId].y, this.playerList[leaderId].x);
        /*socket.emit("rescue_attempt", {'x': this.playerList[leaderId].x, 'y': this.playerList[leaderId].y,"event":"r", "aws_id": turk.emit(), 'rm_id':roomIdx,
        'p_id': leaderId, "socket_id":socketId, "victims_alive": Array.from(this.gameState.set_victims), "time":new Date().toISOString()})*/
        console.log("Set victims: " + this.gameState.set_victims);
        console.log("Rescue index: " + rescueIndexes);
        for(const victimIndex of this.gameState.set_victims){
            console.log("victim index: " + victimIndex);
            if (rescueIndexes.includes(parseInt(victimIndex))){
                console.log("victim in rescue indexes");
                if (this.gameState.set_victims.has(victimIndex)){
                    /*socket.emit("rescue_success", {'x': this.playerList[leaderId].x, 'y': this.playerList[leaderId].y,
                    "event":"rs", "aws_id": turk.emit(), 'rm_id':roomIdx, "socket_id":socketId, 'p_id': leaderId, "victims_alive": Array.from(this.gameState.set_victims),
                    "victim":victimIndex, "time":new Date().toISOString()})*/
                    console.log("change victim color");
                    this.gameState.victimObj[String(victimIndex)].fillColor = "0xf6fa78";
                    this.gameState.set_victims.delete(victimIndex);
                    victimCount = this.gameState.set_victims.size
                    if (this.gameState.set_victims.size === 0){
                        console.log("SUCCESS")
                        this.input.keyboard.removeAllKeys()
                        sessionId = endSession(game, socket, gameTimer, leaderId, roomIdx, sessionId, turk.emit(), socketId, "go_victim", sessionLimit, "Victim Saved")
                    }
                }
            }
        }
    },

    _playerMove: function(x, y, direction){
        console.log(x,y, direction);
        let newIdx = (y*this.mapConfig.cols)+ x;
        if (!(this.gameState.noRoadIndex.has(newIdx)) && !(this.playersCurrentLoc.includes(newIdx)) && (this.gameConfig.roundLimit - this.gameConfig.roundCount >0)){
            socket.emit("player_move", {'x': x, 'y': y, "s_id":sessionId, "socket_id":socketId,
                "event":direction, "aws_id": turk.emit(), 'rm_id':roomIdx, 'p_id': playerId, "input_time":new Date().toISOString(),
                "r": this.gameConfig.roundCount + 1
            });
        }
    },
    _updateGameConfig: function(randomSelectionValues){
        this.mapConfig["victimIndexes"] = randomSelectionValues[0]
        this.mapConfig["roomVictimMapping"] = randomSelectionValues[1]
    },

    _parseCSV: async function(){
        var replay_data = new Array()
        const data = await fetch('assets/game4updated.csv').then(response => response.text())
        var counter = 0
        Papa.parse(data, {
            header: true,
            complete: function(results){
                results.data.map((data, index) =>{
                    var coords = new Array();
                    if (counter == 0){
                        var victim_loc = new Array();
                        victim_loc = (data.random_victims_locations.substring(1, data.random_victims_locations.length-1)).split(", ");
                        replay_data.push(victim_loc);
                        counter = counter + 1;
                    }
                    coords.push(data.x);
                    coords.push(data.z);
                    coords.push(data.event);
                    replay_data.push(coords);
                });
            }
        });
        console.log("Replay length", replay_data.length)
        return replay_data

    }
});

console.log("Game Object");
const game = new Phaser.Game(phaserConfig); //Instantiate the game
game.scene.add("Gameplay", gamePlayState);


var gameInfoState = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function(){
        Phaser.Scene.call(this, {key: 'GameInfo'});
    },

    preload: function() {
        this.load.image("legend", "/assets/legend.png");
        /*this.load.image("blankTopLeft", "assets/blankTopLeft.png");
        this.load.image("blankTopRight", "assets/blankTopRight.png");
        this.load.image("blankBottomLeft", "assets/blankBottomLeft.png");
        this.load.image("blankBottomRight", "assets/blankBottomRight.png");
        this.load.image("rubbleTopLeft", "assets/rubbleTopLeft.png");
        this.load.image("rubbleTopRight", "assets/rubbleTopRight.png");
        this.load.image("rubbleBottomLeft", "assets/rubbleBottomLeft.png");
        this.load.image("rubbleBottomRight", "assets/rubbleBottomRight.png");*/

    },
    create: function() {

        //this._randomMap();
        this.legend = this.add.sprite(300, 350, "legend")
        this.legend.setScale(0.7)
        this.victimCountText = this.add.text(170, 220, "Victims: 24", {color: '0x9754e3', fontSize: '25px'}).setResolution(10);
    },


    update: function() {
        this.victimCountText.setText("Victims: " + victimCount);
    },

    /*_randomMap: function(){
        //no knowledge condition
        this.topLeft = this.add.sprite(123.5, 100, "blankTopLeft")
        this.topRight = this.add.sprite(300, 100, "blankTopRight")
        this.bottomRight = this.add.sprite(300, 303, "blankBottomRight")
        this.bottomLeft = this.add.sprite(123.5, 303, "blankBottomLeft")

        this.topLeft.setScale(0.3)
        this.topRight.setScale(0.3)
        this.bottomRight.setScale(0.3)
        this.bottomLeft.setScale(0.3)

        this.tl = "No knowledge";
        this.tr = "No knowledge";
        this.bl = "No knowledge";
        this.br = "No knowledge";

        if(Math.random() < .3){ // first randomization
            if (Math.random() < .5){ // post accident//
                this.topLeft = this.add.sprite(123.5, 100, "rubbleTopLeft")
                this.topRight = this.add.sprite(300, 100, "rubbleTopRight")
                this.bottomRight = this.add.sprite(300, 303, "rubbleBottomRight")
                this.bottomLeft = this.add.sprite(123.5, 303, "rubbleBottomLeft")
                this.tl = "Knowledge";
                this.tr = "Knowledge";
                this.bl = "Knowledge";
                this.br = "Knowledge";
            }
        }else{ // second randomization
            if(Math.random() < .5){
                this.topLeft = this.add.sprite(123.5, 100, "rubbleTopLeft")
                this.tl = "Knowledge";
            }
            if(Math.random() < .5){
                this.topRight = this.add.sprite(300, 100, "rubbleTopRight")
                this.tr = "Knowledge";
            }
            if(Math.random() < .5){
                this.bottomLeft = this.add.sprite(123.5, 303, "rubbleBottomLeft")
                this.bl = "Knowledge";
            }
            if(Math.random() < .5){
                this.bottomRight = this.add.sprite(300, 303, "rubbleBottomRight")
                this.br = "Knowledge";
            }
        }
        this.topLeft.setScale(0.3)
        this.topRight.setScale(0.3)
        this.bottomRight.setScale(0.3)
        this.bottomLeft.setScale(0.3)
        socket.emit("game_info", {"event": "navigation_map", "socket_id":socketId, "aws_id": turk.emit(), 'rm_id':roomIdx, 'p_id': playerId, "input_time":new Date().toISOString(), 
        'top_left': this.tl, 'top_right': this.tr, 'bottom_left': this.bl, 'bottom_right': this.br});
    },*/
});

const gameInformation = new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor:0xffffff,
    scale: {
        _mode: Phaser.Scale.FIT,
        //autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'phaser-game-info',
        width: 400,
        height: 600,
    },
    dom: {
        createContainer: true
    },
});

gameInformation.scene.add("GameInfo", gameInfoState);
// gameInformation.scene.start("GameInfo");

socket.on('connect',()=>{
    socket.emit("game_info", {"event": "start_t&c", "socket_id": socketId, "aws_id": turk.emit(), "time": new Date().toISOString()});
})

socket.on('welcome',(message)=>{
    console.log(message);
    socketId = message["socket_id"];
    console.log(socketId);
});

$(document).ready(function() {
    $("#agree").change(actExpSmryBtn);
    $("#cte").on("click", function(){
        if ($("#agree").prop('checked') == true) {
            changeDisplay(socket, "game_info" ,"#tmcn", "#mainInfo", {"event":"start_instructions", "aws_id": turk.emit(), "socket_id":socketId});
        } else {
            alert('Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy');
        }
    });

    $("#join-room").on("click", function(){
        changeDisplay(socket, "start_wait", "#quiz-success", "#wait-room", {"event":"start_wait", "aws_id": turk.emit(), "socket_id":socketId})
    });

    $("#join-quiz").on("click", function(){
        joinQuiz(socket, socketId, turk.emit());
    });

    $("#continue-instructions").on("click", function(){
        changeDisplay(socket, "game_info", "#mainInfo", "#mainInfo2", {"event":"continue-instructions", "aws_id": turk.emit(), "socket_id":socketId})
    });

    $("#revise-intructions").on("click", function(){
        changeDisplay(socket, "game_info", "#quiz-fail", "#mainInfo", {"event":"revise_instructions", "aws_id": turk.emit(), "socket_id":socketId})
    });

    $('#start-session').on("click", function(){
        startSession(game, socket, "#session-over", "#game-screen", "#sessionId", {"event":"start_game", "s_id": sessionId, "aws_id": turk.emit(), 'rm_id':roomIdx,
        'p_id': playerId, "socket_id":socketId});
    });


    $("textarea").on("keyup", function () {
        feedback_str = $(this).val();
    });


    $("#feedbackSbmt").on("click", function(){
        turk.submit({"p_id":playerId, "rm_id":roomIdx});
        socket.emit('feedback', {"event": "feedback", "comment":feedback_str, "socket_id": socketId, "s_id":sessionId, "aws_id": turk.emit(), 'rm_id':roomIdx,
        'p_id': playerId, "time": new Date().toISOString()})
        $("#exp-close").hide();
        $("#game-over").show();

    });
});

socket.on('wait_data', (message)=>{
    console.log(message)
    console.log(socketId);
    roomIdx = message["rm_id"];
    playerId = message["p_id"]
});

socket.on('start_game', (message)=>{
    message["event"] = "start_game"
    message["s_id"] = sessionId
    message["socket_id"] = socketId
    message["aws_id"] = turk.emit()
    console.log(message)
    startSession(game, socket, gameInformation, "#wait-room", "#game-screen", "#sessionId", message);
});


export {replay_moves};