import type {StackScreenProps} from '@react-navigation/stack';

export type AppParamsList = {
  Home: undefined;
  AddEdit: undefined;
  Archive: undefined;
};
export type RootParamsList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  Auth: undefined;
  App: undefined;
};

export type appNavigationProps<T extends keyof AppParamsList> = {
  navigation: StackScreenProps<AppParamsList, T>;
};
export type rootNavigationProps<T extends keyof RootParamsList> = {
  navigation: StackScreenProps<RootParamsList, T>;
};
export type ScreenProps<T extends keyof RootParamsList> = StackScreenProps<
  RootParamsList,
  T
>;
