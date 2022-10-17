import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {
  AutoWritableText,
  AutoWritableTextHandle,
} from '../../../components/AutoWritableText';
import { Language } from '../../../models/Language';

export const AnswerItem = ({
  answer,
  onSelect,
  status = 'unselected',
}: {
  answer: Language;
  onSelect: (language: Language) => void;
  status?: 'correct' | 'incorrect' | 'unselected';
}) => {
  const { colors } = useTheme();
  const autoWritableTextRef = useRef<AutoWritableTextHandle>(null);

  const [statusColor, setStatusColor] = useState(colors.secondary);
  useEffect(() => {
    switch (status) {
      case 'correct':
        setStatusColor(colors.valid);
        autoWritableTextRef.current?.write('CORRECT!');
        break;
      case 'incorrect':
        setStatusColor(colors.error);
        autoWritableTextRef.current?.write('ERROR!');
        break;
      case 'unselected':
        setStatusColor(colors.secondary);
        autoWritableTextRef.current?.clear();
    }
  }, [status, colors]);
  return (
    <TouchableHighlight style={style.flex1} onPress={() => onSelect(answer)}>
      <View style={style.answerContainer}>
        <Text style={[style.cursor, { color: colors.text }]}>{'>'}</Text>
        <Text style={[style.answerText, { color: colors.text }]}>
          {answer.name}
        </Text>
        <AutoWritableText
          style={[style.statusText, { color: statusColor }]}
          ref={autoWritableTextRef}
        />
      </View>
    </TouchableHighlight>
  );
};

const style = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  cursor: {
    flex: 1,
    textAlign: 'right',
    fontSize: 24,
  },
  answerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  answerText: {
    flex: 2,
    alignSelf: 'center',
    marginLeft: 32,
    fontSize: 24,
  },
  statusText: {
    flex: 1,
    fontSize: 12,
  },
});
