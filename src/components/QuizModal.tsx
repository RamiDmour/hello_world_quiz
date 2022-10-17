import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { Language } from '../models/Language';
import Modal from 'react-native-modal';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { languagesAtom } from '../state/languagesState';
import { BlinkingUnderscore } from './BlinkingUnderscore';
import { SizedBox } from './SizedBox';
import { AutoWritableText, AutoWritableTextHandle } from './AutoWritableText';
import { getRandomString } from '../utills/getRandomString';
import { useRatings } from '../hooks/useRatings';

interface QuizModalProps {}

export interface QuizModalHandle {
  showModal: (incorrectAnswers: Language[]) => void;
}

export const QuizModal = React.forwardRef<QuizModalHandle, QuizModalProps>(
  (_, ref) => {
    const languages = useRecoilValue(languagesAtom);
    const { addRating } = useRatings();
    const { goBack } = useNavigation();

    const [incorrectAnswers, setIncorrectAnswers] = useState<Language[]>();
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState<string>();

    const autoWritableTextRef = useRef<AutoWritableTextHandle>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const uniquePostfix = useRef<string>();

    const { colors } = useTheme();
    const color = isError ? colors.error : colors.primary2;

    useImperativeHandle(ref, () => ({
      showModal(answers) {
        uniquePostfix.current = '#' + getRandomString(6);
        setIncorrectAnswers(answers);
      },
    }));

    useEffect(() => {
      autoWritableTextRef.current
        ?.write(
          `Количество правильных ответов: ${
            languages.length - incorrectAnswers!.length
          }`,
        )
        .then(() =>
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start(),
        );
    }, [incorrectAnswers, languages, fadeAnim]);

    function showError(text: string) {
      setIsError(true);
      autoWritableTextRef.current?.clear();
      autoWritableTextRef.current?.write(text).then(() => {
        autoWritableTextRef.current?.clear();
        setIsError(false);
        autoWritableTextRef.current?.write(
          `Количество правильных ответов: ${
            languages.length - incorrectAnswers!.length
          }`,
        );
      });
    }

    function submit() {
      if (!userName || userName?.length < 0) {
        showError('Необходимо заполнить все поля.');
        return;
      }
      addRating({
        score: languages.length - incorrectAnswers!.length,
        name: userName + uniquePostfix.current,
        max: languages.length,
      });
      goBack();
    }

    return (
      <Modal isVisible={!!incorrectAnswers}>
        {incorrectAnswers ? (
          <>
            <View style={style(colors.primary2).row}>
              <AutoWritableText
                ref={autoWritableTextRef}
                timeDelay={150}
                style={[
                  style(colors.primary2).text,
                  isError && { color: colors.error },
                ]}
              />
              <BlinkingUnderscore period={400} color={color} size={18} />
            </View>
            <SizedBox height={18} />
            <Animated.View style={{ opacity: fadeAnim }}>
              <View style={style(color).row}>
                <TextInput
                  value={userName}
                  onChangeText={text => setUserName(text)}
                  placeholder="Введите ваш никнейм"
                  placeholderTextColor={color}
                  style={[style(color).input]}
                />
                <Text style={style(color).inputPostfix}>
                  {uniquePostfix.current}
                </Text>
              </View>
              <SizedBox height={12} />
              <TouchableHighlight style={style(color).button} onPress={submit}>
                <Text style={style(color).buttonTextColor}>Сохранить</Text>
              </TouchableHighlight>
              <SizedBox height={12} />
              <TouchableHighlight
                style={style(color).button}
                onPress={() => goBack()}
              >
                <Text style={style(color).buttonTextColor}>Выйти</Text>
              </TouchableHighlight>
            </Animated.View>
          </>
        ) : (
          <></>
        )}
      </Modal>
    );
  },
);

const style = (color: string) =>
  StyleSheet.create({
    text: {
      fontSize: 18,
      color: color,
    },
    buttonTextColor: {
      fontSize: 32,
      color: color,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    button: {
      borderColor: color,
      borderRadius: 6,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      borderBottomColor: color,
      borderBottomWidth: 1,
      color: color,
      fontSize: 18,
    },
    inputPostfix: {
      fontSize: 18,
      color: color,
    },
  });
