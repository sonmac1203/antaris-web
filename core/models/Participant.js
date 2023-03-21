import { Schema, models, model } from 'mongoose';

const participantSchema = new Schema({
  participant_identifier: { type: String, default: '' },
  secondary_identifier: { type: String, default: '' },
  project_id: { type: String, default: '' },
  amazon_email: { type: String, default: '' },
  alexa_metadata: {
    skill_id: { type: String, default: process.env.SKILL_ID },
    user_id: { type: String, default: '' },
    account_linked: { type: Boolean, default: true },
    skill_enabled: { type: Boolean, default: true },
    assigned_surveys: [
      {
        survey: { type: Schema.Types.ObjectId, ref: 'Survey' },
        assigned_at: Date,
        completed: { type: Boolean, default: false },
      },
    ],
  },
});

const Participant =
  models.Participant || model('Participant', participantSchema);

module.exports = Participant;
