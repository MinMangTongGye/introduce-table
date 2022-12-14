import React, {PropsWithChildren, useCallback, useState} from 'react';

type AppPhase = 'title' | 'question' | 'result';

type IAppContext = {
  questions: QuestionDef[];

  currentPhase: AppPhase;
  currentQuestion: number;

  responses: Record<string, any>;

  setPhase: (phase: AppPhase) => Promise<unknown>;

  nextQuestion: (key: string, value: any) => Promise<unknown>;
  skipQuestion: (key: string) => Promise<unknown>;
};

export const AppContext = React.createContext<IAppContext>({
  questions: [],

  currentPhase: 'title',
  currentQuestion: 0,

  responses: {},

  setPhase: async (phase: AppPhase) => {},

  nextQuestion: async () => {},
  skipQuestion: async () => {},
});

export const AppContextProvider: React.FC<PropsWithChildren & {
  questions: QuestionDef[]
}> = ({ questions, children }) => {
  const [currentPhase, $setPhase] = useState<IAppContext['currentPhase']>('title');
  const [currentQuestion, setQuestion] = useState<number>(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const setPhase = useCallback(async (phase: AppPhase) => {
    $setPhase(phase)
  }, []);

  const nextQuestion = useCallback(async (key: string, value: any) => {
    const newResponses = {
      ...responses,
    };
    newResponses[key] = value;

    setResponses(newResponses);

    if (currentQuestion + 1 >= questions.length) {
      await setPhase('result');
    } else {
      setQuestion(currentQuestion + 1);
    }
  },[responses, currentQuestion, questions, setPhase]);

  const skipQuestion = useCallback(async (key: string) => {
    if (currentQuestion + 1 >= questions.length) {
      await setPhase('result');
    } else {
      setQuestion(currentQuestion + 1);
    }
  },[currentQuestion, questions, setPhase]);

  return (
    <AppContext.Provider value={{
      questions,
      currentPhase,
      currentQuestion,
      responses,

      setPhase,

      nextQuestion,
      skipQuestion
    }}>
      { children }
    </AppContext.Provider>
  );
};

