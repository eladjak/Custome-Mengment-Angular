const mongoose = require('mongoose');
const Customer = require('../models/customer.model');
const Task = require('../models/task.model');

const customers = [
  {
    id: 'CUST001',
    name: 'ישראל ישראלי',
    area: 'תל אביב והמרכז',
    phone: '0501234567',
    email: 'israel@example.com'
  },
  {
    id: 'CUST002',
    name: 'שרה כהן',
    area: 'ירושלים',
    phone: '0522345678',
    email: 'sarah@example.com'
  },
  {
    id: 'CUST003',
    name: 'יוסף לוי',
    area: 'חיפה והצפון',
    phone: '0533456789',
    email: 'yosef@example.com'
  },
  {
    id: 'CUST004',
    name: 'רחל אברהם',
    area: 'באר שבע והדרום',
    phone: '0544567890',
    email: 'rachel@example.com'
  },
  {
    id: 'CUST005',
    name: 'דוד מזרחי',
    area: 'השרון',
    phone: '0555678901',
    email: 'david@example.com'
  }
];

const tasks = [
  {
    taskId: 'TASK001',
    customerId: 'CUST001',
    description: 'פגישת היכרות ראשונית',
    dueDate: new Date('2024-02-01'),
    status: 'completed',
    priority: 'high',
    isCompleted: true
  },
  {
    taskId: 'TASK002',
    customerId: 'CUST001',
    description: 'הכנת הצעת מחיר',
    dueDate: new Date('2024-02-05'),
    status: 'in-progress',
    priority: 'medium',
    isCompleted: false
  },
  {
    taskId: 'TASK003',
    customerId: 'CUST002',
    description: 'בדיקת דרישות המערכת',
    dueDate: new Date('2024-02-10'),
    status: 'pending',
    priority: 'high',
    isCompleted: false
  },
  {
    taskId: 'TASK004',
    customerId: 'CUST003',
    description: 'התקנת גרסה ראשונית',
    dueDate: new Date('2024-02-15'),
    status: 'in-progress',
    priority: 'high',
    isCompleted: false
  },
  {
    taskId: 'TASK005',
    customerId: 'CUST004',
    description: 'הדרכת משתמשים',
    dueDate: new Date('2024-02-20'),
    status: 'pending',
    priority: 'medium',
    isCompleted: false
  },
  {
    taskId: 'TASK006',
    customerId: 'CUST005',
    description: 'תחזוקה שוטפת',
    dueDate: new Date('2024-02-25'),
    status: 'pending',
    priority: 'low',
    isCompleted: false
  },
  {
    taskId: 'TASK007',
    customerId: 'CUST002',
    description: 'שדרוג מערכת',
    dueDate: new Date('2024-03-01'),
    status: 'pending',
    priority: 'medium',
    isCompleted: false
  },
  {
    taskId: 'TASK008',
    customerId: 'CUST003',
    description: 'גיבוי נתונים',
    dueDate: new Date('2024-03-05'),
    status: 'completed',
    priority: 'high',
    isCompleted: true
  },
  {
    taskId: 'TASK009',
    customerId: 'CUST004',
    description: 'פתרון תקלות',
    dueDate: new Date('2024-03-10'),
    status: 'in-progress',
    priority: 'high',
    isCompleted: false
  },
  {
    taskId: 'TASK010',
    customerId: 'CUST005',
    description: 'עדכון תיעוד',
    dueDate: new Date('2024-03-15'),
    status: 'pending',
    priority: 'low',
    isCompleted: false
  }
];

async function seedData() {
  try {
    // מחיקת נתונים קיימים
    await Customer.deleteMany({});
    await Task.deleteMany({});

    // הוספת לקוחות
    await Customer.insertMany(customers);
    console.log('נתוני לקוחות לדוגמה נוספו בהצלחה');

    // הוספת משימות
    await Task.insertMany(tasks);
    console.log('נתוני משימות לדוגמה נוספו בהצלחה');

  } catch (error) {
    console.error('שגיאה בהוספת נתוני הדגמה:', error);
  }
}

module.exports = seedData; 