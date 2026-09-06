/* ==========================================================================
   💖 ANNIVERSARY WEBSITE CONFIGURATION FILE (ไฟล์ตั้งค่าเว็บไซต์)
   แก้ไขข้อมูลความรักของคุณที่นี่ เพื่อเปลี่ยนข้อความ รูปภาพ วันที่ เพลง และรหัสผ่าน
   ========================================================================== */

const CONFIG = {
  // 🔒 รหัสผ่านเข้าเว็บไซต์ (Passcode Protection)
  security: {
    enabled: true, // ตั้งเป็น true เพื่อให้ต้องกรอกรหัสก่อนเข้าเว็บ, false เพื่อปิด
    password: "060826", // รหัสผ่านเข้าเว็บ (เช่น 060826 หรือ 1234)
    hintTh: "คำใบ้: วันที่เราตกลงเป็นแฟนกัน ",
    hintEn: "Hint: Our official anniversary date (DDMMYY)"
  },

  // 📩 ระบบรับข้อความตอบกลับจากแฟน (ส่งตรงเข้าอีเมลของคุณฟรีผ่าน Formspree หรือกดแชร์เข้า LINE)
  replyService: {
    enabled: false, // เปลี่ยนเป็น true หากสมัคร Formspree.io แล้วต้องการรับข้อความเข้าอีเมล
    formspreeUrl: "", // ใส่ URL จาก Formspree ฟรี เช่น "https://formspree.io/f/xabcdefg"
    lineShareEnabled: true // แสดงปุ่มให้แฟนกดส่งข้อความที่พิมพ์เข้า LINE ของคุณได้ทันที
  },

  // 💑 ชื่อของคุณและแฟน (แสดงบนหน้าแรกและส่วนต่างๆ)
  coupleNames: "U & Me",

  // 📅 วันที่เริ่มคบกัน (รูปแบบ: YYYY-MM-DD หรือ YYYY-MM-DDTHH:mm:ss)
  // ตัวอย่าง: "2026-08-06T07:20:00" (6 สิงหาคม 2026 เวลา 07:20 น.)
  startDate: "2026-08-06T07:20:00",

  // ✍️ ชื่อผู้ส่งจดหมาย (แสดงที่ท้ายจดหมาย Love Letter)
  senderName: "Your Love ❤️",

  // 💬 ข้อความต้อนรับบน Hero Section หน้าแรก
  heroSubtitleTh: "ขอบคุณสำหรับทุกๆ วันที่เดินร่วมกัน ทุกความสุข  และความรักที่ไม่เคยน้อยลง",
  heroSubtitleEn: "Thank you for every day we walked together, every smile, and endless love.",

  // 💌 ข้อความในจดหมาย Love Letter (แบ่งเป็นย่อหน้า)
  letterTh: [
    "ขอบคุณนะสำหรับทุกช่วงเวลาที่มีเธออยู่ข้างๆ ตั้งแต่วันแรกจนถึงวันนี้ เธอคือของขวัญที่ดีที่สุดในชีวิตฉัน",
    "เค้ารักเธอมากกกเลยนะ ขอบคุณที่เข้ามาในชีวิตเค้า ทำให้เค้ามีความสุขทุกๆวันและเค้าสัญญาว่าจะไม่ทำให้เธอต้องเสียใจ💕",
    "love u mak mak naaa kubb😘💖"
  ],
  letterEn: [
    "Thank you for every second you've been by my side. From the very first day until now, you are the greatest gift in my life.",
    "Thank you for your understanding, warmth, smiles, and hugs that make every day meaningful. You brought vibrant color into my world.",
    "No matter how many years pass, our love will grow brighter every single day. Happy Anniversary, my love! 💕"
  ],

  // 🎵 ข้อมูลเพลงประกอบเว็บไซต์ (รองรับ MP3 URL, ลิงก์ YouTube, หรือ ลิงก์ Spotify)
  music: {
    title: "ณ ความรัก",
    artist: "สุดเขต จึงเจริญ feat. ปริศนา กัมพูสิริ",
    // ตัวอย่างลิงก์ที่รองรับ:
    // 1. YouTube Link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" หรือ "https://youtu.be/dQw4w9WgXcQ"
    // 2. Spotify Track: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT"
    // 3. MP3 Audio URL: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
    url: "https://youtu.be/_JCdhSVEFKw?list=RD_JCdhSVEFKw"
  },

  // 📖 เรื่องราวความรัก (Love Story Timeline)
  timeline: [
    {
      date: "19 พฤษภาคม 2026",
      titleTh: "วันแรกที่เราได้พบกัน ",
      titleEn: "The Day We First Met ",
      descTh: "จุดเริ่มต้นเล็กๆ ที่เปลี่ยนโลกทั้งใบให้สดใส รอยยิ้มแรกวันนั้นยังคงติดอยู่ในหัวใจเสมอ",
      descEn: "The sweet beginning that changed everything. That first smile is forever carved in my heart.",
      icon: "💖"
    },
    {
      date: "6 สิงหาคม 2026",
      titleTh: "วันที่เราตกลงเป็นแฟนกัน 💍",
      titleEn: "Officially Together 💍",
      descTh: "คำตกลงที่เปลี่ยนสองชีวิตให้กลายเป็นคำว่า 'เรา' สัญญาว่าจะดูแลกันและกันอย่างดีที่สุด",
      descEn: "The promise that changed 'you and me' into 'us'. Promising to cherish each other every day.",
      icon: "💌"
    },
    {
      date: "8 สิงหาคม 2026",
      titleTh: "วันวันเกิดเค้าา",
      titleEn: "Birthday card",
      descTh: "เธอทำการ์ดวันเกิดให้เค้าด้วยย น่ารักมากกอะ",
      descEn: "She made a birthday card for me, so cute.",
      icon: "💌"
    },
    {
      date: "21 สิงหาคม 2026",
      titleTh: "เดทแรก💕",
      titleEn: "Our Special First Date ☕",
      descTh: "เราไปกินหมาล่าด้วยกันน เค้าไม่คิดว่าเธอจะกินนเยอะมากกแต่ก็น่ารักดีนะ เค้าชอบ😘 📍สถานที่: ร้านหมาล่าหลังมอ",
      descEn: "Our first date having Mala hotpot together! Cute memories.",
      icon: "🌹"
    },
    {
      date: "30 สิงหาคม 2026",
      titleTh: "เดทครั้งที่สองของเรา💕",
      titleEn: "Our Second Date ☕",
      descTh: "เธอพึ่งเลิกจากงานของมหาลัยแล้วเค้าชวนเธอไปกินข้าวเราไปกินปลาต้มผักกาดดอง อร่อยมากกๆๆเพราะมีเธอกินด้วย 📍สถานที่: The mall งามวงศ์วาน",
      descEn: "Our second date enjoying pickled fish dish at The Mall Ngamwongwan.",
      icon: "🌹"
    },
    {
      date: "วันนี้ & ตลอดไป",
      titleTh: "วันนี้และวันต่อๆ ไป ✨",
      titleEn: "Today & Forever ✨",
      descTh: "ไม่ว่าจะผ่านไปกี่ปี ความรักของเราก็จะยังเติบโตและงดงามยิ่งขึ้นเรื่อยๆ",
      descEn: "No matter how many years pass, our love will grow brighter and more beautiful every single day.",
      icon: "🎉"
    }
  ],

  // 📸 รูปภาพและวิดีโอในแกลเลอรี (รองรับ URL รูปจากเว็บอื่น, ไฟล์ MP4, หรือลิงก์ YouTube Video)
  gallery: [
    {
      type: "video",
      src: "https://cdn.discordapp.com/attachments/1506702021632462939/1544762342649233478/Screen_Recording_2026-09-03_003258.mp4?ex=6a9e4cca&is=6a9cfb4a&hm=3ab498fece3c671fb751a8c67bd9017cd628dc342ec6b01a47e01ffe6f86ff97&", // สามารถใช้ลิงก์วิดีโอ MP4 หรือ YouTube URL ได้
      poster: "https://i.pinimg.com/736x/53/47/29/5347291a3cebf46797630d6df1d57897.jpg", // รูปหน้าปกวิดีโอ (ถ้ามี)
      captionTh: "เล่น Roblox ด้วยกันน",
      captionEn: "Playing Roblox together",
      category: "funny"
    },
    {
      type: "video",
      src: "https://cdn.discordapp.com/attachments/1317057674256584726/1546183408281985094/Screen_Recording_2026-09-06_224014.mp4?ex=6a9edb03&is=6a9d8983&hm=c808898e1a851b1533b477290aaebffcda2260cbb6558e93afa9d3b547994ffa&", // สามารถใช้ลิงก์วิดีโอ MP4 หรือ YouTube URL ได้
      poster: "https://i.pinimg.com/736x/53/47/29/5347291a3cebf46797630d6df1d57897.jpg", // รูปหน้าปกวิดีโอ (ถ้ามี)
      captionTh: "วันเกิดเค้าเธอให้",
      captionEn: "Our sweet memory video 🎥",
      category: "birthday"
    },
    {
      type: "video",
      src: "https://drive.google.com/file/d/1WzPUi0HFayPxWWjg3vI4rQNs85OgPBvF/view?usp=sharing", // สามารถใช้ลิงก์วิดีโอ MP4 หรือ YouTube URL ได้
      poster: "https://i.pinimg.com/736x/aa/5b/45/aa5b4598fcecd7b420250f8dfb389c44.jpg", // รูปหน้าปกวิดีโอ (ถ้ามี)
      captionTh: "เล่นเกม how to fish ด้วยยกัน",
      captionEn: "Playing how to fish together",
      category: "funny"
    },
    {
      type: "image",
      src: "https://cdn.discordapp.com/attachments/1317057674256584726/1546179652823949382/IMG_6589.png?ex=6a9ed783&is=6a9d8603&hm=0539469403cac9c6a1c6d77f7a4ee3c5a4931d66b0aed0b1dfe031fb0f7d491a&",
      captionTh: "Second our date at the mall ",
      captionEn: "The keeper of my heart",
      category: "date"
    },
    {
      type: "image",
      src: "https://media.discordapp.net/attachments/1506702021632462939/1542240695392145523/Messenger_creation_B9FB75C9-FD4C-4302-99E5-E662C7873EAE.jpg?ex=6a9e5ad3&is=6a9d0953&hm=084f79e62fba823b158c5f9004f1492d6eba3800b6843e442c733b521e37e03c&=&format=webp&width=1604&height=902",
      captionTh: "เล่นเกม how to fish ด้วยยกัน ",
      captionEn: "Playing how to fish together",
      category: "funny"
    }
  ]
};

// Export to global scope
window.ANNIVERSARY_CONFIG = CONFIG;
