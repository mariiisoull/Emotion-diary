import express from "express";
import Emotion from "../models/Emotion.js"; // модель эмоций
import auth from "../middleware/auth.js";    // твой middleware для JWT

const router = express.Router();

// =======================
// 📌 СОХРАНЕНИЕ/ОБНОВЛЕНИЕ ЭМОЦИИ
// =======================
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, mainEmotion, additionalEmotions } = req.body;

    if (!date || !mainEmotion) {
      return res.status(400).json({ success: false, message: "Не указана дата или эмоция" });
    }

    // Проверяем, есть ли запись на эту дату
    let emotion = await Emotion.findOne({ userId, date });

    if (emotion) {
      // Обновляем существующую запись
      emotion.mainEmotion = mainEmotion;
      emotion.additionalEmotions = additionalEmotions || [];
      await emotion.save();
    } else {
      // Создаём новую запись
      emotion = new Emotion({
        userId,
        date,
        mainEmotion,
        additionalEmotions: additionalEmotions || [],
      });
      await emotion.save();
    }

    res.json({ success: true, message: "Эмоция сохранена" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

// =======================
// 📌 УДАЛЕНИЕ ЭМОЦИИ
// =======================
router.delete("/:date", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ success: false, message: "Не указана дата" });
    }

    await Emotion.findOneAndDelete({ userId, date });

    res.json({ success: true, message: "Эмоция удалена" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

export default router;
