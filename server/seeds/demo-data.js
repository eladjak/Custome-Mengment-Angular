const mongoose = require("mongoose");
const Customer = require("../models/customer.model");
const Task = require("../models/task.model");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

// Log the MongoDB URI to debug (without showing sensitive information)
console.log(
  "MongoDB URI is " + (process.env.MONGODB_URI ? "defined" : "undefined")
);

const customers = [
  {
    id: "CUST001",
    name: "ישראל ישראלי",
    area: "תל אביב והמרכז",
    phone: "0501234567",
    email: "israel@example.com",
  },
  {
    id: "CUST002",
    name: "שרה כהן",
    area: "ירושלים",
    phone: "0522345678",
    email: "sarah@example.com",
  },
  {
    id: "CUST003",
    name: "יוסף לוי",
    area: "חיפה והצפון",
    phone: "0533456789",
    email: "yosef@example.com",
  },
  {
    id: "CUST004",
    name: "רחל אברהם",
    area: "באר שבע והדרום",
    phone: "0544567890",
    email: "rachel@example.com",
  },
  {
    id: "CUST005",
    name: "דוד מזרחי",
    area: "השרון",
    phone: "0555678901",
    email: "david@example.com",
  },
];

const tasks = [
  {
    taskId: "TASK001",
    title: "פגישת היכרות",
    customerId: "CUST001",
    description: "פגישת היכרות ראשונית",
    dueDate: new Date("2024-02-01"),
    status: "completed",
    priority: "high",
    isCompleted: true,
  },
  {
    taskId: "TASK002",
    title: "אפיון מערכת",
    customerId: "CUST001",
    description: "אפיון דרישות המערכת",
    dueDate: new Date("2024-02-05"),
    status: "in-progress",
    priority: "high",
    isCompleted: false,
  },
  {
    taskId: "TASK003",
    title: "בדיקת דרישות",
    customerId: "CUST002",
    description: "בדיקת דרישות המערכת",
    dueDate: new Date("2024-02-10"),
    status: "pending",
    priority: "high",
    isCompleted: false,
  },
  {
    taskId: "TASK004",
    title: "התקנה ראשונית",
    customerId: "CUST003",
    description: "התקנת גרסה ראשונית",
    dueDate: new Date("2024-02-15"),
    status: "in-progress",
    priority: "high",
    isCompleted: false,
  },
  {
    taskId: "TASK005",
    title: "הדרכת משתמשים",
    customerId: "CUST004",
    description: "הדרכת משתמשים",
    dueDate: new Date("2024-02-20"),
    status: "pending",
    priority: "medium",
    isCompleted: false,
  },
  {
    taskId: "TASK006",
    title: "תחזוקה שוטפת",
    customerId: "CUST005",
    description: "תחזוקה שוטפת",
    dueDate: new Date("2024-02-25"),
    status: "pending",
    priority: "low",
    isCompleted: false,
  },
  {
    taskId: "TASK007",
    title: "שדרוג מערכת",
    customerId: "CUST002",
    description: "שדרוג מערכת",
    dueDate: new Date("2024-03-01"),
    status: "pending",
    priority: "medium",
    isCompleted: false,
  },
  {
    taskId: "TASK008",
    title: "גיבוי נתונים",
    customerId: "CUST003",
    description: "גיבוי נתונים",
    dueDate: new Date("2024-03-05"),
    status: "completed",
    priority: "high",
    isCompleted: true,
  },
  {
    taskId: "TASK009",
    title: "פתרון תקלות",
    customerId: "CUST004",
    description: "פתרון תקלות",
    dueDate: new Date("2024-03-10"),
    status: "in-progress",
    priority: "high",
    isCompleted: false,
  },
  {
    taskId: "TASK010",
    title: "עדכון תיעוד",
    customerId: "CUST005",
    description: "עדכון תיעוד",
    dueDate: new Date("2024-03-15"),
    status: "pending",
    priority: "low",
    isCompleted: false,
  },
];

async function seedData() {
  try {
    console.log("מתחבר למסד הנתונים...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("התחברות למסד הנתונים הצליחה");

    // מחיקת נתונים קיימים
    console.log("מוחק נתונים קיימים...");
    await Customer.deleteMany({});
    await Task.deleteMany({});
    console.log("נתונים קיימים נמחקו בהצלחה");

    // הוספת לקוחות
    console.log("מוסיף נתוני לקוחות...");
    await Customer.insertMany(customers);
    console.log("נתוני לקוחות לדוגמה נוספו בהצלחה");

    // הוספת משימות
    console.log("מוסיף נתוני משימות...");
    await Task.insertMany(tasks);
    console.log("נתוני משימות לדוגמה נוספו בהצלחה");

    console.log("כל הנתונים נטענו בהצלחה!");
  } catch (error) {
    console.error("שגיאה בהוספת נתוני הדגמה:", error);
    throw error;
  }
}

module.exports = seedData;
