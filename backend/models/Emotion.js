import mongoose from 'mongoose';

const EmotionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  date: {
    type: String,
    required: true
  },

  mainEmotion: {
    emoji: String,
    text: String,
    value: Number
  },

  additionalEmotions: [
    {
      emoji: String,
      text: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Emotion', EmotionSchema);
