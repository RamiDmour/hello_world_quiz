import { useMemo, useRef, useState } from 'react';
import { Language } from '../models/Language';
import { getRandomElements } from '../utills/getRandomElements';
import { shuffleArray } from '../utills/shuffleArray';

interface Round {
  number: number;
  question: Language;
  answers: Language[];
}
interface UseQuizProps {
  languages: Language[];
  answersNumber: number;
  onCorrectSelect: (language: Language) => void;
  onFailSelect: (language: Language) => void;
  onFinish: (incorrectAnswers: Language[]) => void;
}
export function useQuiz({
  languages,
  answersNumber,
  onCorrectSelect,
  onFailSelect,
  onFinish,
}: UseQuizProps) {
  const incorrectAnswers = useRef<Language[]>([]);
  const rounds = useMemo<Round[]>(
    () =>
      shuffleArray(languages).map((language, i, randLanguages) => {
        const answers = getRandomElements(randLanguages, answersNumber - 1, [
          language,
        ]);
        answers.push(language);

        return {
          number: i,
          answers: shuffleArray(answers),
          question: language,
        };
      }),
    [languages, answersNumber],
  );

  const [currentRound, setCurrentRound] = useState(rounds[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<Language | null>(null);

  function selectAnswer(language: Language) {
    if (language.code === currentRound.question.code) {
      onCorrectSelect(currentRound.question);
    } else {
      onFailSelect(currentRound.question);
      incorrectAnswers.current?.push(language);
    }
    setSelectedAnswer(language);
  }

  function next() {
    setSelectedAnswer(null);
    if (currentRound.number + 1 === rounds.length) {
      onFinish(incorrectAnswers.current);
    } else {
      setCurrentRound(rounds[currentRound.number + 1]);
    }
  }

  return {
    round: currentRound,
    selectAnswer,
    next,
    selectedAnswer,
    roundsCount: rounds.length,
  };
}
