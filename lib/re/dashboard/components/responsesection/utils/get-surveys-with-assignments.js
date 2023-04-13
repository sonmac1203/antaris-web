import Survey from '@/core/models/Survey';

export async function getSurveysWithAssignments() {
  try {
    const surveys = await Survey.find(
      {
        assigned_to: { $exists: true, $not: { $size: 0 } },
      },
      'mdh_id display_name name'
    );

    return { surveys };
  } catch {
    return null;
  }
}
