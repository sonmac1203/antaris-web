import { Schema, models, model } from 'mongoose';

const surveySchema = new Schema({
  project_id: { type: String, default: '' },
  mdh_id: { type: String, default: '' },
  name: { type: String, default: '' },
  display_name: { type: String, default: '' },
  description: { type: String, default: '' },
  alexa_completed: { type: Boolean, default: false },
  content: [
    {
      type: { type: String, default: '' },
      text: { type: String, default: '' },
      title: { type: String, default: '' },
      identifier: { type: String, default: '' },
      completed: { type: Boolean, default: false },
      _id: false,
    },
  ],
  assigned_to: [
    {
      participant: { type: Schema.Types.ObjectId, ref: 'Participant' },
      completed: { type: Boolean, default: false },
      assigned_at: { type: Date, default: Date.now() },
      _id: false,
    },
  ],
});

const Survey = models?.Survey || model('Survey', surveySchema);

export default Survey;
