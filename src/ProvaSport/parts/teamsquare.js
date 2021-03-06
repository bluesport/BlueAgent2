'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
 ;

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

import * as _ctools from '../libs/customtools.js'
import * as Team from '../modules/team'

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


var TeamSquare = React.createClass({

  onPress: function() {
    if (this.state.loaded == false) {
      return
    }
    // var PlayerPage = require('../screens/playerpage')
    // this.props.navigator.push({
    //   id: "PlayerPage" + String(_ctools.randomKey()),
    //   component: PlayerPage,
    //   passProps: {
    //     navigator: this.props.navigator,
    //     playerid: this.props.playerid
    //   }
    // })
  },

  getInitialState: function() {
    return (
      {
        team: Team.default_team,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        teamid: -1,
      }
    )
  },
  render: function() {
    var {
      teamid,
      navigator,
      ...props
    } = this.props;

    if (this.state.loaded == false) {
      return (<View></View>)
    }

    return (
      <TouchableOpacity style={styles.teamsquare}
                        onPress={() => this.onPress()}>
        <TouchableOpacity style={[styles.icon, ]}>
          <Image style={styles.im}
                 source={{uri: this.state.team.thumbnail}}/>
          <Text style={[_cstyles.detail_text]}
                numberOfLines={1}>
            {this.state.team.name}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  },

  fetchTeam: function(data) {
    this.setState({loaded : true})
    this.setState({team : data})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Team._GetTeam(this.props.teamid, this.fetchTeam)
  },

  componentWillReceiveProps: function(nextProps) {
    Team._GetTeam(nextProps.teamid, this.fetchTeam)
  },
});

var styles = StyleSheet.create({
  teamsquare: {
    height: _cvals.slength,
    width: _cvals.slength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  im: {
    height: _cvals.thumbslength,
    width: _cvals.thumbslength,
    borderRadius: _cvals.thumbslength / 2,
    marginRight: 4 * _cvals.dscale,
  },
  icon: {
    height: _cvals.slength,
    width: _cvals.slength,
    marginHorizontal: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

module.exports = TeamSquare;
