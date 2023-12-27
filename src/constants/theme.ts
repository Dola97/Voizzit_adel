import {createTheme} from '@rneui/themed';
import {darkBlueGray} from './colors';
export interface Fonts {
  regular: string;
  bold: string;
  exbold: string;
  black: string;
  semibold: string;
  light: string;
  exlight: string;
}

export const fonts: Fonts = {
  regular: 'NunitoSans7ptCondensed-Regular',
  bold: 'NunitoSans7ptCondensed-Bold',
  exbold: 'NunitoSans7ptCondensed-ExtraBold',
  black: 'NunitoSans7ptCondensed-Black',
  semibold: 'NunitoSans7ptCondensed-SemiBold',
  light: 'NunitoSans7ptCondensed-Light',
  exlight: 'NunitoSans7ptCondensed-ExtraLight',
};

export const theme = createTheme({
  lightColors: {
    primary: darkBlueGray.blue9,
    secondary: darkBlueGray.blue1,
    background: '#fff',
    error: '#6F1D1D',
    grey0: darkBlueGray.blue12,
  },
  darkColors: {
    primary: darkBlueGray.blue2,
    secondary: '#fff',
    background: darkBlueGray.blue2,
    error: '#6F1D1D',
    grey0: darkBlueGray.blue6,
  },

  spacing: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  mode: 'light',
});
