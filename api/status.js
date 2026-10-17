import dotenv from 'dotenv';
dotenv.config();

export default function handler(req, res) {
  dotenv.config({ override: true });
  const isConfigured = Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
  res.status(200).json({
    status: 'ok',
    botConfigured: isConfigured,
    message: isConfigured
      ? "Telegram bot to'liq sozlangan va arizalarni qabul qilishga tayyor."
      : "Vercel Environment Variables bo'limida TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID kiritilmagan!"
  });
}
