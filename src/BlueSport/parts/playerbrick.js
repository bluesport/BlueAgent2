'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Button = require('react-native-button');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')
var _const = require('../libs/constants')

import * as _ctools from '../libs/customtools.js'

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} = React;


var PlayerBrick = React.createClass({

  getInitialState: function() {
    return (
      {
      }
    );
  },

  getDefaultProps: function() {
    return (
      {
      }
    )
  },

  onPress: function() {
    // this.navigator.push()
  },

  render: function() {
    var {
      player,
      navigator,
      ...props
    } = this.props;

    return (
      <TouchableOpacity style={styles.playerbrick}
                        onPress={() => this.onPress()}>
        <View style={[styles.center, styles.left]} >
          <Image style={styles.im}
                 source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
        </View>
        <View style={styles.right}>
          <Text style={[_cstyles.detail_text]}>{this.props.player}</Text>
          <Text style={[_cstyles.detail_text]}>{"Last Name"}</Text>
        </View>
      </TouchableOpacity>
    );
  },
});

var styles = StyleSheet.create({
  playerbrick: {
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
    marginRight: 4 * _cvals.dscale,
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
});

module.exports = PlayerBrick;