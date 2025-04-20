const express = require('express');
const router = express.Router();

// قاعدة بيانات بسيطة من الأسئلة والأجوبة (عربي + إنجليزي)
const qaData = [
  { q: "ما هي عاصمة فلسطين؟", a: "عاصمة فلسطين هي القدس." },
  { q: "What is the capital of Palestine?", a: "The capital of Palestine is Jerusalem." },
  { q: "متى احتلت فلسطين؟", a: "احتلت فلسطين في عام 1948." },
  { q: "When was Palestine occupied?", a: "Palestine was occupied in 1948." },
  { q: "ما هي غزة؟", a: "غزة هي جزء من الأراضي الفلسطينية تقع على ساحل البحر المتوسط." },
  { q: "What is Gaza?", a: "Gaza is a part of the Palestinian territories located on the Mediterranean coast." },
  { q: "ما هو المسجد الأقصى؟", a: "هو أحد أقدس المساجد في الإسلام ويقع في القدس." },
  { q: "What is Al-Aqsa Mosque?", a: "It is one of the holiest mosques in Islam, located in Jerusalem." },
  { q: "كم عدد اللاجئين الفلسطينيين؟", a: "يوجد أكثر من 5 ملايين لاجئ فلسطيني حول العالم." },
  { q: "How many Palestinian refugees are there?", a: "There are more than 5 million Palestinian refugees worldwide." },
  // أضف المزيد هنا...
];

// Route: POST /api/ask-palestine
router.post('/', (req, res) => {
  const userQuestion = req.body.question?.toLowerCase().trim();

  const match = qaData.find(item =>
    item.q.toLowerCase().trim() === userQuestion
  );

  if (match) {
    res.json({ answer: match.a });
  } else {
    res.json({ answer: "عذرًا، لا أملك إجابة على هذا السؤال حاليًا." });
  }
});

module.exports = router;
