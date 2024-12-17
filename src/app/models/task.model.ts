import { Customer } from './customer.model';

/**
 * סטטוס אפשרי של משימה
 */
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

/**
 * רמת עדיפות של משימה
 */
export type TaskPriority = 'low' | 'medium' | 'high';

/**
 * ממשק המייצג משימה במערכת
 */
export interface Task {
  /** מזהה ייחודי של המשימה */
  taskId: string;
  /** מותרת המשימה */
  title: string;
  /** תיאור המשימה */
  description: string;
  /** מזהה הלקוח שהמשימה שייכת אליו */
  customerId: string;
  /** פרטי הלקוח */
  customer?: Customer;
  /** תאריך יעד לביצוע (בפורמט ISO string) */
  dueDate: string;
  /** סטטוס המשימה */
  status: TaskStatus;
  /** רמת עדיפות */
  priority: TaskPriority;
  /** האם המשימה הושלמה */
  isCompleted: boolean;
  /** תאריך יצירת המשימה */
  createdAt?: string;
  /** תאריך עדכון אחרון */
  updatedAt?: string;
}

/**
 * ממשק המייצג משימה בטופס
 * משמש לטיפול בתאריכים כאובייקטי Date בצד הלקוח
 */
export interface TaskForm
  extends Omit<Task, 'dueDate' | 'createdAt' | 'updatedAt'> {
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
