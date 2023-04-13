import ParticipantResponse from '@/core/models/ParticipantResponse';
import Participant from '@/core/models/Participant';
import Survey from '@/core/models/Survey';

export async function getResponses(props) {
  const { participantIdentifier, surveyId } = props;
  const participant = await Participant.findOne({
    participant_identifier: participantIdentifier,
  });
  let query = { responded_by: participant._id };
  if (surveyId) {
    const survey = await Survey.findOne({ mdh_id: surveyId });
    query['responded_to'] = survey._id;
  }
  const responses = await ParticipantResponse.find(query).populate([
    {
      path: 'responded_by',
      select: 'participant_identifier',
    },
    {
      path: 'responded_to',
      select: 'mdh_id',
    },
  ]);
  return responses || null;
}
