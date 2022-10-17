import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';

export const BlinkingUnderscore = ({
  color,
  size,
  period,
}: {
  color: string;
  size: number;
  period: number;
}) => {
  const [visible, setVisible] = useState<boolean>(true);
  useEffect(() => {
    setInterval(() => {
      setVisible(prev => !prev);
    }, period);
  }, [period]);
  return <Text style={{ color, fontSize: size }}>{visible ? '_' : ''}</Text>;
};
