import { Routes } from '@angular/router';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

/**
 * הגדרות הניתוב של האפליקציה
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/customers',
    pathMatch: 'full',
    title: 'ניהול לקוחות ומשימות',
  },
  {
    path: 'customers',
    component: CustomersListComponent,
    title: 'רשימת לקוחות',
    data: { animation: 'customers' },
  },
  {
    path: 'customers/new',
    component: CustomerFormComponent,
    title: 'הוספת לקוח חדש',
    data: { animation: 'customerForm', mode: 'create' },
  },
  {
    path: 'customers/edit/:id',
    component: CustomerFormComponent,
    title: 'עריכת לקוח',
    data: { animation: 'customerForm', mode: 'edit' },
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./components/tasks-list/tasks-list.component').then(
        (m) => m.TasksListComponent,
      ),
    title: 'רשימת משימות',
    data: { animation: 'tasks' },
  },
  {
    path: 'tasks/new',
    loadComponent: () =>
      import('./components/task-form/task-form.component').then(
        (m) => m.TaskFormComponent,
      ),
    title: 'הוספת משימה חדשה',
    data: { animation: 'taskForm', mode: 'create' },
  },
  {
    path: 'tasks/edit/:id',
    loadComponent: () =>
      import('./components/task-form/task-form.component').then(
        (m) => m.TaskFormComponent,
      ),
    title: 'עריכת משימה',
    data: { animation: 'taskForm', mode: 'edit' },
  },
  {
    path: '**',
    redirectTo: '/customers',
    pathMatch: 'full',
  },
];
