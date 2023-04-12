import { withSessionApiRoute } from '@/core/utils';
import AmazonAccount from '@/core/models/AmazonAccount';
import Participant from '@/core/models/Participant';
import { Types } from 'mongoose';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }
  const { token } = req.session;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to make the request.',
    });
  }
  const { participants, projectId: project_id, email } = req.body;

  try {
    const existingParticipant = await Participant.findOne(
      {
        amazon_email: email,
      },
      'alexa_metadata'
    );

    if (!existingParticipant) {
      return res.status(404).json({
        success: false,
        message: 'Email not found.',
      });
    }

    const participantDocs = [];
    for (const participant of participants) {
      const newParticipant = await Participant.create({
        _id: new Types.ObjectId(),
        ...participant,
        project_id: project_id,
        amazon_email: email,
        alexa_metadata: {
          user_id: existingParticipant.alexa_metadata.user_id,
        },
      });
      participantDocs.push(newParticipant);
    }
    await AmazonAccount.findOneAndUpdate(
      { email: email },
      {
        $addToSet: {
          'alexa_metadata.participants': {
            $each: participantDocs.map(({ _id }) => ({
              _id,
            })),
          },
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: 'Participants have been saved.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'There was an error. Please try again',
    });
  }
}

export default withSessionApiRoute(handler);
