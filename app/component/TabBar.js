import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export default class TabBar extends Component {
  constructor (props) {
    super(props)
    console.log(this.props.tabs)
    if (props.tabBarResources.length !== props.tabs.length) {
      console.warn('ScrollableTabView TabBar config error, please check');
    }
  }

  render() {
    const {
      tabBarResources,
      activeTab,
      tabs,
      goToPage
    } = this.props;
    return (
      <View style={styles.container}>
        {
          tabs.map((tab, index) => {
            return (
              <TouchableOpacity style={styles.touchableContainer} key={index} onPress={() => {goToPage(index)}} activeOpacity={1}>
                <Image style={styles.image} source={tabBarResources[index][activeTab === index ? 1 : 0]}/>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height:60,
    backgroundColor:"#FBFBFB",
    flexDirection:"row",
    borderColor:"#ddd",
    borderTopWidth:1
  },
  touchableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50
  }
});
