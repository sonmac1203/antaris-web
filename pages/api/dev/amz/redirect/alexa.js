import connectToDb from '@/core/db/connectToDb';
import AmazonAccount from '@/core/models/AmazonAccount';
import Participant from '@/core/models/Participant';
import { createAmazonService } from '@/lib/pa/amazon';
import { getExpirationTimestamp } from '@/core/utils';
import { Types } from 'mongoose';

const handler = async (req, res) => {
  // Extract alexa auth code and state from query
  const { code: alexaCode, state: stateString } = req.query;

  // Extract participant data and lwa auth code from state
  const { data: participantData, authCode: lwaCode } = JSON.parse(
    decodeURIComponent(stateString)
  );

  const { email, project_id, participants } = participantData;

  const amazonService = createAmazonService('alexa');

  // Get access token from alexa auth code
  const result = await amazonService.getAccessToken(
    alexaCode,
    'authorization_code'
  );

  // If the request failed
  if (result.hasOwnProperty('error')) {
    return res.status(307).redirect('/pa/dashboard');
  }

  // Call skill activation API
  const enablementResult = await amazonService.enableAlexaSkill(
    lwaCode,
    result.access_token
  );

  // if failed
  if (enablementResult.hasOwnProperty('message')) {
    return res.status(307).redirect('/pa/dashboard');
  }

  // Extract user from enablement result
  const { user } = enablementResult;

  await connectToDb();

  try {
    const participantDocs = [];
    for (const participant of participants) {
      const newParticipant = await Participant.create({
        _id: new Types.ObjectId(),
        ...participant,
        project_id: project_id,
        amazon_email: email,
        alexa_metadata: {
          user_id: user.id,
        },
      });
      participantDocs.push(newParticipant);
    }

    await AmazonAccount.findOneAndUpdate(
      { email: email },
      {
        $set: {
          'alexa_metadata.user_id': user.id,
          'alexa_metadata.project_id': project_id,
          'alexa_metadata.account_linked': true,
          'alexa_metadata.skill_enabled': true,
          'alexa_metadata.alexa_access_token': result.access_token,
          'alexa_metadata.alexa_refresh_token': result.refresh_token,
          'alexa_metadata.alexa_token_expires_at': getExpirationTimestamp(
            result.expires_in
          ),
        },
        $addToSet: {
          'alexa_metadata.participants': {
            $each: participantDocs.map(({ _id }) => ({
              _id,
            })),
          },
        },
      }
    );
    return res.status(307).redirect('/pa/dashboard');
  } catch (err) {
    console.log(err);
    return res.status(307).redirect('/pa/dashboard');
  }
};

export default handler;
