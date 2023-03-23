import { Schema, models, model } from 'mongoose';
import Participant from './Participant';
import Survey from './Survey';

const participantResponseSchema = new Schema({
  responded_by: { type: Schema.Types.ObjectId, ref: 'Participant' },
  responded_to: { type: Schema.Types.ObjectId, ref: 'Survey' },
  content: [
    {
      text: { type: String, default: '' },
      identifier: { type: String, default: '' },
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
