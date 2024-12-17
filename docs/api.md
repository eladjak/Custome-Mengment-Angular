# 📚 תיעוד API

## 🌐 כללי

### Base URL

```
http://localhost:3030/api
```

### Headers

```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

### תבנית תשובה

כל התשובות מוחזרות במבנה אחיד:

```json
{
  "success": true,
  "data": {},
  "message": "string",
  "error": null
}
```

## 👥 לקוחות

### GET /customers

מחזיר רשימת לקוחות

#### Parameters

- `search` (string, optional): חיפוש טקסט חופשי בשדות שם, אימייל וטלפון
- `sort` (string, optional): שדה למיון (name, email, phone, createdAt)
- `order` (string, optional): סדר המיון (asc/desc)
- `page` (number, optional): מספר העמוד (ברירת מחדל: 1)
- `limit` (number, optional): מספר תוצאות בעמוד (ברירת מחדל: 10)

#### Response

```json
{
  "success": true,
  "data": {
    "customers": [
      {
        "id": "string",
        "name": "string",
        "email": "string",
        "phone": "string",
        "address": "string",
        "notes": "string",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "total": "number",
    "page": "number",
    "pages": "number"
  },
  "message": "Customers retrieved successfully",
  "error": null
}
```

### GET /customers/:id

מחזיר לקוח לפי מזהה

#### Response

```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "address": "string",
    "notes": "string",
    "createdAt": "date",
    "updatedAt": "date"
  },
  "message": "Customer retrieved successfully",
  "error": null
}
```

### POST /customers

יצירת לקוח חדש

#### Request Body

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "notes": "string"
}
```

#### Validation

- `name`: חובה, מינימום 2 תווים
- `email`: חובה, פורמט אימייל תקין
- `phone`: חובה, פורמט טלפון ישראלי
- `address`: אופציונלי
- `notes`: אופציונלי

### PUT /customers/:id

עדכון פרטי לקוח

#### Request Body

```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "notes": "string"
}
```

### DELETE /customers/:id

מחיקת לקוח

## 📝 משימות

### GET /tasks

מחזיר רשימת משימות

#### Parameters

- `search` (string, optional): חיפוש טקסט חופשי בכותרת ותיאור
- `customerId` (string, optional): סינון לפי לקוח
- `status` (string, optional): סינון לפי סטטוס (pending/in-progress/completed/cancelled)
- `priority` (string, optional): סינון לפי עדיפות (low/medium/high)
- `sort` (string, optional): שדה למיון (title, status, priority, dueDate, createdAt)
- `order` (string, optional): סדר המיון (asc/desc)
- `page` (number, optional): מספר העמוד (ברירת מחדל: 1)
- `limit` (number, optional): מספר תוצאות בעמוד (ברירת מחדל: 10)

#### Response

```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "customerId": "string",
        "customer": {
          "id": "string",
          "name": "string"
        },
        "status": "string",
        "priority": "string",
        "dueDate": "date",
        "isCompleted": "boolean",
        "createdAt": "date",
        "updatedAt": "date"
      }
    ],
    "total": "number",
    "page": "number",
    "pages": "number"
  },
  "message": "Tasks retrieved successfully",
  "error": null
}
```

### GET /tasks/:id

מחזיר משימה לפי מזהה

#### Response

```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "customerId": "string",
    "customer": {
      "id": "string",
      "name": "string"
    },
    "status": "string",
    "priority": "string",
    "dueDate": "date",
    "isCompleted": "boolean",
    "createdAt": "date",
    "updatedAt": "date"
  },
  "message": "Task retrieved successfully",
  "error": null
}
```

### POST /tasks

יצירת משימה חדשה

#### Request Body

```json
{
  "title": "string",
  "description": "string",
  "customerId": "string",
  "status": "string",
  "priority": "string",
  "dueDate": "date",
  "isCompleted": "boolean"
}
```

#### Validation

- `title`: חובה, מינימום 3 תווים
- `description`: חובה, מינימום 10 תווים
- `customerId`: חובה, מזהה לקוח תקין
- `status`: חובה, אחד מהערכים: pending/in-progress/completed/cancelled
- `priority`: חובה, אחד מהערכים: low/medium/high
- `dueDate`: חובה, תאריך עתידי
- `isCompleted`: אופציונלי, ברירת מחדל: false

### PUT /tasks/:id

עדכון פרטי משימה

#### Request Body

```json
{
  "title": "string",
  "description": "string",
  "customerId": "string",
  "status": "string",
  "priority": "string",
  "dueDate": "date",
  "isCompleted": "boolean"
}
```

### DELETE /tasks/:id

מחיקת משימה

## 🔍 קודי שגיאה

### 4xx - Client Errors

- `400` - Bad Request: בקשה לא תקינה
- `401` - Unauthorized: אין הרשאה
- `403` - Forbidden: גישה אסורה
- `404` - Not Found: משאב לא נמצא
- `409` - Conflict: התנגשות נתונים
- `422` - Unprocessable Entity: ולידציה נכשלה

### 5xx - Server Errors

- `500` - Internal Server Error: שגיאה פנימית בשרת
- `503` - Service Unavailable: השירות לא זמין

## 📋 דוגמאות

### יצירת לקוח

```bash
curl -X POST http://localhost:3030/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ישראל ישראלי",
    "email": "israel@example.com",
    "phone": "050-1234567",
    "address": "רחוב הרצל 1, תל אביב",
    "notes": "לקוח חדש"
  }'
```

### יצירת משימה

```bash
curl -X POST http://localhost:3030/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "פגישת היכרות",
    "description": "פגישת היכרות ראשונה עם הלקוח",
    "customerId": "123456789",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-02-01T10:00:00.000Z"
  }'
```

### חיפוש משימות של לקוח

```bash
curl -X GET "http://localhost:3030/api/tasks?customerId=123456789&status=pending&sort=dueDate&order=asc" \
  -H "Content-Type: application/json"
```

## 🔒 אבטחה

### Rate Limiting

- 100 בקשות לדקה לכל IP
- 1000 בקשות ליום לכל IP
- חסימה אוטומטית אחרי 5 ניסיונות כושלים

### CORS

מוגדר לאפשר גישה רק מ:

```
http://localhost:4200
```

### Validation

- כל הקלט עובר ולידציה
- סניטציה של קלט למניעת XSS
- הגנה מפני NoSQL Injection
- בדיקת תקינות תאריכים
- בדיקת אורך מקסימלי לשדות טקסט

### אבטחת מידע

- הצפנת נתונים רגישים
- ניהול לוגים מאובטח
- מניעת חשיפת מידע טכני בשגיאות
- בדיקת תקינות ה-ID בכל הבקשות
