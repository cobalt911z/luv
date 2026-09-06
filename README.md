# 💕 Anniversary Celebration Website

เว็บไซต์ฉลองวันครบรอบสำหรับแฟน ดีไซน์ด้วยธีมโรแมนติก สีชมพู พาสเทล และทอง (Pink + Pastel Playful + Gold Shimmer) พร้อม Glassmorphism และเอฟเฟกต์แอนิเมชันเต็มรูปแบบ

---

## 🛠️ วิธีการใช้งาน & การปรับแต่งข้อมูล (Customization)

### 1. เปลี่ยนวันที่เริ่มคบกัน
เปิดไฟล์ `index.html` หรือระบุผ่าน URL parameter:
- ตัวอย่าง: `https://<your-username>.github.io/<repo-name>/?date=2024-01-15`
- หรือปรับเปลี่ยนใน [js/timer.js](file:///c:/Users/Cobalt/Desktop/ann/js/timer.js#L10) บรรทัดที่ 10

### 2. เปลี่ยนชื่อคู่รัก
เปิดไฟล์ `index.html` แก้ไขชื่อใน `<span class="couple-names" id="coupleNamesDisplay">Alex & Pat</span>`

### 3. ใส่รูปคู่ของคุณเอง
นำไฟล์รูปภาพของคุณมาใส่ในโฟลเดอร์ `assets/images/` และอัปเดตไฟล์ `index.html` ในส่วน `#gallery`

### 4. ใส่เพลงที่มีความหมาย
นำไฟล์เพลง `.mp3` มาใส่ในโฟลเดอร์ `assets/audio/` แล้วเปลี่ยนลิงก์ในแท็ก `<audio id="bgAudio">` ใน `index.html`

---

## 🚀 วิธีเอาขึ้น GitHub Pages

1. สร้าง Repository ใหม่บน GitHub (เช่น `anniversary`)
2. Upload หรือ Push โค้ดทั้งหมดขึ้นไปยัง Repository
```bash
git init
git add .
git commit -m "Initial commit for anniversary website 💕"
git branch -M main
git remote add origin https://github.com/<your-username>/anniversary.git
git push -u origin main
```
3. ไปที่ **Settings** ของ Repository บน GitHub -> เลือกหัวข้อ **Pages**
4. ในส่วน **Build and deployment -> Source** ให้เลือก **Deploy from a branch**
5. เลือก Branch: `main` และ Folder: `/ (root)` แล้วกด **Save**
6. เว็บไซต์ของคุณจะออนไลน์ที่ `https://<your-username>.github.io/anniversary/`
