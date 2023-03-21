// const BASE_URI = process.env.BASE_MDH_API_URI;
const BASE_URI = 'https://designer.mydatahelps.org';

export const getAuthRoute = () => BASE_URI + '/identityserver/connect/token';

export const getServiceRoute = (projectId) =>
  BASE_URI + `/api/v1/administration/projects/${projectId}/surveytasks`;

export const commonHeaders = {
  formUrlEncoded: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  json: (accessToken) => ({
    Authorization: `Bearer ${accessToken}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
};

export const getSurveyRoute = () => '/api/mdh/surveys';
