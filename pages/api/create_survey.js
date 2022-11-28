import mongoClientPromise from '@/core/db/mongoClient';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const mongoClient = await mongoClientPromise;
  const { researcherID, participantIDs, studyID, studyData } = req.body;
  const splittedParticipantIDs = participantIDs.split(',');

  try {
    await mongoClient.db().collection('studies').insertOne({
      antaris_id: studyID,
      added_by: researcherID,
      assigned_to: splittedParticipantIDs,
      study_data: studyData,
    });

    await mongoClient
      .db()
      .collection('researchers')
      .updateOne(
        {
          antaris_id: researcherID,
        },
        {
          $push: {
            studies: {
              antaris_id: studyID,
              assigned_to: splittedParticipantIDs,
            },
          },
        }
      );

    mongoClient
      .db()
      .collection('participants')
      .updateMany(
        {
          antaris_id: { $in: splittedParticipantIDs },
        },
        {
          $push: {
            studies: {
              antaris_id: studyID,
              added_by: researcherID,
            },
          },
        }
      );

    res.status(200).send({
      success: true,
      message: 'The study has been saved!',
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
