import { useCallback, useEffect, useRef, useState } from 'react';
import { delay } from '../utills/delay';

interface UseAutoWriterProps {
  timeDelay: number;
  value?: string;
  onFinish?: () => void;
}

export const useAutoWriter = ({
  timeDelay,
  value,
  onFinish,
}: UseAutoWriterProps) => {
  const [text, setText] = useState('');
  const prevValue = useRef(value);

  const writeText = useCallback(
    async function (val: string) {
      prevValue.current = value;
      for (const letter of val.split('')) {
        if (prevValue.current !== value) {
          clear();
          return;
        }
        if (letter !== ' ') {
          await delay(timeDelay);
        }
        setText(t => t + letter);
      }
      onFinish && onFinish();
    },
    [onFinish, timeDelay, value],
  );
  useEffect(() => {
    clear();
  }, [value]);

  useEffect(() => {
    if (value) {
      writeText(value);
    }
  }, [writeText, value]);

  async function write(val: string) {
    return writeText(val);
  }

  function clear() {
    setText('');
  }

  return { text, start: write, clear };
};
