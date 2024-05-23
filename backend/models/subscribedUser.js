// models/subscribedUser.js
import mongoose from 'mongoose';

const subscribedUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
},
{
  timestamps:true
}
);

const SubscribedUser = mongoose.model('SubscribedUser', subscribedUserSchema);

export default SubscribedUser;
