import Participant from '@/core/models/Participant';
import connectToDb from '@/core/db/connectToDb';

const handler = async (req, res) => {
  const { secondary_id: secondary_identifier, user_id } = req.query;

  try {
    await connectToDb();

    const existingParticipant = await Participant.findOne(
      {
        secondary_identifier,
        'alexa_metadata.user_id': user_id,
      },
      'participant_identifier demographics project_id'
    ).populate({
      path: 'alexa_metadata.assigned_surveys.survey',
      select: 'mdh_id name content',
    });

    if (!existingParticipant) {
      return res.status(404).json({
        success: false,
        message: 'Participant not found',
      });
    }
    const assignedSurveys =
      existingParticipant.alexa_metadata.assigned_surveys.map(
        (assignedSurvey) => {
          const { survey } = assignedSurvey;
          return {
            surveyID: survey.mdh_id,
            name: survey.name,
            content: survey.content,
          };
        }
      );

    res.status(201).json({
      success: true,
      message: 'A list of participants has been found',
      data: {
        participant_identifier: existingParticipant.participant_identifier,
        demographics: existingParticipant.demographics,
        secondary_identifier,
        project_id: existingParticipant.project_id,
        assigned_surveys: assignedSurveys,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default handler;
