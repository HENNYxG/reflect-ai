'use client'
import { createContext, useState } from 'react';

const initState = {
    summary: 'summary',
    mood: 'mood',
    color: 'white',
    subject: 'subject',
    negative: 'false',
}

export const AnalysisContext = createContext({
  analysisState: initState,
  setAnalysisState: () => null,
  resetState: {
    summary: '',
    mood: '',
    color: '',
    subject: '',
    negative: '',
  },
});

export const AnalysisProvider = ({ children }) => {
    const [analysisState, setAnalysisState] = useState(initState);
    const resetState = {
      summary: '',
      mood: '',
      color: '',
      subject: '',
      negative: '',
    };
  const value = { resetState, analysisState, setAnalysisState };
  

  return (
    <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
  );
};