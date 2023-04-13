import { getParticipantsWithAssignments } from './get-participants-with-assignments';
import { getSurveysWithAssignments } from './get-surveys-with-assignments';

export async function getRespondentsWithAssignments() {
  const resultArray = await Promise.all([
    getParticipantsWithAssignments(),
    getSurveysWithAssignments(),
  ]);

  const mergedData = resultArray.reduce((acc, curr) => {
    const key = Object.keys(curr)[0];
    return { ...acc, [key]: curr[key] };
  }, {});

  return mergedData;
}
