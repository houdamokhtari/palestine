-- Create the table
CREATE TABLE qa_palestine (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_en TEXT NOT NULL,
  question_ar TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_ar TEXT NOT NULL
);

-- Example data
INSERT INTO qa_palestine (question_en, question_ar, answer_en, answer_ar) VALUES
('What is Al-Aqsa Mosque?', 'ما هو المسجد الأقصى؟', 'Al-Aqsa Mosque is the third holiest site in Islam, located in Jerusalem.', 'المسجد الأقصى هو ثالث أقدس موقع في الإسلام، ويقع في القدس.'),
('Where is Gaza?', 'أين تقع غزة؟', 'Gaza is a Palestinian city on the eastern Mediterranean coast.', 'غزة هي مدينة فلسطينية تقع على الساحل الشرقي للبحر الأبيض المتوسط.'),
('What is the capital of Palestine?', 'ما هي عاصمة فلسطين؟', 'Jerusalem is considered the capital of Palestine.', 'القدس تعتبر عاصمة فلسطين.'),
('What is the West Bank?', 'ما هي الضفة الغربية؟', 'The West Bank is a landlocked territory near the Mediterranean coast of Western Asia, forming part of Palestine.', 'الضفة الغربية هي منطقة داخلية تقع قرب ساحل البحر المتوسط في غرب آسيا، وتشكل جزءًا من فلسطين.'),
('What is the Gaza Strip?', 'ما هو قطاع غزة؟', 'The Gaza Strip is a small region on the Mediterranean coast that is part of the State of Palestine.', 'قطاع غزة هو منطقة صغيرة على ساحل البحر المتوسط وتُعد جزءًا من دولة فلسطين.'),
('Who are the Palestinians?', 'من هم الفلسطينيون؟', 'Palestinians are the Arab people who originate from the land of Palestine.', 'الفلسطينيون هم الشعب العربي الذي ينحدر من أرض فلسطين.'),
('When was Palestine occupied?', 'متى تم احتلال فلسطين؟', 'Palestine was occupied in stages, most significantly in 1948 and 1967.', 'تم احتلال فلسطين على مراحل، وأهمها في عامي 1948 و1967.'),
('What is the Nakba?', 'ما هي النكبة؟', 'The Nakba refers to the 1948 catastrophe when hundreds of thousands of Palestinians were displaced.', 'النكبة تشير إلى كارثة عام 1948 عندما تم تهجير مئات الآلاف من الفلسطينيين.'),
('What is the Palestinian flag?', 'ما هو علم فلسطين؟', 'The Palestinian flag has black, white, green stripes with a red triangle on the left.', 'علم فلسطين يتكون من ثلاثة ألوان أفقية: الأسود، الأبيض، والأخضر، مع مثلث أحمر على الجانب الأيسر.'),
('What is the Dome of the Rock?', 'ما هو قبة الصخرة؟', 'The Dome of the Rock is an Islamic shrine located on the Temple Mount in Jerusalem.', 'قبة الصخرة هي مزار إسلامي يقع في المسجد الأقصى في القدس.'),
('Is Palestine recognized as a state?', 'هل فلسطين دولة معترف بها؟', 'Yes, over 130 UN members recognize Palestine as a state.', 'نعم، أكثر من 130 دولة عضو في الأمم المتحدة تعترف بدولة فلسطين.'),
('What is the Balfour Declaration?', 'ما هو وعد بلفور؟', 'The Balfour Declaration was a 1917 statement by Britain supporting a Jewish homeland in Palestine.', 'وعد بلفور هو بيان صدر عام 1917 من بريطانيا يدعم إقامة وطن قومي لليهود في فلسطين.'),
('Who governs Gaza?', 'من يحكم غزة؟', 'Gaza is currently governed by Hamas.', 'تُحكم غزة حاليًا من قبل حركة حماس.'),
('What languages are spoken in Palestine?', 'ما هي اللغات المحكية في فلسطين؟', 'Arabic is the official language. English and Hebrew are also used.', 'العربية هي اللغة الرسمية، وتُستخدم أيضًا الإنجليزية والعبرية.'),
('What religions exist in Palestine?', 'ما هي الديانات الموجودة في فلسطين؟', 'Islam, Christianity, and Judaism are present in Palestine.', 'توجد في فلسطين ديانات الإسلام والمسيحية واليهودية.'),
('What is the significance of Jerusalem?', 'ما هي أهمية القدس؟', 'Jerusalem is a holy city for Muslims, Christians, and Jews.', 'القدس مدينة مقدسة للمسلمين والمسيحيين واليهود.'),
('What is the Intifada?', 'ما هي الانتفاضة؟', 'The Intifada was a Palestinian uprising against Israeli occupation.', 'الانتفاضة كانت ثورة فلسطينية ضد الاحتلال الإسرائيلي.'),
('What is the Oslo Accords?', 'ما هي اتفاقية أوسلو؟', 'The Oslo Accords were peace agreements between Israel and the PLO in the 1990s.', 'اتفاقية أوسلو هي اتفاقيات سلام بين إسرائيل ومنظمة التحرير الفلسطينية في التسعينات.'),
('What is the right of return?', 'ما هو حق العودة؟', 'It is the right of Palestinian refugees to return to their original homes.', 'هو حق اللاجئين الفلسطينيين في العودة إلى منازلهم الأصلية.'),
('What is the situation in Palestine now?', 'ما هو الوضع الحالي في فلسطين؟', 'The situation remains tense with ongoing occupation and resistance.', 'الوضع لا يزال متوترًا مع استمرار الاحتلال والمقاومة.');
