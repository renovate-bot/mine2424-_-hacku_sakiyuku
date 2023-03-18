import { useRecoilState } from 'recoil';
import { SelfAnalysisUserAnswerEntity } from '../Domain/Entity/SelfAnalysisUserAnswerEntity';
import { selfAnalysisUserAnswerState } from './answersState';
import { calculateMBTI } from '../ApplicationServices/mbtiCalculationApplicationService';

export const useUserAnswers = () => {
  const [userAnswers, setUserAnswers] = useRecoilState(selfAnalysisUserAnswerState);

  const getUserAnswer = (id: number) => userAnswers.filter((answer) => answer.id === id)[0];

  const setDefaultData = (length: number) => {
    const answers: SelfAnalysisUserAnswerEntity[] = [];

    for (let i = 0; i < length; i += 1) {
      const defaultAnswer = {
        id: i + 1,
        answer: 0, // Not Selected
      };
      answers.push(defaultAnswer);
    }

    setUserAnswers(answers);
  };

  const setSelected = (val: number, id: number) => {
    const userAnswer: SelfAnalysisUserAnswerEntity = {
      id,
      answer: val,
    };

    const newUserAnswers = userAnswers.map((answer) => {
      if (answer.id === id) {
        return userAnswer;
      }
      return answer;
    });

    setUserAnswers(newUserAnswers);
  };

  const getMBTIScore = () => calculateMBTI(userAnswers);

  return { getUserAnswer, setDefaultData, setSelected, getMBTIScore };
};
