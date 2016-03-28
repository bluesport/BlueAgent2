
/* for the real time accessing of data when it changes

  // Save data
  ref.set({ name: "Alex Wolfe" });
  // Listen for realtime changes
  ref.on("value", function(data) {
    var name = data.val().name;
    alert("My name is " + name);
  });
*/


var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
Firebase = new Firebase("FirebaseURL/resource");
/*player object within Player class*/
class Tournament {
  /* Tournament object that is global and will be set by the Firebase load */
  var Tournament = {
    "tournamentid": -1,
    "type": "",
    "teams": [], //alphabetical list of teams or sorted by priority
    "location": (,), /*tuple of  Latitude and Longitude*/
    "dates": [],
    "sport": "(string)",
    "matches": [],
  };

  /*
   * Constructor: create a TournamentObject and load it's contents
   * Dependent on load() and Firebase
   */
  constructor(tournamentid) {
    let this.state.tournamentid = tournamentid; //automatically hiding information
    var ret = load();
    if (!ret) {
      alert("FATAL NO object Found");
    }
  }

  /* Load in the Tournament by tournamentid and set public object tournament
   Look into scoping rules and investigate later if the design choice is to make
  the object private for strict API usage and constricting errors within class */
  function load() {
    try {
      Tournament = Firebase.get("/Tournament/"+ tournamentid);
    }
    catch (err) {
      return null;
    }
  }

  /*
   * Usage: TournamentObj.type()
   * Description: returns a string of the tournament type:
   * round-robin= "round-robin"
   * bracket = "bracket"
   * could become obsolete in the face of the function isBracket
   */
  function type() {
    return Tournament.type;
  }


  /* Usage: TournamentObj.isBracket()
   * Description: returns boolean of if the tournament type is Bracket form
   */
  function isBracket() {
    if (Tournament.type === "bracket") return true;
    else false;
  }


  /*
   * Usage: TournamentObj.getTeams()
   * Description: returns the teams participating in the tournament
   * in an array of teamids
   */
  function getTeams() {
    return Tournament.teams;
  }

  /*
   * Usage: TournamentName.getTeams()
   * Description: returns the Teamid of the (getTeamNum)th team in
   * the list of participating teams in the tournament
   */
  function getTeams(getTeamNum) {
    return Tournament.teams[getTeamNum];
  }

  /*
   * Usage: TournamentName.getLocation();
   * Description: Returns the integer array of matchid's  from a specific
   * Tournament object in the form of columns within the bracket
   */
  function getLocation() {
    return Tournament.location;
  }

  /*
   * Usage: TournamentName.getTimes();
   * Description: Returns the integer array of matchid's  from a specific
   * Tournament object in the form of columns within the bracket
   */
  function getTimes() {
    return Tournament.dates;
  }
  /*
   * Usage: TournamentName.getSport();
   * Description: returns a string describing which sport and is standardized in the form of:
   *  <Need to agree on standardized input>
   */
  function getSport() {
    return Tournament.sport;
  }

  /* COMPLETE
   * Usage: TournamentName.getMatches();
   * Description: Returns the integer array of matchid's  from a specific
   * Tournament object in the form of columns within the bracket
   */
  function getMatches(num) {
    return Tournament.matches;
  }

}
