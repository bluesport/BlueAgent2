'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles  = require('../styles/customstyles')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
} = React;

var WideButton = React.createClass({
  getDefaultProps: function() {
    return (
      {
        isDisabled: false
      }
    )
  },

  render: function() {
    var {
      text,
      onPress,
      isDisabled,
      ...props
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.button, this.canConfirm()]}
        onPress={this.props.onPress}>
        <View>
          <Text style={styles.buttonText}> {this.props.text} </Text>
        </View>
      </TouchableOpacity>
    );
  },

  // used to hide button
  canConfirm: function() {
    if (this.props.mode == "isDisabled") {
      return {height: 0, opacity: 0.0}
    }
    return {}
  },
});

var styles = StyleSheet.create({
  button: {
    backgroundColor: _cvals.skorange,
    width: windowSize.width,
    shadowRadius: 4 * _cvals.dscale,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: -1},
    padding: 5 * _cvals.dscale,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30 * _cvals.dscale,
    fontFamily: 'avenir',
    fontWeight: 'bold',
  },
})

module.exports = WideButton;