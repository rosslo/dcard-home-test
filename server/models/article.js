import mongoose from 'mongoose';
const { Schema } = mongoose;

const Article = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  like: {type: Number, default: 0},
  dislike: {type: Number, default: 0},
  date: {type: Date, required: true, default: Date.now}
});

mongoose.model('Article', Article);