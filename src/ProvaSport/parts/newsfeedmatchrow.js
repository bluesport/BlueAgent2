'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var _cvals = require('../styles/customvals')

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,
} = React;

var rowheight = 100

var NewsFeedMatchRow = React.createClass({
  getInitialState: function() {
    return (
      {
        status: 0
      }
    );
  },
  render: function() {
    var {
      row_name,
      payouts,
      onPressFunction,
      ...props
    } = this.props;

    return (
      <View>
        <View style={styles.container}>
          <View style={styles.thumbnail_container}>
            <Image
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
              style={styles.thumbnail}
            />
            <Image
              source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
              style={styles.thumbnail}
            />
          </View>
          <View style={styles.content_container}>
            <Text
            style={styles.value_text}
            onPress={this.props.onPressFunction}>
            {"Player 1"}
            </Text>
            <Text style={styles.winner_text}>{"Player 2"}</Text>
            <Text style={styles.detail_text}>{"Dillon Gym"}</Text>
          </View>
          <View style={styles.scores_container}>
            <Text style={styles.scores_text}>{"21  14  21"}</Text>
            <Text style={styles.scores_text}>{"11  21  18"}</Text>
            <Text style={styles.detail_text}>{"11/12/2015"}</Text>
          </View>
        </View>
        <View style={styles.divider_line}>
        </View>
      </View>
    );
  },
  onButtonPress() {
    this.props.navigator.push({
      id: "MatchScreen",
      component: MatchScreen,
      passProps: {
        matchnum: "matchnum",
      }
    })
  },
});

var styles = StyleSheet.create({
  value_text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: _cvals.normalTextSize,
    fontFamily: _cvals.mainfont,
  },
  scores_text: {
    color: 'black',
    fontSize: 20,
    margin: 3,
    opacity: 0.7,
    fontFamily: _cvals.mainfont,
  },
  winner_text: {
    color: _cvals.skblue,
    fontWeight: 'bold',
    fontSize: _cvals.normalTextSize,
    fontFamily: _cvals.mainfont,
  },
  detail_text: {
    color: 'black',
    fontSize: _cvals.detailTextSize,
    fontFamily: _cvals.mainfont,
    color: 'grey',
    marginVertical: 4,
  },
  column_r_r: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  column_l_l: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: windowSize.width / 2 - 10,
  },
  columns_container: {
    flexDirection: 'row',
    flex: 0,
    width: windowSize.width,
  },
  content_container: {
    margin: 5,
    height: rowheight,
    width: windowSize.width * 2 / 5
  },
  scores_container: {
    margin: 5,
    height: rowheight,
    width: windowSize.width / 3
  },
  thumbnail_container: {
    height: rowheight
  },
  thumbnail: {
    height: rowheight / 2 - 10,
    width: rowheight / 2 - 10,
    borderRadius: (rowheight / 2 - 10) / 2,
    marginHorizontal: 10,
    marginVertical: 5
  },
  divider_line: {
    backgroundColor: 'grey',
    height: 1,
    opacity: 0.3,
    width: windowSize.width
  },
})

module.exports = NewsFeedMatchRow;
