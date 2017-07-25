import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import {getNavigator} from '../route'

export default class ListItem extends Component {
  constructor (props) {
    super(props)
  }

  onPress(id){
    getNavigator().push({
      name: 'ListDetail',
      params: {
        id: id
      }
    })
  }

  render() {
    const {data} = this.props;
    return (
      <TouchableHighlight style={styles.container} underlayColor='#f5f5f5' onPress={() => this.onPress(data.id)}>
        <View style={styles.item} key={data.id}>
          <View style={styles.itemImg}>
            <Image source={{uri: data.image}} style={{width: 120, height: 80}}/>
          </View>
          <View style={styles.itemTxt}>
            <Text style={styles.itemTit}>{data.title}</Text>
            <Text style={styles.itemSubTit}>{data.author}/{data.price}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
  itemImg:{
    flex: 0.4
  },
  itemTxt:{
    flex: 0.6
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
