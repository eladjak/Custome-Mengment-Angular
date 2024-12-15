# 🎯 מערכת ניהול לקוחות ומשימות

<img src="client/src/assets/logo.png" alt="לוגו המערכת" width="200" height="200">

> מערכת מתקדמת לניהול לקוחות ומשימות, המאפשרת מעקב אחר לקוחות ומשימות הקשורות אליהם בממשק מודרני ונוח לשימוש.

## 📋 תוכן עניינים
- [סקירה כללית](#סקירה-כללית)
- [תכונות עיקריות](#תכונות-עיקריות)
- [טכנולוגיות](#טכנולוגיות)
- [התקנה והרצה](#התקנה-והרצה)
- [מבנה הפרויקט](#מבנה-הפרויקט)
- [הערות חשובות](#הערות-חשובות)
- [אודות המפתח](#אודות-המפתח)

## 🎯 סקירה כללית

מערכת ניהול הלקוחות והמשימות היא פלטפורמה חדשנית המאפשרת:
- **ניהול לקוחות**: הוספה, עריכה ומחיקה של פרטי לקוחות
- **ניהול משימות**: מעקב אחר משימות הקשורות ללקוחות
- **ממשק משתמש**: חווית משתמש מודרנית ונוח�� בעברית
- **תמיכה מלאה ב-RTL**: ממשק מותאם לעברית

## ✨ תכונות עיקריות

### 👥 ניהול לקוחות
- **הצגת לקוחות**: טבלה מרכזית עם פרטי כל הלקוחות
- **הוספת לקוח**: טופס מובנה להוספת לקוח חדש
- **עריכת פרטים**: אפשרות לעדכון פרטי לקוח קיים
- **מחיקת לקוח**: הסרת לקוח מהמערכת

### 📝 ניהול משימות
- **הצגת משימות**: טבלה מרכזית עם כל המשימות
- **סטטוס משימות**: מעקב אחר סטטוס ביצוע
- **עדיפויות**: סימון עדיפות לכל משימה
- **תאריכי יעד**: מעקב אחר זמני ביצוע

### 🛡️ אבטחה ותשתית
- **אימות נתונים**: בדיקת תקינות קלט
- **לוגים**: תיעוד פעולות במערכת
- **שגיאות**: טיפול מובנה בשגיאות
- **CORS**: הגנה על הממשק

## 🛠️ טכנולוגיות

### Frontend
- **Angular 17**
- **Angular Material**
- **TypeScript**
- **SCSS**
- **RxJS**

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **Winston**

### DevOps
- **Git**
- **npm**
- **nodemon**

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js (גרסה 18 ומעלה)
- MongoDB (גרסה 6 ומעלה)
- Angular CLI (גרסה 17)

### שלבי התקנה

1. **שכפול הפרויקט**
   ```bash
   git clone https://github.com/eladjak/Custome-Mengment-Angular.git
   cd Custome-Mengment-Angular
   ```

2. **התקנת תלויות**
   ```bash
   npm install
   cd client && npm install
   ```

3. **הגדרת משתני סביבה**
   יש ליצור קובץ `.env` בתיקיית השורש:
   ```
   MONGODB_URI=mongodb://localhost:27017/customer-management
   PORT=3030
   ```

4. **הרצת השרת**
   ```bash
   npm run server
   ```

5. **הרצת הקליינט**
   ```bash
   npm run client
   ```

6. **גישה למערכת**
   - ממשק משתמש: `http://localhost:4200`
   - שרת API: `http://localhost:3030`

## 📁 מבנה הפרויקט

```
customer-management/
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # קומפוננטות
│   │   │   ├── services/      # שירותים
│   │   │   └── models/        # מודלים
│   │   ├── assets/           # קבצים סטטיים
│   │   └── environments/     # הגדרות סביבה
├── server/                # Node.js backend
│   ├── controllers/       # בקרים
│   ├── models/           # מודלים
│   ├── routes/           # ראוטים
│   └── services/         # שירותים
├── docs/                 # תיעוד
│   ├── development.md    # תיעוד פיתוח
│   └── api.md           # תיעוד API
└── README.md            # תיעוד ראשי
```

## ⚠️ הערות חשובות

### אבטחה
- יש להגדיר משתני סביבה בהתאם לסביבת העבודה
- מומלץ להפעיל HTTPS בסביבת הייצור
- יש לעדכן הגדרות CORS בהתאם לצורך

### ביצועים
- המערכת תומכת בדפדוף (pagination)
- טבלאות עם יכולות מיון וסינון
- אופטימיזציה לטעינת נתונים

### תחזוקה
- לוגים מפורטים בצד השרת
- טיפול בשגיאות מובנה
- קוד מתועד היטב

## 👨‍💻 אודות המפתח

### אלעד יעקובוביץ'
- **התמחות**: מפתח Full-Stack
- **הכשרה**: בוגר מכללת ג'ון ברייס
- **גיל**: 38

### פרטי התקשרות
- **אימייל**: [eladhiteclearning@gmail.com](mailto:eladhiteclearning@gmail.com)
- **לינקדאין**: [eladyaakobovitchcodingdeveloper](https://www.linkedin.com/in/eladyaakobovitchcodingdeveloper/)
- **גיטהאב**: [eladjak](https://github.com/eladjak)
- **טלפון**: 052-542-7474

## 📄 רישיון
כל הזכויות שמורות © 2024 אלעד יעקו��וביץ'