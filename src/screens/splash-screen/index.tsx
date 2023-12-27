import {ScreenHeight, ScreenWidth} from '@rneui/base';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {LottieComponent} from '../../components/lottie';

export const SplashScreen = () => {
  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, []);
  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.linear,
    });
    //
    console.log('nav');
  }, [opacity]);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyles}>
        <LottieComponent
          source={require('../../assets/svgs/splash.json')}
          style={{width: ScreenWidth, height: ScreenHeight}}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
