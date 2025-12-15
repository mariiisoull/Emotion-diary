import express from 'express';
import Material from '../models/Material.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST /api/recommendations
// Тело запроса: { emotions: ["грусть", "тревожность"] }
router.post('/', auth, async (req, res) => {
  try {
    const { emotions } = req.body;

    if (!emotions || !Array.isArray(emotions)) {
      return res.status(400).json({ success: false, message: "Эмоции не указаны" });
    }

    // Находим материалы, которые содержат хотя бы один тег из эмоций пользователя
    const materials = await Material.find({ tags: { $in: emotions } });

    res.json({ success: true, materials });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
  }
});

export default router;
