import { Schema, models, model } from 'mongoose';

const surveySchema = new Schema({
  project_id: { type: String, default: '' },
  mdh_id: { type: String, default: '' },
  name: { type: String, default: '' },
  display_name: { type: String, default: '' },
  description: { type: String, default: '' },
  alexa_completed: { type: Boolean, default: false },
  content: {
    imported_at: { type: Date, default: Date.now() },
    questions: [
      {
        type: { type: String, default: '' },
        text: { type: String, default: '' },
        title: { type: String, default: '' },
        identifier: { type: String, default: '' },
        _id: false,
      },
    ],
  },
  assigned_to: {
    type: [
      {
        progress: { type: Number, default: 0 },
        participant: { type: Schema.Types.ObjectId, ref: 'Participant' },
        completed: { type: Boolean, default: false },
        assigned_at: { type: Date, default: Date.now() },
        notified: { type: Boolean, default: false },
        last_notified: Date,
        _id: false,
      },
    ],
    default: [],
  },
});

const Survey = models?.Survey || model('Survey', surveySchema);

export default Survey;
