import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Material from "./models/Material.js";

dotenv.config();

// Подключение к MongoDB без устаревших опций
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Путь к JSON
const filePath = path.resolve("./data/materials.json");

// Читаем JSON
const materials = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Загружаем в базу
const loadMaterials = async () => {
  try {
    // Очистка коллекции перед загрузкой
    await Material.deleteMany({});
    
    // Вставка материалов
    await Material.insertMany(materials);
    console.log("Материалы загружены!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

loadMaterials();
