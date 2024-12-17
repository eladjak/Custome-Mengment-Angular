import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Task } from '../models/task.model';
import { Customer } from '../models/customer.model';

/**
 * שירות לניהול משימות במערכת
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {
    console.log('אתחול שירות המשימות');
  }

  /**
   * קבלת כל המשימות מהמערכת
   * @returns Observable של מערך משימות
   */
  getTasks(): Observable<Task[]> {
    console.log('מביא את כל המשימות');
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap((tasks) => console.log('המשימות נמצאו:', tasks)),
      catchError(this.handleError),
    );
  }

  /**
   * קבלת משימה לפי מזהה
   * @param id מזהה המשימה
   * @returns Observable של המשימה
   */
  getTask(id: string): Observable<Task> {
    console.log(`מביא משימה עם מזהה: ${id}`);
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      tap((task) => console.log('המשימה נמצאה:', task)),
      catchError(this.handleError),
    );
  }

  /**
   * יצירת משימה חדשה
   * @param task פרטי המשימה החדשה (ללא מזהה)
   * @returns Observable של המשימה שנוצרה
   */
  createTask(task: Omit<Task, 'taskId'>): Observable<Task> {
    console.log('יוצר משימה חדשה:', task);
    const normalizedTask = this.normalizeTaskData(task);
    return this.http.post<Task>(this.apiUrl, normalizedTask).pipe(
      tap((newTask) => console.log('המשימה נוצרה:', newTask)),
      catchError(this.handleError),
    );
  }

  /**
   * עדכון פרטי משימה
   * @param id מזהה המשימה
   * @param task פרטי המשימה לעדכון
   * @returns Observable של המשימה המעודכנת
   */
  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    console.log(`מעדכן משימה עם מזהה: ${id}`, task);
    const normalizedTask = this.normalizeTaskData(task);
    console.log('נתוני משימה מנורמלים לפני שליחה:', normalizedTask);

    return this.http.put<Task>(`${this.apiUrl}/${id}`, normalizedTask).pipe(
      tap((updatedTask) => console.log('המשימה עודכנה:', updatedTask)),
      catchError((error) => {
        console.error('שגיאה בעדכון המשימה:', error);
        return this.handleError(error);
      }),
    );
  }

  /**
   * נרמול נתוני המשימה לפני שליחה לשרת
   * @param task נתוני המשימה
   * @returns נתוני המשימה מנורמלים
   */
  private normalizeTaskData(task: Partial<Task>): Partial<Task> {
    const normalized = { ...task };

    // טיפול בתאריך
    if (normalized.dueDate) {
      try {
        let dateValue: Date;

        // אם זה סטרינג של תאריך
        if (typeof normalized.dueDate === 'string') {
          dateValue = new Date(normalized.dueDate);
        }
        // אם זה אובייקט Date
        else if (
          typeof normalized.dueDate === 'object' &&
          normalized.dueDate &&
          'getTime' in normalized.dueDate
        ) {
          dateValue = normalized.dueDate as Date;
        }
        // אם זה משהו אחר, ננסה להמיר לתאריך
        else {
          dateValue = new Date(normalized.dueDate as any);
        }

        // בדיקת תקינות התאריך
        if (!isNaN(dateValue.getTime())) {
          normalized.dueDate = dateValue.toISOString();
        } else {
          console.warn('תאריך לא תקין:', normalized.dueDate);
          delete normalized.dueDate;
        }
      } catch (error) {
        console.error('שגיאה בנרמול תאריך:', error);
        delete normalized.dueDate;
      }
    }

    // טיפול במזהה לקוח
    if (normalized.customer && typeof normalized.customer === 'object') {
      const customerObj = normalized.customer as Customer;
      normalized.customerId = customerObj.id;
      delete normalized.customer;
    }

    // הסרת שדות מיותרים
    ['id', '__v', 'createdAt', 'updatedAt'].forEach(
      (field) => delete (normalized as any)[field],
    );

    console.log('נתוני משימה מנורמלים:', normalized);
    return normalized;
  }

  /**
   * מחיקת משימה
   * @param id מזהה המשימה למחיקה
   * @returns Observable ריק
   */
  deleteTask(id: string): Observable<void> {
    console.log(`מוחק משי��ה עם מזהה: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('המשימה נמחקה')),
      catchError(this.handleError),
    );
  }

  /**
   * קבלת משימות של לקוח מסוים
   * @param customerId מזהה הלקוח
   * @returns Observable של מערך משימות
   */
  getTasksByCustomer(customerId: string): Observable<Task[]> {
    console.log(`מביא משימות עבור לקוח: ${customerId}`);
    return this.http.get<Task[]>(`${this.apiUrl}/customer/${customerId}`).pipe(
      tap((tasks) => console.log('משימות הלקוח נמצאו:', tasks)),
      catchError(this.handleError),
    );
  }

  /**
   * טיפול בשגיאות HTTP
   * @param error שגיאת HTTP
   * @returns Observable של שגיאה
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'התרחשה שגיאה';

    if (error.error instanceof ErrorEvent) {
      // שגיאת צד לקוח
      errorMessage = `שגיאה: ${error.error.message}`;
    } else {
      // שגיאת שרת
      errorMessage = `קוד שגיאה: ${error.status}\nהודעה: ${error.message}`;
      if (error.error?.message) {
        errorMessage += `\nפירוט: ${error.error.message}`;
      }
    }

    console.error('שגיאה מפורטת:', error);
    console.error('הודעת שגיאה למשתמש:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
