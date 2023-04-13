import { CSVLink } from 'react-csv';
import { Button } from 'react-bootstrap';
import { useFilterBar } from '../../hooks';

const ExportButton = () => {
  const { startTime, endTime, responses } = useFilterBar();

  if (!responses || responses.length === 0) {
    return (
      <Button
        disabled
        variant='link'
        className='text-decoration-none d-flex gap-2 align-items-center'
      >
        <i className='fa-solid fa-file-arrow-down' />
        Export
      </Button>
    );
  }
  const headers = [
    { label: 'Time', key: 'time' },
    { label: 'ParticipantName', key: 'participantName' },
    { label: 'ParticipantId', key: 'participantId' },
    { label: 'Answer', key: 'answer' },
    { label: 'Question', key: 'question' },
    { label: 'QuestionId', key: 'questionId' },
    { label: 'SurveyName', key: 'surveyName' },
    { label: 'SurveyId', key: 'surveyId' },
  ];

  const data = responses.map((r) => {
    const time = r.content.provided_at;
    const participantName = `${r.responded_by.demographics.first_name} ${r.responded_by.demographics.last_name}`;
    const participantId = r.responded_by.participant_identifier;
    const answer = r.content.answer_text;
    const question = r.content.question_text;
    const questionId = r.content.question_identifier;
    const surveyName = r.responded_to.name;
    const surveyId = r.responded_to.mdh_id;
    return {
      time,
      participantName,
      participantId,
      answer,
      question,
      questionId,
      surveyName,
      surveyId,
    };
  });

  const getFilename = (start, end) => {
    let fileName = 'Responses';
    if (!start && !end) {
      fileName += '_AllTime';
    } else if (!start) {
      fileName += `_AllTime_${end}`;
    } else if (!end) {
      fileName += `_${start}_Present`;
    } else {
      fileName += `_${start}_${end}`;
    }
    const now = new Date().toISOString();
    return fileName + `_${now}` + '.csv';
  };

  const fileName = getFilename(startTime.current, endTime.current);

  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={fileName}
      className='btn-link text-decoration-none d-flex gap-2 align-items-center'
    >
      <i className='fa-solid fa-file-arrow-down' />
      <span className='link-hover'>Export to CSV</span>
    </CSVLink>
  );
};

export default ExportButton;
