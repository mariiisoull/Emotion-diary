import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';

const router = express.Router();

// 📌 Регистрация
router.post('/register', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.json({ success: false, message: 'Заполните логин и пароль' });
    }

    const existUser = await User.findOne({ login });
    if (existUser) {
      return res.json({ success: false, message: 'Такой логин уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      login,
      password: hashedPassword
    });

    await newUser.save();
    return res.json({ success: true, message: 'Аккаунт успешно создан' });

  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Ошибка сервера' });
  }
});

// 📌 Логин
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });
    if (!user) {
      return res.json({ success: false, message: 'Пользователь не найден' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Неверный пароль' });
    }

    const token = jwt.sign(
      { id: user._id, login: user.login },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

   // Возвращаем _id пользователя как "токен"
return res.json({
  success: true,
  token,
  userId: user._id
});



  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Ошибка сервера' });
  }
});

export default router;
