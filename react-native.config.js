module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
        android: null,
      },
    },
  },
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
  assets: ['./src/assets/fonts'],
};
