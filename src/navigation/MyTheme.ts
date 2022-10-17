import { DefaultTheme } from '@react-navigation/native';

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary1: 'black',
    secondary: 'white',
    primary2: '#4AF626',
    text: '#4AF626',
    error: 'red',
    valid: '#6FD08C',
  },
};
