import {replay_moves} from "/js/index.js"

var phaserConfig = {
    type: Phaser.AUTO,
    backgroundColor:0xffffff,
    scale: {
        _mode: Phaser.Scale.FIT,
        parent: 'phaser-game',
        width: 775,
        height: 625,
    },
    dom: {
        createContainer: true
    },
};

var getMapData = function(){
    var mapData;
    $.ajax({
    async: false,
    type: "GET",
    url: window.location.origin+"/game_config",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    crossDomain: true,
    success: function(data){
        console.log("Cols:",data.cols, " | Rows:", data.rows);
        mapData = data
    },
    failure: function(errMsg) {
        console.log(errMsg);
    }
    });

    return mapData
}

var getNavigationMapData = function(){
    var navigationMapData;
    $.ajax({
    async: false,
    type: "GET",
    url: window.location.origin+"/navigation_config",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    crossDomain: true,
    success: function(data){
        navigationMapData = data
    },
    failure: function(errMsg) {
        console.log(errMsg);
    }
    });

    return navigationMapData
}

var getGameData = function(){
    //game time '00' or minutes like '2'. If it was '2' that is timer with deadline, gameTimeArg would be {precision: 'secondTenths', countdown: true, startValues: {minutes: gameTime}}
    let gameSetUpData = {
        "roundCount":0,
        "roundLimit":20000000,
        "players":[{
            "playerX":5,
            "playerY":75,
            "playerName":"dude",
            "playerFrameWidth":32,
            "playerFrameHeight":48,
        }
        // {
        //     "playerX":6,
        //     "playerY":77,
        //     "playerName":"player1",
        //     "playerFrameWidth":32,
        //     "playerFrameHeight":48,
        // }
    ],
        "leaderName":"chirag",
        "leaderDelay":500,
        "leaderX":5,
        "leaderY":75,
        "leaderFrameWidth":32,
        "leaderFrameHeight":48,
        gameTime:"00",
        gameTimeArg:{}
    }
    return gameSetUpData
}


var getCSVConfig = function(){
    var mapData = getMapData();
    var victimIndexes = new Array();
    var roomVictimMapping = {};
    var count = 0;
    for (let ri in mapData.roomFloorMapping){
        roomVictimMapping[ri] = new Array();
    }
    console.log(replay_moves);
    for (let ri in mapData.roomFloorMapping){
        if (ri == "3707") continue;
    
        //let randomVictimIdx = mapData.roomFloorMapping[ri][Math.floor(Math.random()*length)];
        console.log("Door #: " + ri + " Random Victim Loc: " + replay_moves[0][count]);
        victimIndexes.push(replay_moves[0][count]);
        roomVictimMapping[ri].push(replay_moves[0][count]);
        count++;
        /*if (randomVictimIdx!=null){
            mapData.victimIndexes.push(randomVictimIdx);
            mapData.roomVictimMapping[ri].push(randomVictimIdx);
        }*/
    }
    return [victimIndexes, roomVictimMapping]
}


var getRandomConfig = function(){
    var mapData = getMapData();
    var victimIndexes = new Array();
    var roomVictimMapping = {};
    for (let ri in mapData.roomFloorMapping){
        roomVictimMapping[ri] = new Array();
    }
    for (let ri in mapData.roomFloorMapping){
        if (ri == "3707") continue;
        let length = mapData.roomFloorMapping[ri].length;
        let randomVictimIdx = mapData.roomFloorMapping[ri][Math.floor(Math.random()*length)];
        if (randomVictimIdx!=null){
            victimIndexes.push(randomVictimIdx);
            roomVictimMapping[ri].push(randomVictimIdx);
        }

    }
    return [victimIndexes, roomVictimMapping]
}

var getSurveyJson = function (){
    var surveyJson;
    $.ajax({
    async: false,
    type: "GET",
    url: window.location.origin+"/survey_config",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    crossDomain: true,
    success: function(data){
        surveyJson = data
    },
    failure: function(errMsg) {
        console.log(errMsg);
    }
});
    return surveyJson
}

var getSocketURL = function (){
    var socketURL;
    $.ajax({
        async: false,
        type: "GET",
        url: window.location.origin+"/socket_url",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        crossDomain: true,
        success: function(data){
            console.log(data);
            socketURL = data["socketURL"]
        },
        failure: function(errMsg) {
            console.log(errMsg);
        }
    });
    return socketURL
}


export {phaserConfig, getMapData, getGameData, getSocketURL, getRandomConfig, getCSVConfig, getSurveyJson, getNavigationMapData};

