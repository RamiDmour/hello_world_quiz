import { useNavigation, useTheme } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  AutoWritableText,
  AutoWritableTextHandle,
} from '../../components/AutoWritableText';
import { RootStackParamList } from '../../navigation/RootNavigator';

interface MenuScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export const MenuScreen = ({ navigation }: MenuScreenProps) => {
  const { colors } = useTheme();
  const color = colors.text;
  const style = styles(color);
  const {} = useNavigation();
  const playItemRef = useRef<AutoWritableTextHandle>(null);
  const ratingsItemRef = useRef<AutoWritableTextHandle>(null);
  const authorsRef = useRef<AutoWritableTextHandle>(null);

  async function writeMenuItems() {
    await playItemRef.current?.write('>    Играть');
    await ratingsItemRef.current?.write('>    Рейтинг');
    const authorsText =
      'Разработано:\nДмоуром Рами.\nВдохновлено:\nПерхуновой Сашей\nЗуевым Егором';
    await authorsRef.current?.write(authorsText);
  }

  return (
    <SafeAreaView style={[style.wrapper, { backgroundColor: colors.primary1 }]}>
      <View>
        <View style={style.spacer} />
        <AutoWritableText
          timeDelay={150}
          style={style.helloWorld}
          onFinish={() => writeMenuItems()}
        >
          Hello World!
        </AutoWritableText>
        <TouchableOpacity onPress={() => navigation.navigate('GameScreen')}>
          <AutoWritableText
            ref={playItemRef}
            timeDelay={150}
            style={style.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RatingsScreen')}>
          <AutoWritableText
            ref={ratingsItemRef}
            timeDelay={150}
            style={style.text}
          />
        </TouchableOpacity>
        <View style={style.spacer} />
        <View style={style.authorsContainer}>
          <AutoWritableText style={style.authorsText} ref={authorsRef} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = (color: string) =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    helloWorld: {
      fontSize: 48,
      color,
      marginBottom: 24,
    },
    text: {
      fontSize: 36,
      marginBottom: 12,
      color,
    },
    spacer: {
      flex: 1,
    },
    authorsContainer: {
      alignSelf: 'flex-end',
    },
    authorsText: {
      color,
      fontSize: 16,
    },
  });
