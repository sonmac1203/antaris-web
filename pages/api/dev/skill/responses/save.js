import Survey from '@/core/models/Survey';
import Participant from '@/core/models/Participant';
import ParticipantResponse from '@/core/models/ParticipantResponse';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { text, identifier } = req.body;
  const { survey_id: surveyID, participant_identifier } = req.query;

  try {
    // find the participant and survey
    const participant = await Participant.findOne({
      participant_identifier,
    });
    const survey = await Survey.findOne({ mdh_id: surveyID });

    const response = await ParticipantResponse.findOneAndUpdate(
      {
        responded_by: participant._id,
        responded_to: survey._id,
      },
      {
        $push: {
          content: {
            text,
            identifier,
            provided_at: new Date(),
          },
        },
      },
      { upsert: true, new: true }
    );

    const questionsCount = survey.content.questions.length;
    const currentCompletedQuestionsCount = response.content.length;

    const progress = Math.round(
      (currentCompletedQuestionsCount / questionsCount) * 100
    );

    if (progress === 100) {
      response.completed = true;
      response.completed_at = new Date();
      await response.save();
    }

    participant.alexa_metadata.assigned_surveys.forEach((assignedSurvey) => {
      if (assignedSurvey.survey.toString() === survey._id.toString()) {
        if (progress === 100) {
          assignedSurvey.completed = true;
        }
        assignedSurvey.progress = progress;
      }
    });

    if (progress === 100) {
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

    await participant.save();
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
