import { QuestionsTab, SummaryTab, Header } from './components';
import { Tab, Tabs } from 'react-bootstrap';

export const SurveyPage = () => {
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
      <Header />
      <Tabs defaultActiveKey='questions' id='survey-tabs' className='mb-3'>
        {tabs.map(({ title, id, component }, key) => (
          <Tab eventKey={id} title={title} key={key}>
            {component}
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
