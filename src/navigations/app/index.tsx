import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppParamsList} from '../paramslist';
import {ListScreen} from '../../screens/Lists';
import {ArchiveScreen} from '../../screens/Archive';

const HomeStack = createStackNavigator<AppParamsList>();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="Home" component={ListScreen} />
      <HomeStack.Screen name="Archive" component={ArchiveScreen} />
    </HomeStack.Navigator>
  );
};
