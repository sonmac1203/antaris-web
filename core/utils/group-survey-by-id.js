export const groupSurveyById = (surveys) => {
  const groupedSurveys = surveys.reduce((acc, survey) => {
    const {
      surveyID,
      participantID,
      participantIdentifier,
      surveyName,
      surveyDisplayName,
      surveyDescription,
    } = survey;
    const group = acc.find((group) => group.surveyID === surveyID);

    if (group) {
      group.participants.push({
        participantID,
        participantIdentifier,
      });
    } else {
      acc.push({
        surveyID,
        surveyName,
        surveyDisplayName,
        surveyDescription,
        participants: [{ participantID, participantIdentifier }],
      });
    }

    return acc;
  }, []);
  return groupedSurveys;
};
