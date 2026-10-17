# Veb-saytni ishga tushirish va deploy qilish: Brainstorm & Discovery Notes
- **Date**: 2026-10-15
- **Status**: In Progress
- **Goal**: Najot Ta'lim landing page veb-saytini to'liq ishga tushirish, lokal va internet tarmog'iga (production/hosting) joylashtirish bo'yicha yakuniy qarorlarni qabul qilish.

---

## 📌 Executive Summary & Key Decisions
*(Doimiy yangilanib boruvchi umumiy xulosa va qabul qilingan qarorlar)*

- **Lokal server**: Sayt hozirda lokal kompyuterda `http://localhost:3000` portida muvaffaqiyatli ishga tushirildi (HTTP 200 OK).
- **Sayt turi**: Statik landing page (HTML5, Tailwind CSS, JavaScript).
- **Keyingi bosqich maqsadlari**: Internetga deploy qilish (Netlify, Vercel yoki GitHub Pages), domen ulash yoki lokal muhitda qo'shimcha funksiyalar qo'shish.

```mermaid
flowchart TD
    A[Lokal Server: http://localhost:3000 (Faol)] --> B{Keyingi reja?}
    B -->|Variant 1| C[Internetga bepul deploy: Netlify / Vercel]
    B -->|Variant 2| D[GitHub Pages orqali joylashtirish]
    B -->|Variant 3| E[Lokal test va yangi funksiyalar qo'shish]
```

---

## 💬 Q&A Log

*(Qabul qilingan javoblar bu yerga bosqichma-bosqich yozib boriladi)*

---

## 🚩 Ochiq savollar va keyingi qadamlar (Open Flags)
- [ ] Veb-saytni internetga (jonli serverga) chiqarish platformasini tanlash -> Mas'ul: Foydalanuvchi / Q1
