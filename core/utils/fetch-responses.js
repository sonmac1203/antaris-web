import ParticipantResponse from '@/core/models/ParticipantResponse';
import Participant from '@/core/models/Participant';
import Survey from '@/core/models/Survey';

const stringToArray = (str) => {
  return str.split(',');
};

export async function fetchResponses(props) {
  const {
    project_id,
    participant_ids: participantIds,
    survey_ids: surveyIds,
    start,
    end,
  } = props;

  try {
    const query = { project_id };

    if (participantIds) {
      const ids = stringToArray(participantIds);
      const selectedParticipants = await Participant.find(
        {
          participant_identifier: { $in: ids },
        },
        '_id'
      );
      query['responded_by'] = { $in: selectedParticipants.map((p) => p._id) };
    }

    if (surveyIds) {
      const ids = stringToArray(surveyIds);
      const selectedSurveys = await Survey.find(
        {
          mdh_id: { $in: ids },
        },
        '_id'
      );
      query['responded_to'] = { $in: selectedSurveys.map((s) => s._id) };
    }

    const pipeline = [{ $match: query }, { $unwind: '$content' }];

    const timeQuery = {};

    if (start) {
      const startLocal = new Date(start);
      const startUtc = new Date(startLocal.getTime() + 7 * 60 * 60 * 1000);
      timeQuery['$gte'] = startUtc;
    }

    if (end) {
      const endLocal = new Date(end);
      const endUtc = new Date(endLocal.getTime() + 7 * 60 * 60 * 1000);
      const endUtcDayEnd = new Date(endUtc.setHours(23, 59, 59, 999));
      timeQuery['$lte'] = endUtcDayEnd;
    }

    if (start || end) {
      pipeline.push({
        $match: {
          'content.provided_at': timeQuery,
        },
      });
    }

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
        $sort: { 'content.provided_at': -1 }, // Sort by 'provided_at' field in ascending order
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

    await Survey.populate(result, {
      path: 'responded_to',
      select: {
        mdh_id: 1,
        display_name: 1,
        name: 1,
      },
    });

    return result;
  } catch (err) {
    return null;
  }
}
