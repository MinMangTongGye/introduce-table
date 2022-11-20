import React, {useContext} from 'react';
import styled from "@emotion/styled";

import './App.css';
import { IntroPage } from './pages/IntroPage';

import Questions from './questions.json';
import {QuestionPage} from "./pages/QuestionPage";
import {AppContext, AppContextProvider} from "./contexts/AppContext";
import {ResultPage} from "./pages/ResultPage";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  min-height: 100vh;
  
  justify-content: center;
  
  @media screen and (min-width: 800px) {
    width: auto;
    height: 100vh;
    
    margin: 0 auto;
    
    aspect-ratio: 9 / 16;
  }
`;

function App() {
  const {
    questions,
    currentPhase,
    currentQuestion,
    setPhase,
    nextQuestion,
    skipQuestion
  } = useContext(AppContext);

  return (
    <AppContainer>
      { currentPhase === 'title' && <>
        <IntroPage start={() => setPhase('question')} />
      </> }

      { currentPhase === 'question' && <>
        <QuestionPage
          questionDef={questions[currentQuestion]}
          nextQuestion={nextQuestion}
          skipQuestion={skipQuestion}
        />
      </> }

      { currentPhase === 'result' && <>
          <ResultPage />
      </> }

    </AppContainer>
  );
}


function AppRoot() {
  return (
    <AppContextProvider questions={Questions.questions as QuestionDef[]}>
      <App />
    </AppContextProvider>
  );
}

export default AppRoot;
