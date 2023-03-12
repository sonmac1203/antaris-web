import mongoClientPromise from '@/core/db/mongoClient';
import axios from 'axios';

export default async function handler(req, res) {
  const mongoClient = await mongoClientPromise;
  const query = req.query;

  try {
    const existingSurvey = await mongoClient
      .db()
      .collection('Surveys')
      .findOne(query);

    if (existingSurvey) {
      return res.status(201).json({
        success: true,
        message: 'Survey was found in database.',
        data: {
          ...query,
          assigned_at: existingSurvey.assigned_at,
          alexa_status: existingSurvey.alexa_status,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Survey was not found in database.',
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: 'There was an error. Please try again.',
    });
  }
}
