'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');

var _cvals = require('../styles/customvals')
var _cstyles = require('../styles/customstyles')

var {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} = React;

var leftMargin = 50 * _cvals.dscale;
var rowWidth = windowSize.width - leftMargin;
var rowHeight= 32 * _cvals.dscale;

var GameScoreRow = React.createClass({
  getInitialState: function() {
    return (
      {
      }
    )
  },

  render: function() {
    var {
      key,
      index,
      val1,
      val2,
      onIconPress,
      ...props
    } = this.props;

    return (

      <View style={styles.container}>
        <View style={[styles.leftmost, styles.left,]}>
          <Text style={[_cstyles.standard_text, ]}>
            {"Game " + String(this.props.index)}
          </Text>
        </View>

        <View style={[styles.center, styles.val1_container]}>
          <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
            {this.props.val1}
          </Text>
        </View>

        <View style={[styles.middle, styles.center]}>
          <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
            {'-'}
          </Text>
        </View>

        <View style={[styles.center, styles.val2_container]}>
          <Text style={[_cstyles.standard_text, _cstyles.centeredText]}>
            {this.props.val2}
          </Text>
        </View>

        <View style={[styles.rightmost, styles.center]}>
          <TouchableOpacity onPress={this.onPress}>
            <Image source={require('../assets/close.png')} style={_cstyles.close} />
          </TouchableOpacity>
        </View>

      </View>
    );
  },
  onIconPress: function() {
    this.props.onIconPress()
  }
});

var styles = StyleSheet.create({
  container: {
    marginLeft: leftMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: rowWidth,
    height: rowHeight,
  },
  left: {
    justifyContent: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftmost: {
    width: rowWidth * 5 / 10,
    justifyContent: 'center'
  },
  val1_container: {
    width: rowWidth * 1.5 / 10,
    alignItems: 'center'
  },
  middle: {
    width: rowWidth * .5 / 10,
    alignItems: 'center'
  },
  val2_container: {
    width: rowWidth * 1.5 / 10,
    alignItems: 'center'
  },
  rightmost: {
    width: windowSize.width * 1.5 / 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

module.exports = GameScoreRow;
