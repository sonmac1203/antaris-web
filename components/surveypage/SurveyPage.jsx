import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { QuestionsTab, SummaryTab, Header } from './components';
import { Tab, Tabs } from 'react-bootstrap';
import { SurveyPageContext } from './context';

export const SurveyPage = () => {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(true);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  const surveyPageContextValue = useMemo(
    () => ({
      isRefreshing,
      setIsRefreshing,
      refreshData,
    }),
    [isRefreshing]
  );

  const tabs = [
    {
      title: 'Question',
      id: 'questions',
      component: <QuestionsTab />,
    },
    { title: 'Summary', id: 'summary', component: <SummaryTab /> },
  ];

  return (
    <div className='core-container'>
      <SurveyPageContext.Provider value={surveyPageContextValue}>
        <Header />
        <Tabs defaultActiveKey='questions' id='survey-tabs' className='mb-4'>
          {tabs.map(({ title, id, component }, key) => (
            <Tab eventKey={id} title={title} key={key}>
              {component}
            </Tab>
          ))}
        </Tabs>
      </SurveyPageContext.Provider>
    </div>
  );
};
