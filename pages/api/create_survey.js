import mongoClientPromise from '../../core/db/mongoClient';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const mongoClient = await mongoClientPromise;
  const { researcherID, participantID, studyData } = req.body;

  try {
    mongoClient.db().collection('studies').insertOne({
      timestamp: new Date(),
      created_by: researcherID,
      assigned_to: participantID,
      study_data: studyData,
    });
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
