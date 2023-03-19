import { Schema, models, model } from 'mongoose';
import Participant from './Participant';
import Survey from './Survey';

const participantResponseSchema = new Schema({
  responded_by: { type: Schema.Types.ObjectId, ref: 'Participant' },
  responded_to: { type: Schema.Types.ObjectId, ref: 'Survey' },
  content: { type: [], default: [] },
  started_at: Date,
  completed_at: Date,
  completed: { type: Boolean, default: false },
});

const ParticipantResponse =
  models.ParticipantResponse ||
  model('ParticipantResponse', participantResponseSchema);

module.exports = ParticipantResponse;
