import Survey from '@/core/models/Survey';
import Participant from '@/core/models/Participant';
import ParticipantResponse from '@/core/models/ParticipantResponse';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { text, identifier } = req.body;
  const { survey_id: surveyID, participant_identifier, last } = req.query;

  try {
    // find the participant and survey
    const participant = await Participant.findOne({ participant_identifier });
    const survey = await Survey.findOne({ mdh_id: surveyID });

    await ParticipantResponse.findOneAndUpdate(
      {
        responded_by: participant._id,
        responded_to: survey._id,
      },
      {
        $push: {
          content: {
            text,
            identifier,
          },
        },
        $set: {
          completed_at: last ? new Date() : undefined,
          completed: last ? true : false,
        },
      },
      { upsert: true, new: true }
    );

    if (last) {
      participant.alexa_metadata.assigned_surveys.forEach((assignedSurvey) => {
        if (assignedSurvey.survey.toString() === survey._id.toString()) {
          assignedSurvey.completed = true;
        }
      });
      await participant.save();
    }

    survey.content.forEach((item) => {
      if (item.identifier === identifier) {
        item.completed = true;
      }
    });

    if (last) {
      survey.alexa_completed = true;
      survey.assigned_to.forEach((assignedParticipant) => {
        if (
          assignedParticipant.participant.toString() ===
          participant._id.toString()
        ) {
          assignedParticipant.completed = true;
        }
      });
    }

    await survey.save();

    return res.status(200).json({
      success: true,
      message: 'The answer has been stored',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'There was an error. Please try again',
    });
  }
};

export default handler;
