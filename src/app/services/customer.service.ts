import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Customer } from '../models/customer.model';

/**
 * שירות לניהול לקוחות במערכת
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {
    console.log('אתחול שירות הלקוחות');
  }

  /**
   * קבלת כל הלקוחות מהמערכת
   * @returns Observable של מערך לקוחות
   */
  getCustomers(): Observable<Customer[]> {
    console.log('מביא את כל הלקוחות');
    return this.http.get<Customer[]>(this.apiUrl).pipe(
      tap(customers => console.log('הלקוחות נמצאו:', customers)),
      catchError(this.handleError)
    );
  }

  /**
   * קבלת לקוח לפי מזהה
   * @param id מזהה הלקוח
   * @returns Observable של הלקוח
   */
  getCustomer(id: string): Observable<Customer> {
    console.log(`מביא לקוח עם מזהה: ${id}`);
    return this.http.get<Customer>(`${this.apiUrl}/${id}`).pipe(
      tap(customer => console.log('הלקוח נמצא:', customer)),
      catchError(this.handleError)
    );
  }

  /**
   * יצירת לקוח חדש
   * @param customer פרטי הלקוח החדש (ללא מזהה)
   * @returns Observable של הלקוח שנוצר
   */
  createCustomer(customer: Omit<Customer, 'id'>): Observable<Customer> {
    console.log('יוצר לקוח חדש:', customer);
    return this.http.post<Customer>(this.apiUrl, customer).pipe(
      tap(newCustomer => console.log('הלקוח נוצר:', newCustomer)),
      catchError(this.handleError)
    );
  }

  /**
   * עדכון פרטי לקוח
   * @param id מזהה הלקוח
   * @param customer פרטי הלקוח לעדכון
   * @returns Observable של הלקוח המעודכן
   */
  updateCustomer(id: string, customer: Partial<Customer>): Observable<Customer> {
    console.log(`מעדכן לקוח עם מזהה: ${id}`, customer);
    return this.http.put<Customer>(`${this.apiUrl}/${id}`, customer).pipe(
      tap(updatedCustomer => console.log('הלקוח עודכן:', updatedCustomer)),
      catchError(this.handleError)
    );
  }

  /**
   * מחיקת לקוח
   * @param id מזהה הלקוח למחיקה
   * @returns Observable ריק
   */
  deleteCustomer(id: string): Observable<void> {
    console.log(`מוחק לקוח עם מזהה: ${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log('הלקוח נמחק')),
      catchError(this.handleError)
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
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
