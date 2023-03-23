import { Schema, models, model } from 'mongoose';

const serviceAccountSchema = new Schema({
  project_id: String,
  mdh_id: String,
  access_token: String,
  token_expires_at: Date,
  last_accessed: { type: Date, default: Date.now() },
});

const ServiceAccount =
  models?.ServiceAccount || model('ServiceAccount', serviceAccountSchema);

export default ServiceAccount;
