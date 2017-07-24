import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {getNavigator} from '../route'

export default class ListItem extends Component {
  constructor (props) {
    super(props)
  }

  onPress(data){
    getNavigator().push({
      name: 'ListDetail',
      params: {
        id: data.id
      }
    })
  }

  render() {
    const {data} = this.props;
    return (
      <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.onPress(data)}>
        <View style={styles.item} key={data.id}>
          <View style={styles.itemImg}>
            <Image source={{uri: data.image}} style={{width: 120, height: 80}}/>
          </View>
          <View style={styles.itemTxt}>
            <Text style={styles.itemTit}>{data.title}</Text>
            <Text style={styles.itemSubTit}>{data.title}/{data.author}/{data.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    borderBottomWidth: 1,
    borderColor: '#ededed',
    borderStyle: 'solid',
    padding: 10
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  itemTit: {
    fontSize: 14,
    color: '#333',
    paddingBottom: 5
  },
  itemSubTit: {
    fontSize: 12,
    color: '#999'
  }
});
