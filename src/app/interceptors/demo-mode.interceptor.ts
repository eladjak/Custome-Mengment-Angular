import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { Task } from '../models/task.model';

const DEMO_CUSTOMERS: Customer[] = [
  {
    id: 'CUST001',
    name: 'ישראל ישראלי',
    area: 'תל אביב והמרכז',
    phone: '0501234567',
    email: 'israel@example.com',
  },
  {
    id: 'CUST002',
    name: 'שרה כהן',
    area: 'ירושלים',
    phone: '0522345678',
    email: 'sarah@example.com',
  },
  {
    id: 'CUST003',
    name: 'יוסף לוי',
    area: 'חיפה והצפון',
    phone: '0533456789',
    email: 'yosef@example.com',
  },
  {
    id: 'CUST004',
    name: 'רחל אברהם',
    area: 'באר שבע והדרום',
    phone: '0544567890',
    email: 'rachel@example.com',
  },
  {
    id: 'CUST005',
    name: 'דוד מזרחי',
    area: 'השרון',
    phone: '0555678901',
    email: 'david@example.com',
  },
  {
    id: 'CUST006',
    name: 'מיכל גולן',
    area: 'רמת גן',
    phone: '0526789012',
    email: 'michal@example.com',
  },
  {
    id: 'CUST007',
    name: 'אבי ברק',
    area: 'הרצליה',
    phone: '0547890123',
    email: 'avi@example.com',
  },
];

const DEMO_TASKS: Task[] = [
  {
    taskId: 'TASK001',
    title: 'פגישת היכרות',
    customerId: 'CUST001',
    description: 'פגישת היכרות ראשונית עם הלקוח לבירור צרכים',
    dueDate: '2026-04-15T10:00:00.000Z',
    status: 'completed',
    priority: 'high',
    isCompleted: true,
  },
  {
    taskId: 'TASK002',
    title: 'אפיון מערכת',
    customerId: 'CUST001',
    description: 'אפיון דרישות המערכת ותכנון ארכיטקטורה',
    dueDate: '2026-04-20T14:00:00.000Z',
    status: 'in-progress',
    priority: 'high',
    isCompleted: false,
  },
  {
    taskId: 'TASK003',
    title: 'בדיקת דרישות',
    customerId: 'CUST002',
    description: 'סקירת דרישות הלקוח ואישור תכולה',
    dueDate: '2026-04-25T09:00:00.000Z',
    status: 'pending',
    priority: 'high',
    isCompleted: false,
  },
  {
    taskId: 'TASK004',
    title: 'הצעת מחיר',
    customerId: 'CUST003',
    description: 'הכנת הצעת מחיר מפורטת',
    dueDate: '2026-04-18T12:00:00.000Z',
    status: 'completed',
    priority: 'medium',
    isCompleted: true,
  },
  {
    taskId: 'TASK005',
    title: 'תמיכה טכנית',
    customerId: 'CUST004',
    description: 'פתרון בעיה טכנית במערכת הלקוח',
    dueDate: '2026-04-12T16:00:00.000Z',
    status: 'in-progress',
    priority: 'high',
    isCompleted: false,
  },
  {
    taskId: 'TASK006',
    title: 'עדכון חודשי',
    customerId: 'CUST005',
    description: 'שיחת עדכון חודשית עם הלקוח',
    dueDate: '2026-04-30T11:00:00.000Z',
    status: 'pending',
    priority: 'low',
    isCompleted: false,
  },
  {
    taskId: 'TASK007',
    title: 'הדרכה למערכת',
    customerId: 'CUST006',
    description: 'הדרכת עובדי הלקוח לשימוש במערכת החדשה',
    dueDate: '2026-04-22T10:00:00.000Z',
    status: 'pending',
    priority: 'medium',
    isCompleted: false,
  },
  {
    taskId: 'TASK008',
    title: 'בדיקת ביצועים',
    customerId: 'CUST007',
    description: 'ביצוע מבדקי עומסים וביצועים',
    dueDate: '2026-04-28T15:00:00.000Z',
    status: 'in-progress',
    priority: 'medium',
    isCompleted: false,
  },
];

/**
 * Interceptor שמספק נתוני דמו כאשר השרת לא זמין.
 * מאפשר לאפליקציה לעבוד במצב הדגמה ללא צורך בחיבור לשרת.
 */
@Injectable()
export class DemoModeInterceptor implements HttpInterceptor {
  private customers = [...DEMO_CUSTOMERS];
  private tasks = [...DEMO_TASKS];

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 0 || error.status === 504) {
          console.log('🔄 מצב הדגמה - השרת לא זמין, משתמש בנתוני דמו');
          return this.handleDemoRequest(req);
        }
        throw error;
      })
    );
  }

  private handleDemoRequest(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const url = req.url;
    const method = req.method;

    // Customers endpoints
    if (url.includes('/customers')) {
      return this.handleCustomerRequest(req, url, method);
    }

    // Tasks endpoints
    if (url.includes('/tasks')) {
      return this.handleTaskRequest(req, url, method);
    }

    return of(new HttpResponse({ status: 200, body: {} }));
  }

  private handleCustomerRequest(
    req: HttpRequest<any>,
    url: string,
    method: string
  ): Observable<HttpEvent<any>> {
    const idMatch = url.match(/\/customers\/(\w+)$/);

    switch (method) {
      case 'GET':
        if (idMatch) {
          const customer = this.customers.find((c) => c.id === idMatch[1]);
          return of(new HttpResponse({ status: 200, body: customer || null }));
        }
        return of(new HttpResponse({ status: 200, body: this.customers }));

      case 'POST': {
        const newCustomer: Customer = {
          ...req.body,
          id: `CUST${String(this.customers.length + 1).padStart(3, '0')}`,
        };
        this.customers = [...this.customers, newCustomer];
        return of(new HttpResponse({ status: 201, body: newCustomer }));
      }

      case 'PUT':
        if (idMatch) {
          this.customers = this.customers.map((c) =>
            c.id === idMatch[1] ? { ...c, ...req.body } : c
          );
          const updated = this.customers.find((c) => c.id === idMatch[1]);
          return of(new HttpResponse({ status: 200, body: updated }));
        }
        return of(new HttpResponse({ status: 404, body: null }));

      case 'DELETE':
        if (idMatch) {
          this.customers = this.customers.filter((c) => c.id !== idMatch[1]);
          return of(new HttpResponse({ status: 200, body: null }));
        }
        return of(new HttpResponse({ status: 404, body: null }));

      default:
        return of(new HttpResponse({ status: 200, body: null }));
    }
  }

  private handleTaskRequest(
    req: HttpRequest<any>,
    url: string,
    method: string
  ): Observable<HttpEvent<any>> {
    const idMatch = url.match(/\/tasks\/(\w+)$/);
    const customerMatch = url.match(/\/tasks\/customer\/(\w+)$/);

    switch (method) {
      case 'GET':
        if (customerMatch) {
          const customerTasks = this.tasks.filter(
            (t) => t.customerId === customerMatch[1]
          );
          return of(
            new HttpResponse({ status: 200, body: customerTasks })
          );
        }
        if (idMatch) {
          const task = this.tasks.find((t) => t.taskId === idMatch[1]);
          return of(new HttpResponse({ status: 200, body: task || null }));
        }
        return of(new HttpResponse({ status: 200, body: this.tasks }));

      case 'POST': {
        const newTask: Task = {
          ...req.body,
          taskId: `TASK${String(this.tasks.length + 1).padStart(3, '0')}`,
        };
        this.tasks = [...this.tasks, newTask];
        return of(new HttpResponse({ status: 201, body: newTask }));
      }

      case 'PUT':
        if (idMatch) {
          this.tasks = this.tasks.map((t) =>
            t.taskId === idMatch[1] ? { ...t, ...req.body } : t
          );
          const updated = this.tasks.find((t) => t.taskId === idMatch[1]);
          return of(new HttpResponse({ status: 200, body: updated }));
        }
        return of(new HttpResponse({ status: 404, body: null }));

      case 'DELETE':
        if (idMatch) {
          this.tasks = this.tasks.filter((t) => t.taskId !== idMatch[1]);
          return of(new HttpResponse({ status: 200, body: null }));
        }
        return of(new HttpResponse({ status: 404, body: null }));

      default:
        return of(new HttpResponse({ status: 200, body: null }));
    }
  }
}
