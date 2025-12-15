import mongoose from 'mongoose';

const MaterialSchema = new mongoose.Schema({
  type: { type: String, enum: ['article', 'video'], required: true },
  title: { type: String, required: true },
  content: { type: String }, // для статей
  url: { type: String },     // для видео
  tags: [{ type: String }], // эмоции
  cover: { type: String },   // обложка
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Material', MaterialSchema);
