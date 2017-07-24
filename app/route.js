import {Navigator} from 'react-native-deprecated-custom-components';
import Home from './page/Home';
import SearchItem from './component/SearchItem';
import MoviePage from './page/MoviePage';

let navigator;
const routeMap = new Map();

routeMap.set('Home', {
  component: Home
});
routeMap.set('SearchItem', {
  component: SearchItem
});
routeMap.set('MoviePage', {
  component: MoviePage
});

export function registerNavigator(tempNavigator) {
  if (navigator) {
    return;
  }
  navigator = tempNavigator;

}

export function getNavigator() {
  return navigator;
}

export function getRouteMap() {
  return routeMap;
}