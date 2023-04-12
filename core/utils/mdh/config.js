// const BASE_URI = process.env.BASE_MDH_API_URI;
const BASE_URI = 'https://designer.mydatahelps.org';

export const getAuthRoute = () => BASE_URI + '/identityserver/connect/token';

export const getServiceSurveyRoute = (projectId) =>
  BASE_URI + `/api/v1/administration/projects/${projectId}/surveytasks`;

export const getServiceOneParticipantRoute = (projectId, id) =>
  BASE_URI + `/api/v1/administration/projects/${projectId}/participants/${id}`;

export const getServiceAllParticipantsRoute = (projectId) =>
  BASE_URI + `/api/v1/administration/projects/${projectId}/participants`;

export const getServiceParticipantRoute = (projectId, id) =>
  BASE_URI +
  `/api/v1/administration/projects/${projectId}/participants${
    id ? `/${id}` : ''
  }`;

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
