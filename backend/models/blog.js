// models/blog.js
import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
