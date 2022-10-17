import React from 'react';
import { RecoilRoot } from 'recoil';
import { RootNavigator } from './navigation/RootNavigator';

export const App = () => {
  return (
    <RecoilRoot>
      <RootNavigator />
    </RecoilRoot>
  );
};
