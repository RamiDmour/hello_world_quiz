import React from 'react';
import { useRef } from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MultipleDateTimeSelector, {
  MultipleDateTimeSelectorRef,
} from './MultipleDateTimeSelector';

const StudyScreen = () => {
  const modalRef = useRef<MultipleDateTimeSelectorRef>(null);

  return (
    <SafeAreaView>
      <Button
        onPress={() => modalRef.current?.hello()}
        title="Добавить время"
      />
      <MultipleDateTimeSelector
        onFinish={() => console.log('SAVE IN REDUX))')}
        ref={modalRef}
      />
    </SafeAreaView>
  );
};

export default StudyScreen;
