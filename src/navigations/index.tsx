import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {HomeStackScreen} from './app';

const Root = () => {
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
};
export default Root;
