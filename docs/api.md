# תיעוד API

## כללי
- כל הבקשות צריכות לכלול את ה-header: `Content-Type: application/json`
- כל התשובות מוחזרות בפורמט JSON
- קודי שגיאה סטנדרטיים של HTTP משמשים לציון הצלחה/כישלון

## Endpoints

### לקוחות

#### קבלת כל הלקוחות
```http
GET /api/customers
```

**תשובה מוצלחת**
```json
[
  {
    "id": "CUST001",
    "name": "ישראל ישראלי",
    "area": "תל אביב והמרכז",
    "phone": "0501234567",
    "email": "israel@example.com",
    "createdAt": "2024-01-20T10:00:00.000Z",
    "updatedAt": "2024-01-20T10:00:00.000Z"
  }
]
```

#### קבלת לקוח ספציפי
```http
GET /api/customers/:id
```

**פרמטרים**
- `id`: מזהה הלקוח

**תשובה מוצלחת**
```json
{
  "id": "CUST001",
  "name": "ישראל ישראלי",
  "area": "תל אביב והמרכז",
  "phone": "0501234567",
  "email": "israel@example.com",
  "createdAt": "2024-01-20T10:00:00.000Z",
  "updatedAt": "2024-01-20T10:00:00.000Z"
}
```

#### יצירת לקוח חדש
```http
POST /api/customers
```

**גוף הבקשה**
```json
{
  "id": "CUST001",
  "name": "ישראל ישראלי",
  "area": "תל אביב והמרכז",
  "phone": "0501234567",
  "email": "israel@example.com"
}
```

**תשובה מוצלחת**
```json
{
  "id": "CUST001",
  "name": "ישראל ישראלי",
  "area": "תל אביב והמרכז",
  "phone": "0501234567",
  "email": "israel@example.com",
  "createdAt": "2024-01-20T10:00:00.000Z",
  "updatedAt": "2024-01-20T10:00:00.000Z"
}
```

#### עדכון לקוח
```http
PUT /api/customers/:id
```

**פרמטרים**
- `id`: מזהה הלקוח

**גוף הבקשה**
```json
{
  "name": "ישראל ישראלי",
  "area": "תל אביב והמרכז",
  "phone": "0501234567",
  "email": "israel@example.com"
}
```

#### מחיקת לקוח
```http
DELETE /api/customers/:id
```

**פרמטרים**
- `id`: מזהה הלקוח

### משימות

#### קבלת כל המשימות
```http
GET /api/tasks
```

**תשובה מוצלחת**
```json
[
  {
    "taskId": "TASK001",
    "customerId": "CUST001",
    "description": "פגישת היכרות ראשונית",
    "dueDate": "2024-02-01T00:00:00.000Z",
    "status": "completed",
    "priority": "high",
    "isCompleted": true,
    "createdAt": "2024-01-20T10:00:00.000Z",
    "updatedAt": "2024-01-20T10:00:00.000Z"
  }
]
```

#### קבלת משימה ספציפית
```http
GET /api/tasks/:id
```

**פרמטרים**
- `id`: מזהה המשימה

**תשובה מוצלחת**
```json
{
  "taskId": "TASK001",
  "customerId": "CUST001",
  "description": "פגישת היכרות ראשונית",
  "dueDate": "2024-02-01T00:00:00.000Z",
  "status": "completed",
  "priority": "high",
  "isCompleted": true,
  "createdAt": "2024-01-20T10:00:00.000Z",
  "updatedAt": "2024-01-20T10:00:00.000Z"
}
```

#### יצירת משימה חדשה
```http
POST /api/tasks
```

**גוף הבקשה**
```json
{
  "taskId": "TASK001",
  "customerId": "CUST001",
  "description": "פגישת היכרות ראשונית",
  "dueDate": "2024-02-01T00:00:00.000Z",
  "status": "pending",
  "priority": "high",
  "isCompleted": false
}
```

#### עדכון משימה
```http
PUT /api/tasks/:id
```

**פרמטרים**
- `id`: מזהה המשימה

**גוף הבקשה**
```json
{
  "description": "פגישת היכרות ראשונית",
  "dueDate": "2024-02-01T00:00:00.000Z",
  "status": "completed",
  "priority": "high",
  "isCompleted": true
}
```

#### מחיקת משימה
```http
DELETE /api/tasks/:id
```

**פרמטרים**
- `id`: מזהה המשימה

#### קבלת משימות של לקוח ספציפי
```http
GET /api/tasks/customer/:customerId
```

**פרמטרים**
- `customerId`: מזהה הלקוח

**תשובה מוצלחת**
```json
[
  {
    "taskId": "TASK001",
    "customerId": "CUST001",
    "description": "פגישת היכרות ראשונית",
    "dueDate": "2024-02-01T00:00:00.000Z",
    "status": "completed",
    "priority": "high",
    "isCompleted": true,
    "createdAt": "2024-01-20T10:00:00.000Z",
    "updatedAt": "2024-01-20T10:00:00.000Z"
  }
]
```

## קודי שגיאה

- `200 OK`: הבקשה הצליחה
- `201 Created`: המשאב נוצר בהצלחה
- `400 Bad Request`: שגיאה בפרמטרים של הבקשה
- `404 Not Found`: המשאב המבוקש לא נמצא
- `500 Internal Server Error`: שגיאה בשרת

## דוגמאות לשגיאות

```json
{
  "message": "Customer not found"
}
```

```json
{
  "message": "Invalid email format"
}
```

```json
{
  "message": "Task ID is required"
}
``` 