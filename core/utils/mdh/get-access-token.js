import axios from 'axios';
import jwt from 'jwt-simple';

const secret = process.env.JWT_SECRET;

export const getAccessToken = async (serviceAccountId, projectId) => {
  try {
    const { data } = await axios.get('/api/mdh/get_access_token', {
      params: { serviceAccountId: serviceAccountId, projectId: projectId },
    });

    if (data.succcess) {
      const token = jwt.encode({ mdh_id: serviceAccountId }, secret);
      return { token, ...data };
    }
    return data;
  } catch (error) {
    console.log('error');
    return error.response.data;
  }
};
