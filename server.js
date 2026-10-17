import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// .env konfiguratsiyasini yuklash
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// JSON va URL-encoded ma'lumotlarni qabul qilish
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik fayllarni (HTML, CSS, JS, rasmlar) ulash
app.use(express.static(__dirname));

/**
 * HTML xavfsizligi: Telegram HTML rejimida maxsus belgilarni tozalash
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * GET /api/status - Server va Bot konfiguratsiyasi holati
 */
app.get('/api/status', (req, res) => {
  dotenv.config({ override: true });
  const isConfigured = Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
  res.json({
    status: 'ok',
    botConfigured: isConfigured,
    message: isConfigured
      ? "Telegram bot to'liq sozlangan va arizalarni qabul qilishga tayyor."
      : ".env faylida TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID kiritilmagan!"
  });
});

/**
 * POST /api/send-lead - Saytdagi arizani qabul qilib Telegram botga jo'natish
 */
app.post('/api/send-lead', async (req, res) => {
  try {
    // .env fayl o'zgartirilgan bo'lsa, avtomatik yangilash (serverni qayta ishga tushirish shart emas)
    dotenv.config({ override: true });

    const { name, phone, course, message } = req.body;

    // 1. Validatsiya
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Ism va familiya kiritilishi shart!" });
    }
    if (!phone || !phone.trim() || phone.trim().length < 9) {
      return res.status(400).json({ success: false, message: "Telefon raqami to'liq kiritilishi shart!" });
    }
    if (!course || !course.trim()) {
      return res.status(400).json({ success: false, message: "Qiziqqan kursni tanlash shart!" });
    }

    // 2. .env kalitlarini tekshirish
    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (!botToken || !chatId) {
      console.warn("⚠️ Ogohlantirish: .env faylida TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID mavjud emas!");
      return res.status(500).json({
        success: false,
        message: "Serverda Telegram Bot sozlamalari (.env) to'liq kiritilmagan. Iltimos, .env faylni tekshiring!"
      });
    }

    // 3. Telegram xabarini tayyorlash (HTML formati)
    const nowTashkent = new Date().toLocaleString('uz-UZ', {
      timeZone: 'Asia/Tashkent',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const telegramText = [
      `🎯 <b>Yangi Ariza — Najot Ta'lim Landing</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Ism:</b> ${escapeHtml(name.trim())}`,
      `📞 <b>Telefon:</b> <code>${escapeHtml(phone.trim())}</code>`,
      `📚 <b>Kurs:</b> <b>${escapeHtml(course.trim())}</b>`,
      `💬 <b>Qo'shimcha izoh:</b> ${escapeHtml(message ? message.trim() : "Mavjud emas")}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `⏰ <b>Kelgan vaqti:</b> ${nowTashkent}`,
      `🌐 <b>Manba:</b> Cyber Landing Page (Web)`
    ].join('\n');

    // 4. Telegram Bot API ga so'rov yuborish
    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramText,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();

    if (!result.ok) {
      console.error("❌ Telegram API xatosi:", result);
      return res.status(502).json({
        success: false,
        message: `Telegram API xatosi: ${result.description || "Xabar yuborilmadi"}`
      });
    }

    console.log(`✅ Yangi ariza botga yuborildi: [${name.trim()} - ${course.trim()}]`);
    return res.status(200).json({
      success: true,
      message: "Arizangiz muvaffaqiyatli qabul qilindi va mutaxassislarimizga yuborildi!"
    });

  } catch (error) {
    console.error("❌ Server xatoligi:", error);
    return res.status(500).json({
      success: false,
      message: "Serverda kutilmagan xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
    });
  }
});

// Bosh sahifa yo'naltirish
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Najot Ta'lim Landing Serveri ishga tushdi!`);
  console.log(`🌐 Manzil: http://localhost:${PORT}`);
  const configured = Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
  if (configured) {
    console.log(`🤖 Telegram Bot: SOZLANGAN ✅`);
  } else {
    console.log(`⚠️ Telegram Bot: .env faylida TOKEN yoki CHAT_ID kiritilmagan!`);
    console.log(`ℹ️ Iltimos, .env faylini ochib TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID ni kiriting.`);
  }
  console.log(`==================================================\n`);
});

export default app;
