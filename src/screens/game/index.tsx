import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { useRecoilValueLoadable } from 'recoil';
import { languagesAtom } from '../../state/languagesState';
import { GameView } from './components/GameView';

export const GameScreen = () => {
  const { colors } = useTheme();
  const languagesLoadable = useRecoilValueLoadable(languagesAtom);

  function renderBody() {
    switch (languagesLoadable.state) {
      case 'loading':
        return <ActivityIndicator />;
      case 'hasError':
        return <Text>{languagesLoadable.contents}</Text>;
      case 'hasValue':
        return <GameView languages={languagesLoadable.contents} />;
    }
  }
  return (
    <SafeAreaView
      style={[styles.wrapper, { backgroundColor: colors.primary1 }]}
    >
      {renderBody()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
