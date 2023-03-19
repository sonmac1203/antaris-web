import { Schema, models, model } from 'mongoose';

const surveySchema = new Schema({
  project_id: { type: String, default: '' },
  mdh_id: { type: String, default: '' },
  name: { type: String, default: '' },
  display_name: { type: String, default: '' },
  description: { type: String, default: '' },
  alexa_completed: { type: Boolean, default: false },
  content: { type: [], default: [] },
  assigned_to: [
    {
      participant: { type: Schema.Types.ObjectId, ref: 'Participant' },
      assigned_at: Date,
      completed: { type: Boolean, default: false },
    },
  ],
});

const Survey = models.Survey || model('Survey', surveySchema);

export default Survey;
