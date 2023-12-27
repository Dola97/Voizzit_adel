import {useEffect} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export const useFadeIn = () => {
  const fadeAnim = useSharedValue(0);

  // Function to handle the fade-in animation
  const fadeInStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  }, []);
  useEffect(() => {
    fadeAnim.value = withTiming(1, {duration: 2000});
  }, [fadeAnim]);

  return {fadeInStyle};
};
