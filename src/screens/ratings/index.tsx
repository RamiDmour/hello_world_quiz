import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AutoWritableText } from '../../components/AutoWritableText';
import { useRatings } from '../../hooks/useRatings';

export const RatingsScreen = () => {
  const { colors } = useTheme();
  const { ratingsLoadable } = useRatings();

  const style = styles(colors.text);

  function renderBody() {
    switch (ratingsLoadable.state) {
      case 'loading':
        return <ActivityIndicator color={colors.primary2} />;
      case 'hasValue':
        return (
          <FlatList
            data={ratingsLoadable.contents}
            renderItem={({ item: rating }) => (
              <AutoWritableText
                timeDelay={150}
                style={style.ratingText}
              >{`${rating.name}\t - \t${rating.score}/${rating.max}`}</AutoWritableText>
            )}
          />
        );
    }
  }

  return (
    <SafeAreaView style={[style.wrapper, { backgroundColor: colors.primary1 }]}>
      {renderBody()}
    </SafeAreaView>
  );
};

const styles = (color: string) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    ratingText: {
      color,
      fontSize: 24,
    },
  });
