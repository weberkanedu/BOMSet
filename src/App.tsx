import React from 'react';
import { LogProvider, useLog } from './context/LogContext';
import { MobileFrame } from './components/layout/MobileFrame';
import { ShowcaseView } from './components/screens/ShowcaseView';

const MainContent: React.FC = () => {
  const { displayLayout } = useLog();

  if (displayLayout === 'showcase') {
    return <ShowcaseView />;
  }

  return <MobileFrame />;
};

export default function App() {
  return (
    <LogProvider>
      <MainContent />
    </LogProvider>
  );
}
