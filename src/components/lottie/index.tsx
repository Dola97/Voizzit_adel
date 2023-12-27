import React from 'react';
import LottieView, {LottieViewProps} from 'lottie-react-native';

// Define an interface for your component's props
interface LottieComponentProps extends LottieViewProps {
  // You can add additional props here if needed
}

export const LottieComponent: React.FC<LottieComponentProps> = props => {
  return <LottieView {...props} />;
};

// Optional: Default props
LottieComponent.defaultProps = {
  // Define any default props here
  autoPlay: true,
  loop: true,
  // etc.
};
