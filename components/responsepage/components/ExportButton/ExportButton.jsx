import { CSVLink, CSVDownload } from 'react-csv';
import { useResponse } from '@/core/hooks';

const ExportButton = () => {
  const { responsesData, startTime, endTime } = useResponse();
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

  const data = responsesData.map((r) => {
    const time = r.content.provided_at;
    const participantName = `${r.responded_by.demographics.first_name} ${r.responded_by.demographics.last_name}`;
    const participantId = r.responded_by.participant_identifier;
    const answer = r.content.text;
    const question = r.content.identifier;
    const questionId = r.content.identifier;
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
      className='btn btn-primary d-flex align-items-center gap-2'
      target='_blank'
    >
      <i className='fa-solid fa-download' />
      Export
    </CSVLink>
  );
};

export default ExportButton;
