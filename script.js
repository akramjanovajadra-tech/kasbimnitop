
"use strict";

// =====================================================
// KASBIMNI TOP
// Muallif va bajaruvchi: Akramjonova Jadra Maratovna
// =====================================================

const $ = id => document.getElementById(id);

const dimensions = {
    people: "Muloqot va insonlar bilan ishlash",
    logic: "Mantiqiy va tahliliy fikrlash",
    creative: "Ijodkorlik va kreativlik",
    tech: "Texnologik qobiliyat",
    practical: "Amaliy va texnik mahorat",
    nature: "Tabiat va atrof-muhitga qiziqish",
    leadership: "Yetakchilik va boshqaruv",
    care: "G‘amxo‘rlik va yordam berish"
};

let user = {
    firstName: "",
    lastName: "",
    age: 0
};

let currentQuestion = 0;
let answers = [];


// =====================================================
// 1. TEST SAVOLLARI
// =====================================================

const questions = [

{
    category: "QIZIQISHLAR",
    text: "Bo‘sh vaqtingizda qaysi mashg‘ulot bilan shug‘ullanishni afzal ko‘rasiz?",
    options: [
        ["Odamlar bilan suhbatlashish va ularga yordam berish", {people:2, care:2}],
        ["Murakkab masalalar va jumboqlarni yechish", {logic:2, tech:1}],
        ["Rasm chizish, dizayn yoki yangi g‘oyalar yaratish", {creative:2, practical:1}],
        ["Qurilmalar, texnologiyalar yoki tajribalar bilan shug‘ullanish", {tech:2, practical:2}]
    ]
},

{
    category: "BILIM VA FAN",
    text: "Qaysi fan yoki yo‘nalish sizni ko‘proq qiziqtiradi?",
    options: [
        ["Biologiya, tibbiyot va inson salomatligi", {care:2, nature:2}],
        ["Matematika, fizika va mantiq", {logic:2, tech:1}],
        ["San'at, adabiyot va dizayn", {creative:2, people:1}],
        ["Informatika, robototexnika va texnologiya", {tech:2, practical:1}]
    ]
},

{
    category: "MUAMMOLARNI HAL QILISH",
    text: "Murakkab muammoga duch kelganingizda qanday yo‘l tutasiz?",
    options: [
        ["Avval insonlarning fikrini tinglayman", {people:2, care:1}],
        ["Ma'lumotlarni yig‘ib, tahlil qilaman", {logic:2, tech:1}],
        ["Noodatiy yechimlar o‘ylab topaman", {creative:2, leadership:1}],
        ["Amaliy tajriba orqali yechishga harakat qilaman", {practical:2, tech:1}]
    ]
},

{
    category: "ISH USLUBI",
    text: "Qanday muhitda ishlash sizga yoqadi?",
    options: [
        ["Odamlar bilan doimiy muloqotda", {people:2, care:1}],
        ["Tinch va tahlil qilishga qulay muhitda", {logic:2, tech:1}],
        ["Erkin, ijodiy va yangi g‘oyalarga boy muhitda", {creative:2, leadership:1}],
        ["Laboratoriya, ustaxona yoki texnik muhitda", {practical:2, tech:1}]
    ]
},

{
    category: "QOBILIYATLAR",
    text: "Atrofingizdagilar sizning qaysi xususiyatingizni ko‘proq qadrlashadi?",
    options: [
        ["Boshqalarni tushunish va tinglashimni", {people:2, care:2}],
        ["Tez fikrlash va muammoni tahlil qilishimni", {logic:2, tech:1}],
        ["Yangicha fikrlarim va tasavvurimni", {creative:2, leadership:1}],
        ["Ishni amalda bajarish va tashkil qilishimni", {practical:2, leadership:1}]
    ]
},

{
    category: "QAROR QABUL QILISH",
    text: "Muhim qaror qabul qilishda nimaga ko‘proq tayanasiz?",
    options: [
        ["Insonlarning ehtiyojlari va his-tuyg‘ulariga", {people:1, care:2}],
        ["Dalillar, raqamlar va mantiqqa", {logic:2, tech:1}],
        ["Tasavvurim va yangi imkoniyatlarga", {creative:2, leadership:1}],
        ["Tajriba va amaliy natijalarga", {practical:2, logic:1}]
    ]
},

{
    category: "JAMOA BILAN ISHLASH",
    text: "Jamoaviy loyihada qaysi vazifani tanlaysiz?",
    options: [
        ["Jamoa a'zolarini qo‘llab-quvvatlash", {people:2, care:1}],
        ["Tadqiqot va hisob-kitoblarni bajarish", {logic:2, tech:1}],
        ["Loyiha ko‘rinishi va g‘oyasini ishlab chiqish", {creative:2, practical:1}],
        ["Jamoani boshqarish va ishlarni taqsimlash", {leadership:2, people:1}]
    ]
},

{
    category: "KELAJAK MAQSADLARI",
    text: "Kelajakdagi faoliyatingizda qaysi natijaga erishishni istaysiz?",
    options: [
        ["Odamlarning hayotini yaxshilash", {care:2, people:2}],
        ["Ilmiy yangilik yoki muhim kashfiyot qilish", {logic:2, nature:1}],
        ["O‘z ijodiy mahsulotimni yaratish", {creative:2, leadership:1}],
        ["Yangi texnologiya yoki qurilma yaratish", {tech:2, practical:2}]
    ]
},

{
    category: "MAS'ULIYAT",
    text: "Sizga qanday mas'uliyatni ishonib topshirishlarini istaysiz?",
    options: [
        ["Insonlar bilan ishlash va ularga maslahat berish", {people:2, care:2}],
        ["Muhim ma'lumotlar va tahlillar uchun javobgarlik", {logic:2, tech:1}],
        ["Yangi loyiha va g‘oyalar uchun javobgarlik", {creative:2, leadership:1}],
        ["Texnik jarayon va uskunalar uchun javobgarlik", {practical:2, tech:1}]
    ]
},

{
    category: "TADQIQOT",
    text: "Qaysi faoliyat sizni ko‘proq hayajonlantiradi?",
    options: [
        ["Inson organizmi va salomatligini o‘rganish", {care:2, nature:2}],
        ["Murakkab hodisalarning sababini aniqlash", {logic:2, nature:1}],
        ["Yangi mahsulot yoki dizayn yaratish", {creative:2, tech:1}],
        ["Mexanizmlar va qurilmalarning ishlashini o‘rganish", {tech:2, practical:2}]
    ]
},

{
    category: "MULOQOT",
    text: "Yangi tanishlar bilan muloqot qilishga munosabatingiz qanday?",
    options: [
        ["Juda yoqadi, suhbatni oson boshlayman", {people:2, leadership:1}],
        ["Avval kuzataman, keyin fikrimni bildiraman", {logic:1, people:1}],
        ["G‘oyalarimni muhokama qilishni yoqtiraman", {creative:1, people:2}],
        ["Ko‘proq amaliy ishlarni afzal ko‘raman", {practical:2, tech:1}]
    ]
},

{
    category: "IJODKORLIK",
    text: "Sizga yangi loyiha topshirilsa, birinchi navbatda nima qilasiz?",
    options: [
        ["Kimga qanday foyda berishini o‘ylayman", {people:2, care:1}],
        ["Reja va tahlil tayyorlayman", {logic:2, leadership:1}],
        ["Bir nechta original g‘oyalar yarataman", {creative:2, leadership:1}],
        ["Ishlaydigan namuna tayyorlashga kirishaman", {practical:2, tech:1}]
    ]
},

{
    category: "TABIAT",
    text: "Tabiat va ekologik muammolarga munosabatingiz qanday?",
    options: [
        ["Tabiatni asrashda insonlar bilan ishlashni xohlayman", {nature:2, people:1}],
        ["Ekologik ma'lumotlarni o‘rganish qiziq", {nature:2, logic:1}],
        ["Ekologik loyihalar uchun ijodiy yechimlar yarataman", {nature:1, creative:2}],
        ["Tabiatga yordam beradigan texnologiyalar yaratishni istayman", {nature:2, tech:2}]
    ]
},

{
    category: "TASHABBUS",
    text: "Agar o‘z loyihangizni boshlash imkoniyati bo‘lsa, qaysi yo‘nalishni tanlaysiz?",
    options: [
        ["Ta'lim yoki ijtimoiy yordam loyihasi", {care:2, people:2}],
        ["Tahlil va tadqiqot markazi", {logic:2, tech:1}],
        ["Dizayn yoki ijodiy studiya", {creative:2, leadership:1}],
        ["Texnologik yoki muhandislik markazi", {tech:2, practical:2}]
    ]
},

{
    category: "QAT'IYAT",
    text: "Qiyin vazifa uzoq vaqt davom etsa, qanday yo‘l tutasiz?",
    options: [
        ["Boshqalardan maslahat va yordam olaman", {people:1, care:2}],
        ["Muammoni kichik qismlarga ajrataman", {logic:2, leadership:1}],
        ["Yangi usul va yondashuvlarni sinab ko‘raman", {creative:2, practical:1}],
        ["Amaliy mashqni davom ettiraman", {practical:2, tech:1}]
    ]
},

{
    category: "TEXNOLOGIYA",
    text: "Sun'iy intellekt va robotlar rivojlanishiga munosabatingiz qanday?",
    options: [
        ["Ularni insonlarga yordam berishda ishlatishni istayman", {people:1, care:2}],
        ["Ularning ishlash tamoyillarini tahlil qilish qiziq", {logic:2, tech:1}],
        ["Ulardan yangi ijodiy mahsulotlar yaratishda foydalanaman", {creative:2, tech:1}],
        ["Ularni yaratish, sozlash va boshqarishni xohlayman", {tech:2, practical:2}]
    ]
},

{
    category: "YORDAM BERISH",
    text: "Biror inson qiyinchilikka duch kelsa, qanday yordam berasiz?",
    options: [
        ["Uni tinglayman va ruhiy qo‘llab-quvvatlayman", {care:2, people:2}],
        ["Vaziyatni tahlil qilib, sababini topaman", {logic:2, people:1}],
        ["Unga vaziyatdan chiqishning yangi yo‘llarini taklif qilaman", {creative:2, care:1}],
        ["Muammoni amaliy hal qilishga yordam beraman", {practical:2, care:1}]
    ]
},

{
    category: "TASHKILOTCHILIK",
    text: "Tadbir yoki katta loyihani tashkil qilish sizga yoqadimi?",
    options: [
        ["Odamlar bilan kelishib ishlash menga yoqadi", {people:2, leadership:1}],
        ["Reja, jadval va jarayonlarni tuzishni yoqtiraman", {logic:2, leadership:1}],
        ["Tadbirning g‘oyasi va ko‘rinishini ishlab chiqaman", {creative:2, leadership:1}],
        ["Texnik ishlarni nazorat qilishni afzal ko‘raman", {tech:1, practical:2}]
    ]
},

{
    category: "ISH MUHITI",
    text: "Quyidagi joylardan qaysi birida ishlashni istardingiz?",
    options: [
        ["Shifoxona, ta'lim yoki maslahat markazi", {care:2, people:2}],
        ["Ilmiy laboratoriya yoki tadqiqot markazi", {logic:2, nature:1}],
        ["Ijodiy studiya yoki loyiha markazi", {creative:2, leadership:1}],
        ["Muhandislik laboratoriyasi yoki texnik markaz", {tech:2, practical:2}]
    ]
},

{
    category: "O‘RGANISH",
    text: "Yangi bilimlarni qanday o‘rganishni afzal ko‘rasiz?",
    options: [
        ["Ustoz bilan suhbat va amaliy muloqot orqali", {people:2, care:1}],
        ["Kitob, nazariya va tahlil orqali", {logic:2, tech:1}],
        ["Mustaqil izlanish va tajriba orqali", {creative:2, logic:1}],
        ["Qurish, sinash va amalda bajarish orqali", {practical:2, tech:1}]
    ]
},

{
    category: "QADRIYATLAR",
    text: "Siz uchun kasb tanlashda eng muhim jihat qaysi?",
    options: [
        ["Insonlarga foyda keltirish", {care:2, people:2}],
        ["Bilim, ilm-fan va murakkab masalalar", {logic:2, nature:1}],
        ["Erkinlik va ijodiy imkoniyatlar", {creative:2, leadership:1}],
        ["Yangi texnologiyalar va amaliy natijalar", {tech:2, practical:2}]
    ]
},

{
    category: "FAOLIYAT",
    text: "Qaysi vazifani bajarish sizga ko‘proq yoqadi?",
    options: [
        ["O‘quvchi, bemor yoki mijoz bilan ishlash", {people:2, care:2}],
        ["Hisoblash, tahlil qilish va xulosa chiqarish", {logic:2, tech:1}],
        ["Loyiha, konsepsiya va dizayn ishlab chiqish", {creative:2, leadership:1}],
        ["Uskuna, mexanizm yoki tajriba bilan ishlash", {practical:2, tech:1}]
    ]
},

{
    category: "KELAJAK",
    text: "Kelajakda qaysi rolni bajarishni istaysiz?",
    options: [
        ["Odamlarga yo‘l ko‘rsatuvchi mutaxassis", {people:2, care:2}],
        ["Ilmiy va texnik muammolarni hal qiluvchi mutaxassis", {logic:2, tech:2}],
        ["Yangi g‘oyalar yaratuvchi ijodkor", {creative:2, leadership:1}],
        ["Murakkab tizimlarni yaratuvchi muhandis", {tech:2, practical:2}]
    ]
},

{
    category: "SHAXSIY RIVOJLANISH",
    text: "Qaysi mahoratingizni yanada rivojlantirishni istaysiz?",
    options: [
        ["Muloqot, tinglash va insonlarni tushunish", {people:2, care:2}],
        ["Tahlil, mantiq va tadqiqot", {logic:2, nature:1}],
        ["Ijodkorlik va yangi g‘oyalar yaratish", {creative:2, leadership:1}],
        ["Texnik bilim va amaliy mahorat", {tech:2, practical:2}]
    ]
},

{
    category: "YAKUNIY TANLOV",
    text: "Quyidagi natijalardan qaysi biri sizga eng katta mamnuniyat beradi?",
    options: [
        ["Bir insonning hayotida ijobiy o‘zgarish qilish", {care:2, people:2}],
        ["Murakkab muammoning yechimini topish", {logic:2, tech:1}],
        ["Odamlar foydalanadigan original mahsulot yaratish", {creative:2, leadership:1}],
        ["Ishlaydigan texnik tizim yoki qurilma yaratish", {tech:2, practical:2}]
    ]
}

];


// =====================================================
// 2. KASBLAR BAZASI
// =====================================================

function career(name, category, weights, risk, description, human, skills, roadmap) {
    return {name, category, weights, risk, description, human, skills, roadmap};
}

const careers = [

career("Shifokor","Tibbiyot",{care:3,people:3,logic:2,practical:2},"Nisbatan past","Inson salomatligini tekshiradi, kasalliklarni aniqlaydi va davolash rejasini tuzadi.","Klinik qarorlar, bemor bilan muloqot va individual mas'uliyat muhim.",["Biologiya","Kimyo","Tibbiy bilimlar","Muloqot"],["Biologiya va kimyoni o‘rganish","Tibbiyot oliygohiga tayyorlanish","Klinik amaliyot"]),

career("Jarroh","Tibbiyot",{care:2,logic:3,practical:3,people:2},"Nisbatan past","Murakkab tibbiy operatsiyalarni rejalashtiradi va bajaradi.","Nozik qo‘l mahorati va yuqori mas'uliyat talab etiladi.",["Biologiya","Kimyo","Anatomiya","Aniqlik"],["Tibbiyot ta'limini olish","Jarrohlik bo‘yicha ixtisoslashish","Klinik tayyorgarlik"]),

career("Klinik psixolog","Psixologiya",{people:3,care:3,logic:2,leadership:1},"Nisbatan past","Insonlarning ruhiy holati va psixologik muammolarini o‘rganadi.","Ishonch, empatiya va kasbiy mas'uliyat muhim.",["Psixologiya","Biologiya","Muloqot","Tinglash"],["Psixologiya asoslari","Oliy ta'lim","Nazorat ostidagi amaliyot"]),

career("Maxsus pedagog","Ta'lim",{people:3,care:3,creative:2,leadership:1},"Nisbatan past","Turli ta'limiy ehtiyojlarga ega bolalarning rivojlanishiga yordam beradi.","Har bir o‘quvchiga moslashish muhim.",["Pedagogika","Psixologiya","Muloqot","Kuzatuvchanlik"],["Pedagogika","Maxsus pedagogika","Amaliy mashg‘ulotlar"]),

career("Logoped","Tibbiyot va ta'lim",{people:3,care:3,logic:1,creative:2},"Nisbatan past","Nutq va talaffuz bilan bog‘liq qiyinchiliklarni bartaraf etishga yordam beradi.","Individual mashg‘ulotlar va inson bilan bevosita ishlash muhim.",["Logopediya","Psixologiya","Tilshunoslik","Muloqot"],["Nutq rivojlanishi","Logopediya ta'limi","Amaliy mashg‘ulotlar"]),

career("Fizioterapevt","Tibbiyot",{care:3,people:2,practical:3,logic:1},"Nisbatan past","Jismoniy tiklanish jarayonida bemorlarga yordam beradi.","Bemor holatini kuzatish va individual mashqlarni moslashtirish muhim.",["Biologiya","Anatomiya","Fiziologiya","Muloqot"],["Biologiya","Fizioterapiya ta'limi","Klinik amaliyot"]),

career("Ergoterapevt","Tibbiyot",{care:3,people:2,creative:2,practical:2},"Nisbatan past","Insonlarning kundalik faoliyatga qaytishi va mustaqilligini rivojlantirishga yordam beradi.","Individual yechimlar zarur.",["Biologiya","Psixologiya","Reabilitatsiya","Kuzatuvchanlik"],["Biologiya","Ergoterapiya ta'limi","Reabilitatsiya amaliyoti"]),

career("Veterinar","Veterinariya",{care:3,nature:2,practical:2,logic:2},"Nisbatan past","Hayvonlarning salomatligini tekshiradi va davolaydi.","Hayvonlarni kuzatish va klinik qarorlar muhim.",["Biologiya","Kimyo","Zoologiya","Tibbiy amaliyot"],["Biologiya va kimyo","Veterinariya ta'limi","Klinik amaliyot"]),

career("Arxitektor","Arxitektura",{creative:3,logic:2,practical:2,leadership:1,people:1},"O‘rta","Binolar va makonlarni loyihalashtiradi.","Xavfsizlik, inson ehtiyojlari va murakkab loyiha qarorlari muhim.",["Matematika","Chizmachilik","Fizika","3D loyihalash"],["Chizmachilik","Arxitektura ta'limi","Portfolio"]),

career("Qurilish muhandisi","Muhandislik",{logic:3,practical:3,tech:2,leadership:1},"Nisbatan past","Bino va inshootlarning mustahkamligi va xavfsizligini loyihalaydi.","Real sharoitdagi nazorat va xavfsizlik muhim.",["Matematika","Fizika","Muhandislik","Chizmachilik"],["Matematika va fizika","Muhandislik ta'limi","Amaliy loyihalar"]),

career("Robototexnika muhandisi","Texnologiya",{tech:3,practical:3,logic:2,creative:1},"O‘rta","Robotlar va avtomatlashtirilgan qurilmalarni loyihalaydi va takomillashtiradi.","Real tizimlarni sinash va integratsiya qilish muhim.",["Fizika","Matematika","Dasturlash","Elektronika"],["Matematika va fizika","Dasturlash va elektronika","Robototexnika loyihalari"]),

career("Mexatronika muhandisi","Texnologiya",{tech:3,practical:3,logic:2,creative:1},"O‘rta","Mexanika, elektronika va dasturlashni birlashtirgan tizimlar bilan ishlaydi.","Uskunalarni sozlash va sinash muhim.",["Fizika","Matematika","Elektronika","Dasturlash"],["Fizika","Elektronika","Amaliy muhandislik loyihalari"]),

career("Kiberxavfsizlik mutaxassisi","Axborot texnologiyalari",{tech:3,logic:3,practical:1,leadership:1},"O‘rta","Tashkilotlarning axborot tizimlari va ma'lumotlarini himoya qiladi.","Yangi tahdidlarga moslashish va xavfsizlik qarorlari muhim.",["Dasturlash","Tarmoq texnologiyalari","Axborot xavfsizligi","Tahlil"],["Kompyuter tarmoqlari","Dasturlash","Xavfsizlik loyihalari"]),

career("AI xavfsizligi mutaxassisi","Sun'iy intellekt",{tech:3,logic:3,people:1,leadership:1},"O‘rta","Sun'iy intellekt tizimlarining ishonchliligi va xavfsizligini o‘rganadi.","Yangi xavflarni baholash va inson nazorati muhim.",["Matematika","Dasturlash","AI asoslari","Xavfsizlik"],["Matematika va dasturlash","AI asoslari","AI xavfsizligi loyihalari"]),

career("AI etikasi mutaxassisi","Sun'iy intellekt",{people:2,logic:3,leadership:2,tech:1},"Nisbatan past","AI tizimlarining adolatliligi, maxfiyligi va jamiyatga ta'sirini baholaydi.","Etik mulohaza, huquqiy kontekst va inson manfaatlari muhim.",["Falsafa","Huquq","Texnologiya","Tahlil"],["Etika va huquq","AI texnologiyalari","AI boshqaruvi loyihalari"]),

career("Qayta tiklanuvchi energiya muhandisi","Energetika",{tech:2,practical:3,logic:2,nature:3},"O‘rta","Quyosh, shamol va boshqa energiya tizimlarini loyihalaydi.","Real obyektlar va muhandislik qarorlari muhim.",["Fizika","Matematika","Energetika","Ekologiya"],["Fizika va matematika","Energetika muhandisligi","Energiya loyihalari"]),

career("Ekologik muhandis","Ekologiya",{nature:3,logic:2,tech:2,practical:2},"O‘rta","Atrof-muhit muammolarini muhandislik yechimlari bilan kamaytiradi.","Mahalliy sharoit va ekologik oqibatlarni baholash muhim.",["Biologiya","Kimyo","Ekologiya","Muhandislik"],["Tabiiy fanlar","Ekologik muhandislik","Dala amaliyoti"]),

career("UX tadqiqotchisi","Dizayn va texnologiya",{people:3,logic:2,creative:2,tech:1},"O‘rta","Raqamli mahsulotlardan foydalanuvchilarning ehtiyojlarini o‘rganadi.","Bevosita foydalanuvchilar bilan suhbat muhim.",["Psixologiya","Tadqiqot","Dizayn","Muloqot"],["Foydalanuvchi tajribasi","Tadqiqot usullari","UX loyihalari"]),

career("Mahsulot dizayneri","Dizayn va texnologiya",{creative:3,people:2,tech:2,logic:2},"O‘rta","Inson ehtiyojlariga mos raqamli yoki jismoniy mahsulotlarni loyihalashtiradi.","Ijod, foydalanuvchi ehtiyojlari va mahsulot maqsadlarini uyg‘unlashtirish zarur.",["Dizayn","Psixologiya","UX/UI","Texnologiya"],["Dizayn asoslari","UX/UI","Portfolio"]),

career("Kreativ direktor","Ijodiy soha",{creative:3,leadership:3,people:2,logic:1},"Nisbatan past","Ijodiy jamoalarning g‘oyalarini boshqaradi.","Strategik tasavvur va jamoa boshqaruvi muhim.",["Dizayn","Marketing","Muloqot","Boshqaruv"],["Ijodiy ko‘nikmalar","Portfolio","Loyiha boshqaruvi"]),

career("Tadbirkor","Biznes",{leadership:3,creative:2,people:2,logic:2},"O‘rta","Yangi biznes g‘oyalarni amalga oshiradi va resurslarni boshqaradi.","Noaniqlikda qaror qabul qilish va insonlar bilan ishlash muhim.",["Biznes","Moliya","Marketing","Muloqot"],["Biznes asoslari","Kichik loyiha","Bozorni o‘rganish"]),

career("Loyiha menejeri","Boshqaruv",{leadership:3,people:3,logic:2,tech:1},"O‘rta","Jamoa, muddat va resurslarni muvofiqlashtiradi.","Muzokara va kutilmagan vaziyatlarni boshqarish muhim.",["Menejment","Muloqot","Rejalashtirish","Tahlil"],["Boshqaruv asoslari","Loyiha usullari","Amaliy loyihalar"]),

career("Yurist","Huquq",{logic:3,people:2,leadership:2,care:1},"O‘rta","Huquqiy masalalarni tahlil qiladi va mijoz manfaatlarini himoya qiladi.","Huquqiy talqin, muzokara va mas'uliyat muhim.",["Huquq","Mantiq","Nutq","Tahlil"],["Huquq asoslari","Yuridik ta'lim","Amaliyot"]),

career("Mediator","Huquq va muloqot",{people:3,care:2,logic:2,leadership:2},"Nisbatan past","Nizolashayotgan tomonlarga kelishuvga erishishda yordam beradi.","Betaraflik va insonlar o‘rtasidagi murakkab muloqot muhim.",["Huquq","Psixologiya","Muzokara","Muloqot"],["Huquq va muloqot","Mediatsiya tayyorgarligi","Amaliy muzokaralar"]),

career("Ilmiy tadqiqotchi","Ilm-fan",{logic:3,nature:2,tech:2,creative:2},"O‘rta","Ilmiy savollarni o‘rganadi va yangi bilimlar yaratadi.","Original savollar va ilmiy mas'uliyat muhim.",["Matematika","Tabiiy fanlar","Tadqiqot","Tahlil"],["Tanlangan fan","Tadqiqot metodlari","Ilmiy loyihalar"]),

career("Shaharsozlik mutaxassisi","Shaharsozlik",{creative:2,logic:2,people:2,nature:2,leadership:1},"O‘rta","Shahar va hududlarning qulay va barqaror rivojlanishini rejalashtiradi.","Aholi ehtiyojlari va uzoq muddatli qarorlar muhim.",["Geografiya","Matematika","Arxitektura","Ekologiya"],["Geografiya","Shaharsozlik ta'limi","Hududiy loyihalar"]),

career("Agrar texnologiyalar mutaxassisi","Qishloq xo‘jaligi",{nature:3,tech:2,practical:2,logic:2},"O‘rta","Qishloq xo‘jaligida samarali texnologiyalarni qo‘llaydi.","Mahalliy tuproq, iqlim va ishlab chiqarish sharoitlariga moslashish muhim.",["Biologiya","Kimyo","Texnologiya","Ekologiya"],["Tabiiy fanlar","Agrar texnologiyalar","Dala tajribalari"]),

career("Favqulodda vaziyatlar mutaxassisi","Xavfsizlik",{leadership:2,practical:3,logic:2,people:2,care:1},"Nisbatan past","Favqulodda holatlarga tayyorgarlik va xavfsizlik ishlarini tashkil qiladi.","Tezkor baholash va real sharoitda qaror qabul qilish muhim.",["Fizika","Geografiya","Xavfsizlik","Boshqaruv"],["Xavfsizlik asoslari","Maxsus tayyorgarlik","Amaliy mashg‘ulotlar"])

];


// =====================================================
// 3. ERKIN JAVOBNI TAHLIL QILISH
// =====================================================

// Kalit so‘zlar asosida taxminiy yo‘nalish ballari.
// Keyinchalik API orqali tabiiy tilni tushunish qo‘shiladi.

const keywordGroups = {
    people: [
        "odam", "inson", "suhbat", "muloqot", "jamoa",
        "gaplash", "uchrash", "tinglash", "mijoz", "bola",
        "o‘rgat", "orgat", "dars", "ustoz"
    ],

    care: [
        "yordam", "g‘amxo", "gamxo", "davol", "shifo",
        "salomat", "kasal", "ruhiy", "qo‘llab", "qullab",
        "himoya", "parvarish"
    ],

    logic: [
        "matematika", "hisob", "tahlil", "mantiq",
        "tadqiq", "izlan", "ilm", "masala", "yechim",
        "raqam", "formula", "hisobla"
    ],

    creative: [
        "dizayn", "rasm", "ijod", "g‘oya", "goya",
        "chiz", "yarat", "loyiha", "san'at", "tasavvur",
        "video", "montaj", "bezat"
    ],

    tech: [
        "kompyuter", "dastur", "kod", "texnolog",
        "robot", "sun'iy", "ai", "elektron", "internet",
        "kiber", "server", "mobil", "qurilma"
    ],

    practical: [
        "yasash", "ta'mir", "tamir", "qurish", "sozlash",
        "sinash", "amaliy", "mexanizm", "uskun", "montaj",
        "laboratoriya"
    ],

    nature: [
        "tabiat", "hayvon", "o‘simlik", "osimlik",
        "ekolog", "daraxt", "atrof-muhit", "qishloq",
        "biolog", "veterinar", "iqlim"
    ],

    leadership: [
        "boshqar", "rahbar", "tashkil", "yetakchi",
        "lider", "tadbirkor", "biznes", "rejalashtir",
        "nazorat", "qaror"
    ]
};


function analyzeFreeAnswer(text) {

    const normalized = text.toLowerCase();

    const result = {};

    Object.keys(dimensions).forEach(key => {
        result[key] = 0;
    });

    let totalMatches = 0;

    Object.entries(keywordGroups).forEach(([dimension, words]) => {

        words.forEach(word => {

            if (normalized.includes(word)) {
                result[dimension] += 2;
                totalMatches++;
            }

        });

    });

    // Bitta javob haddan tashqari ko‘p ball bermasligi uchun cheklov.

    Object.keys(result).forEach(key => {
        result[key] = Math.min(result[key], 4);
    });

    // Hech qanday kalit so‘z topilmasa, bu javobni
    // avtomatik ravishda biror kasbga bog‘lamaymiz.

    return {
        scores: result,
        recognized: totalMatches > 0
    };
}


// =====================================================
// 4. BO‘LIMLARNI ALMASHTIRISH
// =====================================================

const sections = [
    "homeSection",
    "aboutSection",
    "profileSection",
    "quizSection",
    "resultSection"
];

function showSection(sectionId) {

    sections.forEach(id => {
        $(id).classList.remove("active");
    });

    $(sectionId).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function goHome() {
    showSection("homeSection");
}

function showAbout() {
    showSection("aboutSection");
}

function showProfile() {
    showSection("profileSection");
}


// =====================================================
// 5. FOYDALANUVCHI MA'LUMOTLARI
// =====================================================

$("profileForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const firstName = $("firstName").value.trim();
    const lastName = $("lastName").value.trim();
    const age = Number($("userAge").value);

    if (!firstName || !lastName || !Number.isInteger(age) || age < 10 || age > 100) {
        alert("Iltimos, ma'lumotlarni to‘g‘ri kiriting.");
        return;
    }

    user = {firstName, lastName, age};

    currentQuestion = 0;

    answers = new Array(questions.length).fill(null);

    showSection("quizSection");

    renderQuestion();
});


// =====================================================
// 6. SAVOLLARNI CHIQARISH
// =====================================================

function renderQuestion() {

    const question = questions[currentQuestion];

    $("questionCount").textContent =
        String(currentQuestion + 1).padStart(2, "0") +
        " / " + questions.length;

    const progress = Math.round(
        ((currentQuestion + 1) / questions.length) * 100
    );

    $("progressPercent").textContent = progress + "%";
    $("progressBar").style.width = progress + "%";

    $("questionCategory").textContent = question.category;
    $("questionText").textContent = question.text;

    $("prevButton").disabled = currentQuestion === 0;
    $("prevButton").style.opacity = currentQuestion === 0 ? ".4" : "1";

    const container = $("optionsContainer");

    container.innerHTML = "";

    const letters = ["A", "B", "C", "D"];

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "option";

        if (answers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        const letter = document.createElement("span");
        letter.className = "option-letter";
        letter.textContent = letters[index];

        const text = document.createElement("span");
        text.textContent = option[0];

        button.append(letter, text);

        button.addEventListener("click", () => {
            selectOption(index);
        });

        container.appendChild(button);
    });


    // BOSHQA JAVOB

    const otherButton = document.createElement("button");

    otherButton.type = "button";
    otherButton.className = "option other-option";

    if (answers[currentQuestion] === "other") {
        otherButton.classList.add("selected");
    }

    const otherLetter = document.createElement("span");
    otherLetter.className = "option-letter";
    otherLetter.textContent = "E";

    const otherText = document.createElement("span");
    otherText.textContent = "Boshqa javob — o‘z fikrimni yozaman";

    otherButton.append(otherLetter, otherText);

    otherButton.addEventListener("click", () => {

        answers[currentQuestion] = "other";

        renderQuestion();

    });

    container.appendChild(otherButton);


    // ERKIN JAVOB MAYDONI

    if (answers[currentQuestion] === "other") {

        const answerBox = document.createElement("div");

        answerBox.className = "other-answer-box";

        const label = document.createElement("label");

        label.textContent = "Sizning shaxsiy javobingiz:";

        const textarea = document.createElement("textarea");

        textarea.className = "other-answer-input";
        textarea.placeholder = "Fikringizni shu yerga yozing...";
        textarea.maxLength = 500;
        textarea.rows = 4;

        textarea.value = answers[currentQuestion + "_text"] || "";

        const hint = document.createElement("p");

        hint.className = "other-hint";
        hint.textContent = "Javobingiz 500 belgigacha bo‘lishi mumkin.";

        textarea.addEventListener("input", () => {

            answers[currentQuestion + "_text"] = textarea.value;

            updateNextButton();

        });

        answerBox.append(label, textarea, hint);

        container.appendChild(answerBox);

    }

    updateNextButton();
}


// =====================================================
// 7. KEYINGI TUGMA HOLATI
// =====================================================

function updateNextButton() {

    const selected = answers[currentQuestion];

    let valid = false;

    if (typeof selected === "number") {
        valid = true;
    }

    if (selected === "other") {

        const text = answers[currentQuestion + "_text"] || "";

        valid = text.trim().length >= 3;
    }

    $("nextButton").disabled = !valid;

    $("nextButton").textContent =
        currentQuestion === questions.length - 1
            ? "Natijani ko‘rish ✦"
            : "Keyingi →";
}


// =====================================================
// 8. JAVOB TANLASH
// =====================================================

function selectOption(index) {

    answers[currentQuestion] = index;

    renderQuestion();
}


// =====================================================
// 9. KEYINGI SAVOL
// =====================================================

function nextQuestion() {

    if (answers[currentQuestion] === null) {
        alert("Iltimos, javob variantini tanlang.");
        return;
    }

    if (answers[currentQuestion] === "other") {

        const text = answers[currentQuestion + "_text"] || "";

        if (text.trim().length < 3) {
            alert("Iltimos, o‘z javobingizni yozing.");
            return;
        }
    }

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        renderQuestion();

    } else {

        calculateResults();
    }
}


// =====================================================
// 10. OLDINGI SAVOL
// =====================================================

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();
    }
}


// =====================================================
// 11. JAVOBLARNI TAHLIL QILISH
// =====================================================

function calculateScores() {

    const scores = {};

    Object.keys(dimensions).forEach(key => {
        scores[key] = 0;
    });

    answers.forEach((answerIndex, questionIndex) => {

        // Oddiy javob.

        if (typeof answerIndex === "number") {

            const selectedOption =
                questions[questionIndex].options[answerIndex];

            Object.entries(selectedOption[1]).forEach(([key, value]) => {

                scores[key] += value;

            });

        }

        // Foydalanuvchining erkin javobi.

        if (answerIndex === "other") {

            const freeText = answers[questionIndex + "_text"] || "";

            const analysis = analyzeFreeAnswer(freeText);

            Object.entries(analysis.scores).forEach(([key, value]) => {

                scores[key] += value;

            });

        }

    });

    return scores;
}


// =====================================================
// 12. KASBLARGA MOSLIK
// =====================================================

function calculateCareerMatch(scores, careerData) {

    const maxScore = Math.max(
        ...Object.values(scores),
        1
    );

    let weightedTotal = 0;
    let weightTotal = 0;

    Object.entries(careerData.weights).forEach(([key, weight]) => {

        const normalized = scores[key] / maxScore;

        weightedTotal += normalized * weight;

        weightTotal += weight;

    });

    if (!weightTotal) return 0;

    return Math.min(
        100,
        Math.round((weightedTotal / weightTotal) * 100)
    );
}


// =====================================================
// 13. ASOSIY YO‘NALISH
// =====================================================

const directionInfo = {

    people: {
        title: "Insonlar bilan ishlash",
        description: "Siz muloqot, hamkorlik, insonlarni tushunish va jamoada ishlashga moyilsiz. Ta'lim, psixologiya va insonlarga xizmat ko‘rsatish yo‘nalishlari sizga qiziqarli bo‘lishi mumkin."
    },

    logic: {
        title: "Tahlil va ilm-fan",
        description: "Siz ma'lumotlarni tahlil qilish, muammolarni yechish va murakkab jarayonlarni tushunishga moyilsiz."
    },

    creative: {
        title: "Ijod va innovatsiya",
        description: "Siz yangi g‘oyalar, original yechimlar va loyihalar yaratishga qiziqasiz."
    },

    tech: {
        title: "Texnologiya va muhandislik",
        description: "Siz zamonaviy texnologiyalar, qurilmalar va texnik tizimlarga qiziqasiz."
    },

    practical: {
        title: "Amaliy faoliyat",
        description: "Siz nazariyadan tashqari amaliy natija yaratishni yoqtirasiz."
    },

    nature: {
        title: "Tabiat va ekologiya",
        description: "Siz tabiat, biologiya va atrof-muhit bilan bog‘liq jarayonlarga qiziqasiz."
    },

    leadership: {
        title: "Yetakchilik va boshqaruv",
        description: "Siz tashabbus ko‘rsatish, jamoani birlashtirish va loyihalarni boshqarishga moyilsiz."
    },

    care: {
        title: "G‘amxo‘rlik va yordam",
        description: "Siz insonlarning ehtiyojlarini tushunish va ularga foyda keltirishni qadrlaysiz."
    }

};


// =====================================================
// 14. XAVFSIZ HTML
// =====================================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];

    });
}


// =====================================================
// 15. QOBILIYATLAR XARITASI
// =====================================================

function renderStrengths(sortedDimensions) {

    const container = $("strengthResults");

    container.innerHTML = "";

    const maxValue = Math.max(
        ...sortedDimensions.map(item => item[1]),
        1
    );

    sortedDimensions.forEach(([key, value]) => {

        const percentage = Math.round(
            (value / maxValue) * 100
        );

        const item = document.createElement("div");

        item.className = "strength-item";

        const info = document.createElement("div");

        info.className = "strength-info";

        const name = document.createElement("span");
        name.textContent = dimensions[key];

        const score = document.createElement("span");
        score.textContent = percentage + " / 100";

        info.append(name, score);

        const track = document.createElement("div");
        track.className = "strength-track";

        const fill = document.createElement("div");
        fill.className = "strength-fill";
        fill.style.width = percentage + "%";

        track.appendChild(fill);

        item.append(info, track);

        container.appendChild(item);

    });
}


// =====================================================
// 16. NATIJALARNI CHIQARISH
// =====================================================

function calculateResults() {

    const scores = calculateScores();

    const sortedDimensions = Object.entries(scores)
        .sort((a, b) => b[1] - a[1]);

    const mainDimension = sortedDimensions[0][0];

    const info = directionInfo[mainDimension];

    const results = careers.map(careerData => ({

        ...careerData,

        match: calculateCareerMatch(scores, careerData)

    })).sort((a, b) => b.match - a.match);

    showResults(results.slice(0, 5), sortedDimensions, info);
}


// =====================================================
// 17. TOP 5 NATIJALAR
// =====================================================

function showResults(topCareers, sortedDimensions, info) {

    $("resultName").textContent =
        user.firstName + " " + user.lastName +
        " | " + user.age + " yosh";

    $("mainDirection").textContent = info.title;

    $("directionDescription").textContent = info.description;

    renderStrengths(sortedDimensions);

    const container = $("careerResults");

    container.innerHTML = "";

    topCareers.forEach((item, index) => {

        const card = document.createElement("article");

        card.className = "career-card";

        const skills = item.skills
            .map(skill => `<li>${escapeHTML(skill)}</li>`)
            .join("");

        const roadmap = item.roadmap
            .map(step => `<li>${escapeHTML(step)}</li>`)
            .join("");

        const riskClass =
            item.risk === "O‘rta" ? "medium" : "";

        card.innerHTML = `

            <div class="career-top">

                <div>
                    <span class="career-rank">TOP 0${index + 1}</span>

                    <h4>${escapeHTML(item.name)}</h4>

                    <span class="career-category">
                        ${escapeHTML(item.category)}
                    </span>
                </div>

                <div>
                    <div class="match-number">${item.match}%</div>
                    <div class="match-label">Moslik balli</div>
                </div>

            </div>

            <p class="career-description">
                ${escapeHTML(item.description)}
            </p>

            <div class="risk-row">
                <span>Avtomatlashtirish xavfi:</span>

                <span class="risk-badge ${riskClass}">
                    ${escapeHTML(item.risk)}
                </span>
            </div>

            <details class="career-details">

                <summary>Kasb haqida batafsil</summary>

                <p>
                    <strong>Insonning roli:</strong>
                    ${escapeHTML(item.human)}
                </p>

                <p><strong>Kerakli ko‘nikmalar:</strong></p>

                <ul>${skills}</ul>

                <p><strong>Rivojlanish yo‘li:</strong></p>

                <ul>${roadmap}</ul>

            </details>
        `;

        container.appendChild(card);

    });

    showSection("resultSection");
}


// =====================================================
// 18. TESTNI QAYTA BOSHLASH
// =====================================================

function restartTest() {

    currentQuestion = 0;

    answers = new Array(questions.length).fill(null);

    showSection("quizSection");

    renderQuestion();
}


// =====================================================
// 19. DASTLABKI TEKSHIRUVLAR
// =====================================================

function runChecks() {

    console.assert(questions.length === 24, "24 ta savol bo‘lishi kerak.");

    console.assert(careers.length === 28, "28 ta kasb bo‘lishi kerak.");

    console.assert(
        questions.every(q => q.options.length === 4),
        "Har bir savolda 4 ta asosiy variant bo‘lishi kerak."
    );

    console.assert(
        careers.every(c => c.name && c.weights && c.roadmap),
        "Kasblar ma'lumotlari to‘liq bo‘lishi kerak."
    );

    console.assert(
        analyzeFreeAnswer("Men odamlarga yordam berishni yaxshi ko‘raman")
            .scores.care > 0,
        "Erkin javob tahlili ishlashi kerak."
    );

    console.log("KASBIMNI TOP tekshiruvi yakunlandi.");
    console.log("Savollar:", questions.length);
    console.log("Kasblar:", careers.length);
}

runChecks();

console.log(
    "Loyiha muallifi va bajaruvchisi: Akramjonova Jadra Maratovna"
);
