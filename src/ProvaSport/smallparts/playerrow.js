'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
 ;

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

import * as _ctools from '../libs/customtools.js'
import * as Player from '../modules/player'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Navigator,
  TouchableOpacity,
} = React;


var PlayerRow = React.createClass({

  getInitialState: function() {
    return (
      {
        player: Player.default_player,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        playerid: -1,
        dead: false,
      }
    )
  },
  render: function() {
    var {
      playerid,
      navigator,
      ...props
    } = this.props;

    if (this.props.dead) {
      return (
        <View style={styles.playerbrick} >
          <View style={[styles.center, styles.left]} >
            <Image style={styles.im}
                   source={{uri: this.state.player.prof_pic}}/>
          </View>
          <View style={styles.right}>
            <View >
              <Text style={[_cstyles.header_text]}>{this.state.player.name.full} </Text>
            </View>
          </View>
        </ View>
        )
    }

    return (
      <TouchableOpacity style={styles.playerbrick} 
                        onPress={()=>this.onPress()} >
        <View style={[styles.center, styles.left]} >
          <Image style={styles.im}
                 source={{uri: this.state.player.prof_pic}}/>
        </View>
        <View style={styles.right}>
          <View >
            <Text style={[_cstyles.header_text]}>{this.state.player.name.full} </Text>
          </View>
        </View>
      </ TouchableOpacity>
    );
  },

  onPress: function() {
    var PlayerPage = require('../screens/playerpage')
    this.props.navigator.push({
      id: "PlayerPage" + String(_ctools.randomKey()),
      component: PlayerPage,
      passProps: {
        navigator: this.props.navigator,
        playerid: this.props.playerid
      }
    })
  },

  fetchPlayer: function(data) {
    this.state.player = data
    this.setState({loaded : true})
    // _GetTeam(this.state.player.teams[0], this.fetchTeam)
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Player._GetPlayer(this.props.playerid, this.fetchPlayer)
  },

  componentWillReceiveProps: function(nextProps) {
    Player._GetPlayer(nextProps.playerid, this.fetchPlayer)
  },
});

var styles = StyleSheet.create({
  playerbrick: {
    height: _cvals.brickheight,
    width: _cvals.bricklength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingLeft: 4,
  },
  im: {
    height: _cvals.thumbslength,
    width: _cvals.thumbslength,
    borderRadius: _cvals.thumbslength / 2,
    marginHorizontal: 4 * _cvals.dscale,
  },
  left:{
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  right: {

  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  matchrow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    margin: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  compress: {
    marginTop: _cvals.dscale * -4
  }
});

module.exports = PlayerRow;
