import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import {getRouteMap, registerNavigator} from './route';
import {Navigator} from 'react-native-deprecated-custom-components';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigator: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.container}>
        <Navigator
          style={styles.navigator}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          initialRoute={{
            name: 'Home'
          }}/>
      </View>
    )
  }

  //出场动画
  configureScene(route) {
    let sceneAnimation = getRouteMap().get(route.name).sceneAnimation;
    if (sceneAnimation) {
      return sceneAnimation;
    }
    //默认
    return Navigator.SceneConfigs.PushFromRight
  }

  renderScene(route, navigator) {
    this.navigator = navigator;
    registerNavigator(navigator);
    let Component = getRouteMap().get(route.name).component;
    if (!Component) {
      return (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>您所启动的Component未在routeMap中注册</Text>
        </View>
      );
    }
    return (
      <Component {...route.params}/>
    );
  }
}

