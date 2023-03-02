import axios from 'axios';
import util from 'util';

const baseApiUri = process.env.BASE_MDH_API_URI;

export async function getFromApi(accessToken, resourceUrl, queryParams = {}) {
  var data = null;
  const api = axios.create({
    baseURL: baseApiUri,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
  await api
    .get(resourceUrl, { params: queryParams })
    .then(function (apiResponse) {
      if (apiResponse.status != '200') {
        logResponse(apiResponse.data);
      } else {
        data = apiResponse.data;
      }
    })
    .catch(function (error) {
      logResponse(error);
    });
  return data;
}

function logResponse(response) {
  console.log(util.inspect(response, { colors: true, depth: 3 }));
}
