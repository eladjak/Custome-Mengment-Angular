import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CustomerService } from '../../services/customer.service';
import { MaterialModule } from '../../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, finalize, catchError, EMPTY } from 'rxjs';
import { Task } from '../../models/task.model';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup;
  isEditMode = false;
  taskId: string | null = null;
  customers: Customer[] = [];
  isLoading = false;
  isSubmitting = false;
  private subscriptions = new Subscription();
  private navigationPending = false;

  statusOptions = [
    { value: 'pending', label: 'ממתין' },
    { value: 'in-progress', label: 'בביצוע' },
    { value: 'completed', label: 'הושלם' },
    { value: 'cancelled', label: 'בוטל' },
  ];

  priorityOptions = [
    { value: 'low', label: 'נמוכה' },
    { value: 'medium', label: 'בינונית' },
    { value: 'high', label: 'גבוהה' },
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    console.log('אתחול TaskFormComponent');
    this.initForm();
  }

  private initForm(): void {
    console.log('אתחול הטופס...');
    this.taskForm = this.fb.group({
      taskId: [{ value: '', disabled: true }],
      title: ['', [Validators.required, Validators.minLength(3)]],
      customerId: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dueDate: [null, Validators.required],
      status: ['pending', Validators.required],
      priority: ['medium', Validators.required],
      isCompleted: [false],
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit נקרא');
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy נקרא');
    if (this.navigationPending) {
      console.log('ביטול ניווט ממתין');
      this.navigationPending = false;
    }
    this.subscriptions.unsubscribe();
  }

  private loadInitialData(): void {
    console.log('טוען נתונים התחלתיים...');
    this.isLoading = true;
    this.taskId = this.route.snapshot.paramMap.get('id');

    // טעינת לקוחות
    this.subscriptions.add(
      this.customerService
        .getCustomers()
        .pipe(
          finalize(() => {
            if (!this.taskId) {
              this.isLoading = false;
            }
          }),
          catchError((error) => {
            console.error('שגיאה בטעינת לקוחות:', error);
            this.showError('שגיאה בטעינת רשימת הלקוחות');
            this.isLoading = false;
            return EMPTY;
          }),
        )
        .subscribe({
          next: (customers) => {
            console.log('הלקוחות נטענו:', customers);
            this.customers = customers;

            if (this.taskId) {
              this.loadTaskData();
            }
          },
          error: () => {
            this.goBack();
          },
        }),
    );
  }

  private loadTaskData(): void {
    if (!this.taskId) return;

    console.log('טוען נתוני משימה עבור מזהה:', this.taskId);

    this.subscriptions.add(
      this.taskService
        .getTask(this.taskId)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
          catchError((error) => {
            console.error('שגיאה בטעינת המשימה:', error);
            this.showError('שגיאה בטעינת המשימה');
            this.goBack();
            return EMPTY;
          }),
        )
        .subscribe({
          next: (task) => {
            if (!task) {
              console.warn('לא נמצאה משימה');
              this.showError('המשימה לא נמצאה');
              this.goBack();
              return;
            }

            console.log('המשימה נטענה:', task);
            this.isEditMode = true;
            this.updateFormWithTask(task);
          },
          error: () => {
            this.goBack();
          },
        }),
    );
  }

  private updateFormWithTask(task: Task): void {
    try {
      const formData = {
        taskId: task.taskId || '',
        title: task.title || '',
        description: task.description || '',
        customerId: task.customerId || task.customer?.id || '',
        dueDate: this.parseDateSafely(task.dueDate),
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        isCompleted: task.isCompleted || false,
      };

      console.log('נתוני הטופס הוכנו:', formData);

      // עדכון הטופס בצורה בטוחה
      if (this.taskForm) {
        this.taskForm.patchValue(formData, { emitEvent: false });

        // סימון כל השדות כנקיים
        Object.keys(this.taskForm.controls).forEach((key) => {
          const control = this.taskForm.get(key);
          if (control) {
            control.markAsPristine();
            control.markAsUntouched();
          }
        });

        console.log('ערכי הטופס לאחר העדכון:', this.taskForm.getRawValue());
      } else {
        throw new Error('הטופס לא אותחל');
      }
    } catch (error) {
      console.error('שגיאה בעדכון ערכי הטופס:', error);
      this.showError('שגיאה בעדכון הטופס');
      this.goBack();
    }
  }

  onSubmit(): void {
    if (!this.taskForm || this.taskForm.invalid || this.isSubmitting) {
      console.log('הטופס לא תקין או כבר בתהליך שליחה');
      this.markFormGroupTouched(this.taskForm);
      return;
    }

    this.isSubmitting = true;
    console.log('שולח טופס...');

    const formData = this.prepareFormData();
    if (!formData) {
      console.error('שגיאה בהכנת נתוני הטופס');
      this.isSubmitting = false;
      return;
    }

    console.log('נתוני הטופס מוכנים:', formData);

    const request = this.isEditMode
      ? this.taskService.updateTask(this.taskId!, formData)
      : this.taskService.createTask(formData as Omit<Task, 'taskId'>);

    this.subscriptions.add(
      request
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          }),
          catchError((error) => {
            console.error('שגיאה בשמירת המשימה:', error);
            this.showError(
              this.isEditMode ? 'שגיאה בעדכון המשימה' : 'שגיאה ביצירת המשימה',
            );
            return EMPTY;
          }),
        )
        .subscribe({
          next: (response) => {
            console.log('המשימה נשמרה בהצלחה:', response);
            this.showSuccess(
              this.isEditMode ? 'המשימה עודכנה בהצלחה' : 'המשימה נוצרה בהצלחה',
            );
            this.navigateToList();
          },
          error: () => {
            this.isSubmitting = false;
          },
        }),
    );
  }

  private prepareFormData(): Partial<Task> | null {
    if (!this.taskForm) return null;

    const formValue = this.taskForm.getRawValue();
    if (!formValue) return null;

    const preparedData: Partial<Task> = {
      title: formValue.title?.trim(),
      description: formValue.description?.trim(),
      customerId: formValue.customerId,
      status: formValue.status,
      priority: formValue.priority,
      isCompleted: formValue.isCompleted,
    };

    if (formValue.dueDate) {
      const date = this.parseDateSafely(formValue.dueDate);
      if (date) {
        preparedData.dueDate = date.toISOString();
      }
    }

    console.log('נתוני הטופס מוכנים:', preparedData);
    return preparedData;
  }

  private parseDateSafely(dateValue: unknown): Date | null {
    if (!dateValue) return null;

    try {
      if (
        typeof dateValue === 'object' &&
        dateValue &&
        'getTime' in dateValue
      ) {
        const date = dateValue as Date;
        return isNaN(date.getTime()) ? null : date;
      }

      if (typeof dateValue === 'string') {
        const date = new Date(dateValue);
        return isNaN(date.getTime()) ? null : date;
      }

      console.warn('פורמט תאריך לא נתמך:', dateValue);
      return null;
    } catch (error) {
      console.error('שגיאה בפירוש התאריך:', error);
      return null;
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    if (!formGroup) return;

    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'סגור', {
      duration: 3000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'סגור', {
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
    });
  }

  private goBack(): void {
    if (this.navigationPending) return;

    this.navigationPending = true;
    console.log('מנווט חזרה לרשימת המשימות...');

    this.router
      .navigate(['/tasks'])
      .then(() => {
        this.navigationPending = false;
      })
      .catch((error) => {
        console.error('שגיאה בניווט:', error);
        this.navigationPending = false;
      });
  }

  private navigateToList(): void {
    if (this.navigationPending) return;

    this.navigationPending = true;
    console.log('מנווט לרשימת המשימות...');

    // נחכה רגע קט לפני הניווט
    setTimeout(() => {
      this.router
        .navigate(['/tasks'])
        .then(() => {
          this.navigationPending = false;
        })
        .catch((error) => {
          console.error('שגיאה בניווט:', error);
          this.navigationPending = false;
        });
    }, 100);
  }
}
