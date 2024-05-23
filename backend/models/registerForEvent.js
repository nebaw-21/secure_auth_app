// models/registerForEvent.js
import mongoose from 'mongoose';

const registerForEventSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const RegisterForEvent = mongoose.model('RegisterForEvent', registerForEventSchema);

export default RegisterForEvent;
