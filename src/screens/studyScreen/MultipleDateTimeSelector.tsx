import React, { useImperativeHandle, useState } from 'react';
import { Button, Text, View } from 'react-native';

type Props = {
  onFinish: () => void;
};

export type MultipleDateTimeSelectorRef = {
  hello: () => void;
};

const MultipleDateTimeSelector = React.forwardRef<
  MultipleDateTimeSelectorRef,
  Props
>(({ onFinish }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    hello: () => {
      setIsVisible(!isVisible);
    },
  }));

  if (!isVisible) {
    return <></>;
  }
  return (
    <View>
      <Text>I'm modal)</Text>
      <Button
        title="SAVE"
        onPress={() => {
          onFinish();
          setIsVisible(false);
        }}
      />
    </View>
  );
});

export default MultipleDateTimeSelector;
