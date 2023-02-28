import { useTheme } from '@react-navigation/native';
import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CodeWriter } from '../../../components/CodeWriter';
import { QuizModal, QuizModalHandle } from '../../../components/QuizModal';
import { useQuiz } from '../../../hooks/useQuiz';
import { Language } from '../../../models/Language';
import { AnswerItem } from './AnswerItem';

export const GameView = ({ languages }: { languages: Language[] }) => {
  const modalRef = useRef<QuizModalHandle>(null);
  const { round, selectAnswer, selectedAnswer, next, roundsCount } = useQuiz({
    languages,
    answersNumber: 6,
    onCorrectSelect: _ => setTimeout(() => next(), 2000),
    onFailSelect: _ => setTimeout(() => next(), 2000),
    onFinish: incorrectAnswers => modalRef.current?.showModal(incorrectAnswers),
  });

  const { colors } = useTheme();
  function checkStatus(
    answer: Language,
  ): 'correct' | 'incorrect' | 'unselected' {
    if (selectedAnswer && answer.key === round.question.key) {
      return 'correct';
    }
    if (selectedAnswer !== answer) {
      return 'unselected';
    }
    if (answer.key !== round.question.key) {
      return 'incorrect';
    }

    return 'unselected';
  }

  return (
    <View style={style.flex1}>
      <Text style={[style.progressText, { color: colors.text }]}>{`${
        round.number + 1
      }/${roundsCount}`}</Text>
      <View style={style.flex1}>
        <CodeWriter language={round.question.key}>
          {round.question.code}
        </CodeWriter>
      </View>
      <View style={style.flex2}>
        {round.answers.map(answer => (
          <AnswerItem
            key={answer.key}
            status={checkStatus(answer)}
            answer={answer}
            onSelect={selectAnswer}
          />
        ))}
        <QuizModal ref={modalRef} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 26,
  },
});
