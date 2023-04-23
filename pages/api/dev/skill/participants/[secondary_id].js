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
      'participant_identifier demographics project_id alexa_metadata'
    ).populate([
      {
        path: 'alexa_metadata.assigned_surveys.survey',
        select: 'mdh_id name content',
      },
      {
        path: 'alexa_metadata.assigned_surveys.responses',
        select: 'content',
      },
    ]);

    if (!existingParticipant) {
      return res.status(404).json({
        success: false,
        message: 'Participant not found',
      });
    }
    const assignedSurveys = existingParticipant.alexa_metadata.assigned_surveys
      .filter((assignedSurvey) => !assignedSurvey.completed)
      .map((assignedSurvey) => {
        const { survey } = assignedSurvey;
        const { content } = survey;
        const { responses } = assignedSurvey || {
          responses: { content: [] },
        };
        const numberOfAnsweredQuestions = responses.content.length;
        const updatedQuestions = content.questions.map((question, index) => {
          const { type, text, title, identifier } = question;
          return {
            type,
            text,
            title,
            identifier,
            answered: index < numberOfAnsweredQuestions,
          };
        });
        const updatedContent = { ...content, questions: updatedQuestions };
        return {
          surveyID: survey.mdh_id,
          name: survey.name,
          content: updatedContent,
        };
      });

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
