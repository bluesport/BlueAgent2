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

var Match = require('../modules/match')

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


var ScoreSquare = React.createClass({

  onPress: function() {
    if (this.state.loaded == false) {
      return
    }
    var MatchPage = require('../screens/matchpage')
    this.props.navigator.push({
      id: "MatchPage" + String(this.props.matchid),
      component: MatchPage,
      passProps: {
        navigator: this.props.navigator,
        matchid: this.props.matchid
      }
    })
  },

  getInitialState: function() {
    return (
      {
        match: Match.default_match,
        loaded: false,
      }
    );
  },
  getDefaultProps: function() {
    return (
      {
        matchid: -1,
      }
    )
  },
  render: function() {
    var {
      matchid,
      navigator,
      ...props
    } = this.props;

    if (this.state.loaded == false) {
      return (<View></View>)
    }

    var tally = _ctools.getTally(this.state.match)

    return (
      <TouchableOpacity style={styles.playersquare}
                        onPress={() => this.onPress()}>
        <View style={[styles.icon, ]}>
          <Text style={[_cstyles.standard_text]}>
            {tally[0] + ' - ' + tally[1]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  fetchMatch: function(data) {
    this.setState({loaded : true})
    this.setState({match : data})
  },

  componentDidMount: function () {
    // this.state.match = this.props.match
    Match._GetMatch(this.props.matchid, this.fetchMatch)
  },

  componentWillReceiveProps: function(nextProps) {
    Match._GetMatch(this.props.matchid, this.fetchMatch)
  },
});

var styles = StyleSheet.create({
  playersquare: {
    height: _cvals.slength,
    width: _cvals.slength,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  icon: {
    height: _cvals.slength,
    width: _cvals.slength,
    marginHorizontal: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = ScoreSquare;
