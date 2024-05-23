// models/blog.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  is_posted:{
    type:Boolean,
    default:false,

  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
},

{
    timestamps:true
}
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
