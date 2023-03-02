import mongoClientPromise from '@/core/db/mongoClient';

const generateResponseID = () =>
  '' + Math.floor(1000000 + Math.random() * 900000);

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const mongoClient = await mongoClientPromise;
  const { participantID, studyID, responseData } = req.body;
  const antaris_id = generateResponseID();

  try {
    await mongoClient.db().collection('responses').insertOne({
      antaris_id: antaris_id,
      added_by: participantID,
      to_study: studyID,
      response_data: responseData,
    });

    await mongoClient
      .db()
      .collection('participants')
      .updateOne(
        {
          antaris_id: participantID,
        },
        {
          $push: {
            responses: {
              antaris_id: antaris_id,
              to_study: studyID,
            },
          },
        }
      );

    res.status(200).send({
      success: true,
      message: 'The responses have been saved!',
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: 'An error happened while saving the study. Please try again!',
      error: err,
    });
  }
};

export default handler;
