import { useSurvey } from '@/lib/re/surveyoverview';
import { ListGroup, Badge } from 'react-bootstrap';
import { ActionButtons } from '../ActionButtons';
import { getFormattedDate } from '@/core/utils';

const getSurvey = (surveys, surveyId) => {
  if (!surveys || surveys.length === 0) return null;
  return surveys.find((item) => item.survey.mdh_id === surveyId);
};

export const ParticipantListItem = ({
  data: {
    participantIdentifier,
    secondaryIdentifier,
    demographics,
    alexa_metadata,
  },
}) => {
  const { surveyData: generalSurveyData } = useSurvey();
  const { assigned_surveys: surveys } = alexa_metadata || {};
  const thisSurvey = getSurvey(surveys, generalSurveyData.surveyID);
  const participantName = `${demographics.firstName} ${demographics.lastName}`;
  const timeOfAssignement =
    thisSurvey?.assigned_at && getFormattedDate(thisSurvey.assigned_at);
  const timeOfNotification =
    thisSurvey?.last_notified && getFormattedDate(thisSurvey.last_notified);

  return (
    <ListGroup.Item className='d-flex py-3 gap-2 flex-column'>
      <div className='d-flex align-items-center'>
        <div className='fs-6' style={{ fontWeight: '500' }}>
          {participantName}
        </div>
        {!alexa_metadata && (
          <Badge bg='secondary' pill className='ms-1'>
            not linked
          </Badge>
        )}

        {thisSurvey && (
          <Badge bg='success' pill className='ms-1'>
            assigned
          </Badge>
        )}

        {thisSurvey && thisSurvey.notified && (
          <Badge bg='info' pill className='ms-1'>
            notified
          </Badge>
        )}
        <ActionButtons
          participantIdentifier={participantIdentifier}
          secondaryIdentifier={secondaryIdentifier}
          participantFirstName={demographics.firstName}
          participantLastName={demographics.lastName}
          hasLinked={!!alexa_metadata}
          thisSurvey={thisSurvey}
        />
      </div>
      <div
        className='d-flex align-items-center gap-2 text-secondary'
        style={{ fontSize: '12px' }}
      >
        {!thisSurvey ? (
          <span>{participantIdentifier}</span>
        ) : (
          <>
            <div>
              <i className='fa-regular fa-paper-plane me-1' />
              {timeOfAssignement}
            </div>
            {timeOfNotification && (
              <div>
                <i className='fa-regular fa-bell me-1' />
                {timeOfNotification}
              </div>
            )}
          </>
        )}
      </div>
    </ListGroup.Item>
  );
};
