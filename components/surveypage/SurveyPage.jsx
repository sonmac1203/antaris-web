import { Tab, Tabs } from 'react-bootstrap';
import { QuestionsTab, SummaryTab, Header } from './components';

export const SurveyPage = () => {
  return (
    <div className='core-container'>
      <Header />
      <Tabs defaultActiveKey='questions' id='survey-tabs' className='mb-4'>
        <Tab eventKey='questions' title='Questions' key='0'>
          <QuestionsTab />
        </Tab>
        <Tab eventKey='summary' title='Summary' key='1'>
          <SummaryTab />
        </Tab>
      </Tabs>
    </div>
  );
};
