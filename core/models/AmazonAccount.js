import { Schema, models, model } from 'mongoose';

const amazonAccountSchema = new Schema({
  name: String,
  email: String,
  lwa_access_token: String,
  lwa_refresh_token: String,
  lwa_token_expires_at: Date,
  alexa_metadata: {
    skill_id: { type: String, default: process.env.SKILL_ID },
    user_id: { type: String, default: '' },
    account_linked: { type: Boolean, default: false },
    skill_enabled: { type: Boolean, default: false },
    project_id: { type: String, default: '' },
    alexa_access_token: { type: String, default: '' },
    alexa_refresh_token: { type: String, default: '' },
    alexa_token_expires_at: Date,
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Participant',
        default: [],
      },
    ],
  },
});

const AmazonAccount =
  models?.AmazonAccount || model('AmazonAccount', amazonAccountSchema);

export default AmazonAccount;
