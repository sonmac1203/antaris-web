import axios from 'axios';
import jwt from 'jwt-simple';

const secret = 'antarissecret';

export const getAccessToken = async (serviceAccountId, projectId) => {
  try {
    const { data } = await axios.get('/api/mdh/get_access_token', {
      params: { serviceAccountId: serviceAccountId, projectId: projectId },
    });

    if (data.success) {
      const auth_token = jwt.encode({ mdh_id: serviceAccountId }, secret);
      return { ...data, auth_token };
    }
    return data;
  } catch (error) {
    return error.response.data;
  }
};
