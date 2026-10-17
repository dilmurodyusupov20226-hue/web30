import dotenv from 'dotenv';
dotenv.config();

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

export default async function handler(req, res) {
  // CORS sozlamalari
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: "Faqat POST so'rovi qabul qilinadi" });
  }

  try {
    dotenv.config({ override: true });

    const { name, phone, course, message } = req.body || {};

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

    // 2. Maxfiy tokenlar
    const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

    if (!botToken || !chatId) {
      console.warn("⚠️ Ogohlantirish: TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID mavjud emas!");
      return res.status(500).json({
        success: false,
        message: "Serverda Telegram Bot sozlamalari (Environment Variables) to'liq kiritilmagan. Iltimos, Vercel sozlamalarini tekshiring!"
      });
    }

    // 3. Telegram xabar formati
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
      `🌐 <b>Manba:</b> Cyber Landing Page (Vercel Production)`
    ].join('\n');

    // 4. Telegram API ga so'rov
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

    return res.status(200).json({
      success: true,
      message: "Arizangiz muvaffaqiyatli qabul qilindi va mutaxassislarimizga yuborildi!"
    });

  } catch (error) {
    console.error("❌ Serverless Function xatoligi:", error);
    return res.status(500).json({
      success: false,
      message: "Serverda kutilmagan xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
    });
  }
}
