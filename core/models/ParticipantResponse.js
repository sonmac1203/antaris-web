import { Schema, models, model } from 'mongoose';

const participantResponseSchema = new Schema({
  project_id: { type: String, default: '' },
  responded_by: { type: Schema.Types.ObjectId, ref: 'Participant' },
  responded_to: { type: Schema.Types.ObjectId, ref: 'Survey' },
  content: [
    {
      question_text: { type: String, default: '' },
      question_identifier: { type: String, default: '' },
      answer_text: { type: String, default: '' },
      provided_at: { type: Date, default: Date.now() },
      _id: false,
    },
  ],
  started_at: { type: Date, default: Date.now() },
  completed_at: Date,
  completed: { type: Boolean, default: false },
});

const ParticipantResponse =
  models?.ParticipantResponse ||
  model('ParticipantResponse', participantResponseSchema);

export default ParticipantResponse;
