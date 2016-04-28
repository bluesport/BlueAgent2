/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Team from '../modules/team'
import * as Tournament from '../modules/tournament'
import * as Trophy from '../modules/trophy'
import * as Match from '../modules/match'


/*
 * WARNING: methods wait on database download before returning.
 * TODO: download actual Images instead of URLs
        (accomplished by turning pic into bitstream)

 */

/* provide module to access/update player data here */
var playerdataRef = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
playerdataRef = new Firebase("https://shining-torch-4767.firebaseio.com/player");

/*possilby add stuff like isOnTeam etc.*/
function _GetPlayer(playerid, callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        playerdataRef.child(playerid).on("value", function(snapshot) {
          var player = snapshot.val();
          resolve(player);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(err ){
      console.log("Failed in _getPlayer "+ err);
    });
}

/*possilby add stuff like isOnTeam etc.*/
function GetPlayer(playerid) {
  /* var match = new Match(matchid); */
    return new Promise(function(resolve, reject) {
        playerdataRef.child(playerid).on("value", function(snapshot) {
          var player = snapshot.val();
          resolve(player);
        });
     });
}
/*
 * function enterTournment(player, playerid, tournamentid) {
 *   player.tournaments.append(torunamentid);
 *   Tournament.addPlayer(tournamentid, playerid).then(resp => if (resp){
 *     set
 *   return player;
 *
 * }
 */
function _CreatePlayer(callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        var newRef = playerdataRef.child(playerid).push("value", function(snapshot) {
          var player = snapshot.val();
          resolve(newRef.key());
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}
function createPlayer(obj) {
  /* var match = new Match(matchid); */
    return new Promise(function(resolve, reject) {
      var newRef = playerdataRef.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully "+ newRef.key());
          var key = newRef.key();
          //console.log(Team.addMatch)
          resolve(newRef.key());
        }
      });
    });
}
//this should work
//returns an array of playerids
function searchPlayers(query, callback) {
  return new Promise(function(resolve){
    var possibleFriends = []
    playerdataRef.orderByChild("name/full").on("value", function(snapshot) {
      var i = 0;
      var target = Object.keys(snapshot.val()).length;
      //console.log(target)
      snapshot.forEach(function(childSnap){
        var string = childSnap.val().name.full.toLowerCase();
        var q = query.toLowerCase();
        //console.log(string.search(q))
        var value = childSnap.val();
        i += 1;
        if (string.search(q) > -1) {
          possibleFriends.push(childSnap.key())
          if (possibleFriends.length == 100){
            callback(possibleFriends)
          }
        }
        if (i == target-1){
          //console.log("DONE")
          callback(possibleFriends)
        }
      })
    })
  })
}

export function addFriend(playerid, friend) {
  var specificRef = playerdataRef.child(playerid).child('friends')
  var list = []
  specificRef.on('value', function(snap) { list = snap.val();
    list.push(friend);
    console.log(list);
    specificRef.set(list);
  });
}

export function removeFriend(playerid, friend) {
  console.log(playerid)
  var specificRef = playerdataRef.child(playerid).child('friends')
  var list = []
  console.log("\n\nFRIENDID: "+friend)
  return new Promise(function(resolve){
    specificRef.on('value', function(snap) {
      console.log(snap.val())
      resolve(snap.val());
    });
  }).then(function(resp){
    resp = deleteEle(friend, resp);
    console.log(resp);
    if (resp.length != 0){
      specificRef.set(resp);
    }
    else {
      resp = ["NO Friends :("];
      specificRef.set(resp);
    }
  })
}

function deleteEle(value, array) {
  console.log("DELETING")
  console.log(array)
  console.log(value)
  var index = array.indexOf(value);
  if(index > -1){
    array.splice(index, 1);
  }
  return array;
}

export function addMatch(playerid, matchid) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        resolve(matches);
      });
   });
  promise.then(function(list){
    list.push(matchid);
    playerdataRef.child(playerid).child('matches').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}


export function addTeam(playerid, teamid) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('teams').on("value", function(snapshot) {
        var teams = []
        teams = snapshot.val();
        resolve(teams);
      });
   });
  promise.then(function(list){
    list.push(teamid);
    playerdataRef.child(playerid).child('teams').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}


export function addTournament(playerid, torunamentid) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('tournaments').on("value", function(snapshot) {
        var tournaments = []
        tournaments = snapshot.val();
        resolve(tournaments);
      });
   });
  promise.then(function(list){
    list.push(tournamentid);
    playerdataRef.child(playerid).child('tournaments').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}

function _AddMatch(playerid, matchid, callback) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        resolve(matches);
      });
   });
  promise.then(function(list){
    list.push(matchid);
    playerdataRef.child(playerid).child('matches').set(list)
    callback(list)
  }).catch(function(){
    console.log("Failed");
  });
}


function _AddTeam(playerid, teamid, callback) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('teams').on("value", function(snapshot) {
        var teams = []
        teams = snapshot.val();
        resolve(teams);
      });
   });
  promise.then(function(list){
    list.push(teamid);
    playerdataRef.child(playerid).child('teams').set(list)
    callback(list)
  }).catch(function(){
    console.log("Failed");
  });
}


function _AddTournament(playerid, tournamentid, callback) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('tournaments').on("value", function(snapshot) {
        var tournaments = []
        tournaments = snapshot.val();
        resolve(tournaments);
      });
   });
  promise.then(function(list){
    list.push(tournamentid);
    playerdataRef.child(playerid).child('tournaments').set(list)
    callback(list)
  }).catch(function(err){
    console.log("Failed to add Tournament to Player   " + err);
  });
}

export  var default_player = {
    "name" : {
      "first": "Loading",
      "last": "Loading",
      "full": "Loading",
    },
    "userid" : -1,
    "prof_pic": "Loading",
    "elo": 0.0,
    "earnings": [ {"sport" :
    {
      "cash": 0,
      "xp": 0,
      "trophies": [-1]
    }} ],
    "home": "LOADING",
    "sports": "LOADING",
    "imageURL": "Loading",
    "friends": [],
    "teams": [],
    "matches": [],
    "tournaments": []
  };
  //_AddTeam(0,1,function(resp){console.log(resp)}) //TESTED SUCCESSFULLY(and _AddTournament, an)
  var query = "DJ"
//searchPlayers(query,function(resp){console.log("RESPONSE:"+resp)})
module.exports = {_GetPlayer, GetPlayer, createPlayer, default_player, addMatch,
                  addTeam, addFriend, addTournament, _AddTeam, _AddMatch, removeFriend, _AddTournament,
                   searchPlayers};
