import Participant from '@/core/models/Participant';

const handler = async (req, res) => {
  const { user_id, secondary_identifier } = req.query;

  try {
    const existingParticipant = await Participant.findOne({
      secondary_identifier,
      'alexa_metadata.user_id': user_id,
    }).populate({
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
        secondary_identifier,
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
