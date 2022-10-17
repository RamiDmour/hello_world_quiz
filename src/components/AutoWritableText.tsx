import React, { useImperativeHandle } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { useAutoWriter } from '../hooks/useAutoWriter';

export interface AutoWritableTextHandle {
  write: (text: string) => Promise<void>;
  clear: () => void;
}

interface AutoWritableTextProps {
  style?: StyleProp<TextStyle>;
  children?: string;
  timeDelay?: number;
  onFinish?: () => void;
}

export const AutoWritableText = React.forwardRef<
  AutoWritableTextHandle,
  AutoWritableTextProps
>(({ timeDelay = 100, children: textToWrite, style, onFinish }, ref) => {
  const { text, start, clear } = useAutoWriter({
    timeDelay,
    value: textToWrite,
    onFinish,
  });
  useImperativeHandle(ref, () => ({
    write: val => start(val),
    clear,
  }));
  return <Text style={style}>{text}</Text>;
});
