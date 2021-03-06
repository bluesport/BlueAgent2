/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from '../modules/player'
import * as Team from '../modules/team'
import * as Tournament from '../modules/tournament'
import * as Match from '../modules/match'

var trophydb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
trophydb = new Firebase("https://shining-torch-4767.firebaseio.com/trophy");
/*player object within Player class*/
function _GetTrophy(trophyid, callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        trophydb.child(trophyid).on("value", function(snapshot) {
          var trophy = snapshot.val();
          resolve(trophy);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}

var default_trophy =
{
    "name": "Loading",
    "description": "Loading",
    "thumbnail": "Loading"
};

/*
 * class Trophy {
 *   // this will all be Admin-defined so read-only API
 *   /* Creates trophy object and loads a data from Firebase *
 *   constructor(trophyid) {
 *     this.hasLoaded = false;
 *     this.trophy = {
 *       "name": "string",
 *       "description": "",
 *       "thumbnail": ""
 *     };
 *     this.trophyid = trophyid; //might need to define getInitState
 *     this.promise = new Promise(function(resolve, reject) {
 *       trophydb.child(trophyid).on("value", function(snapshot) {
 *         this.trophy = snapshot.val();
 *         console.log("\n\nDOWLOADED TROPHY:  "+this.trophy);
 *         this.hasLoaded = true;
 *         resolve(this.trophy);
 *       });
 *     });
 *   }
 *
 *   /*
 *    * Private method for the trophy class trying to load the JSON object from Firbase
 *    * into the trpophy object
 *    * Usage: this.load()
 *    *
 *  /*
 *   * load(trophyid) {
 *   *     trophydb.child(trophyid).once("value", function(snapshot) {
 *   *       this.trophy = snapshot.val();
 *   *     }, function (errorObject) {
 *   *       console.log("The trophy read failed: " + errorObject.code);
 *   *     });
 *   *   }
 *   *
 *
 *   /*Usage: this.getName()
 *     Description: returns name of trophy object *
 *  getName() {
 *    if (!this.hasLoaded) {
 *      this.promise.then(function(value){
 *        console.log(value.name);
 *        return value.name;
 *      });
 *    }
 *    else {
 *      return this.trophy.name;
 *    }
 *   }
 *   /*
 *    * Usage: this.getDescription()
 *    * Description: returns trophy's description text
 *    *
 *  getDescription() {
 *      if (!this.hasLoaded) {
 *        this.promise.then(function(value){
 *          console.log(value.description);
 *          return value.description;
 *        });
 *      }
 *      else {
 *        return this.trophy.description;
 *      }
 *   }
 *   /*
 *    * Usage: getThumbnail()
 *    * Description: returns trophy thumbnail as an Image tag
 *    *
 *  getThumbnail() {
 *    if (!this.hasLoaded) {
 *      this.promise.then(function(value){
 *        return <Image src=value.thumbnail />
 *      });
 *    }
 *    else {
 *      return <Image src=trophy.thumbnail />
 *    }
 *   }
 *   /*
 *    * Usage: this.getThumbnail(string style)
 *    * Description: takes in a string representing the image's style and returns the
 *    * trophy's thumbnail with that style
 *    *
 *  getThumbnail(style) {
 *    if (!this.hasLoaded) {
 *      this.promise.then(function(value){
 *           return <Image 'style'=style src=trophy.thumbnail/>
 *      });
 *    }
 *    else {
 *      return <Image 'style'=style src=trophy.thumbnail/>
 *    }
 *   }
 * }
 */

module.exports = {_GetTrophy, default_trophy};
