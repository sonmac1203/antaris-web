import axios from 'axios';
import jwt from 'jwt-simple';

const secret = 'antarissecret';

export const getAccessToken = async (serviceAccountId, projectId) => {
  try {
    const { data } = await axios.get('/api/mdh/get_access_token', {
      params: { serviceAccountId: serviceAccountId, projectId: projectId },
    });
    const auth_token = jwt.encode({ mdh_id: serviceAccountId }, secret);
    return { ...data, auth_token };
  } catch (error) {
    console.log('HA');
    console.log(error);
    return error.response.data;
  }
};
