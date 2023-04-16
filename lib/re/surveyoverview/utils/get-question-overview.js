import ParticipantResponse from '@/core/models/ParticipantResponse';
import Participant from '@/core/models/Participant';
import Survey from '@/core/models/Survey';

const stringToArray = (str) => {
  return str.split(',');
};

export async function getQuestionOverview(props) {
  const {
    survey_id: surveyId,
    participant_ids: participantIds,
    question_identifier: questionIdentifier,
  } = props;

  try {
    const query = {};

    if (participantIds) {
      const ids = stringToArray(participantIds);
      const selectedParticipants = await Participant.find(
        {
          participant_identifier: { $in: ids },
        },
        '_id'
      );
      query['responded_by'] = {
        $in: selectedParticipants.map((p) => p._id),
      };
    }

    if (surveyId) {
      const selectedSurvey = await Survey.findOne(
        {
          mdh_id: surveyId,
        },
        '_id'
      );
      query['responded_to'] = selectedSurvey._id;
    }

    const pipeline = [{ $match: query }, { $unwind: '$content' }];

    pipeline.push({
      $match: {
        'content.question_identifier': questionIdentifier,
      },
    });

    const result = await ParticipantResponse.aggregate([
      ...pipeline,
      {
        $project: {
          project_id: 1,
          responded_by: 1,
          responded_to: 1,
          content: 1,
        },
      },
      {
        $sort: { 'content.provided_at': -1 },
      },
    ]);

    await Participant.populate(result, {
      path: 'responded_by',
      select: {
        participant_identifier: 1,
        secondary_identifier: 1,
        demographics: 1,
      },
    });

    return result;
  } catch (err) {
    return null;
  }
}
