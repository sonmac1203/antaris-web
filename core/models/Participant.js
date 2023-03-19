import { Schema, models, model } from 'mongoose';

const participantSchema = new Schema({
  participant_identifier: { type: String, default: '' },
  secondary_identifider: { type: String, default: '' },
  project_id: { type: String, default: '' },
  alexa_metadata: {
    skill_id: { type: String, default: '' },
    user_id: { type: String, default: '' },
    account_linked: { type: Boolean, default: false },
    skill_enabled: { type: Boolean, default: false },
    proactive_access_token: { type: String, default: '' },
    proactive_refresh_token: { type: String, default: '' },
    proactive_token_expires_at: Date,
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

export default Participant;
