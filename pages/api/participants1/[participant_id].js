import mongoClientPromise from '@/core/db/mongoClient';
import axios from 'axios';

export default async function handler(req, res) {
  const mongoClient = await mongoClientPromise;
  const { participant_id: participantId, project_id: projectId } = req.query;
  const accessToken = req.headers.authorization.split(' ')[1];

  try {
    const existingParticipant = await mongoClient
      .db()
      .collection('Participants')
      .findOne(
        { participant_identifier: participantId, project_id: projectId },
        { projection: { _id: 0 } }
      );
    if (existingParticipant) {
      return res.status(201).json({
        success: true,
        message: 'Participant has been found from database.',
        data: existingParticipant,
      });
    }
  } catch (err) {
    console.log(err);
  }

  const participantFromMdh = await fetchParticipantFromMyDataHelps(
    projectId,
    participantId,
    accessToken
  );
  if (!participantFromMdh) {
    return res.status(500).json({
      success: false,
      message: 'We could not retrieve the participant. Please try again!',
    });
  }
  return res.status(200).json({
    success: true,
    message: 'Participant has been successfully fetched from MyDataHelps.',
    data: {
      participant_identifier: participantFromMdh.participantIdentifier,
      secondary_identifier: participantFromMdh.secondaryIdentifier,
      project_id: projectId,
      alexa_surveys: [],
      account_email: participantFromMdh.accountEmail,
      demographics: {
        email: participantFromMdh.demographics.email,
        first_name: participantFromMdh.demographics.firstName,
        last_name: participantFromMdh.demographics.lastName,
      },
      custom_fields: participantFromMdh.customFields,
    },
  });
}

const fetchParticipantFromMyDataHelps = async (
  projectId,
  participantId,
  accessToken
) => {
  const url = `https://designer.mydatahelps.org/api/v1/administration/projects/${projectId}/participants/${participantId}`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
