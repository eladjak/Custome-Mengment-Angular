import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class TasksListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'taskId',
    'title',
    'description',
    'customer',
    'status',
    'priority',
    'dueDate',
    'isCompleted',
    'actions',
  ];
  dataSource = new MatTableDataSource<Task>([]);
  isLoading = false;
  isUpdating = false;
  error: string | null = null;
  isMobile = false;
  expandedRow: Task | null = null;
  private subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
  ) {
    console.log('TasksListComponent initialized');
    // Monitor screen size changes
    const layoutChanges = this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, '(max-width: 960px)'])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
    this.subscriptions.add(layoutChanges);
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadTasks(): void {
    console.log('Loading tasks...');
    this.isLoading = true;
    this.error = null;

    const sub = this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('Tasks loaded successfully:', tasks);
        this.dataSource.data = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.error = 'שגיאה בטעינת המשימות';
        this.isLoading = false;
        this.showError('שגיאה בטעינת המשימות');
      },
    });
    this.subscriptions.add(sub);
  }

  refresh(): void {
    console.log('Refreshing tasks list...');
    this.loadTasks();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleTaskCompletion(task: Task): void {
    console.log('Toggling task completion:', task);
    this.isUpdating = true;

    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    const sub = this.taskService
      .updateTask(task.taskId, updatedTask)
      .subscribe({
        next: (updatedTask) => {
          console.log('Task completion toggled successfully');
          const index = this.dataSource.data.findIndex(
            (t) => t.taskId === task.taskId,
          );
          if (index !== -1) {
            const updatedData = [...this.dataSource.data];
            updatedData[index] = updatedTask;
            this.dataSource.data = updatedData;
          }
          this.showSuccess('סטטוס המשימה עודכן בהצלחה');
          this.isUpdating = false;
        },
        error: (error) => {
          console.error('Error toggling task completion:', error);
          this.showError('שגיאה בעדכון סטטוס המשימה');
          this.isUpdating = false;
        },
      });
    this.subscriptions.add(sub);
  }

  deleteTask(taskId: string): void {
    console.log('Deleting task:', taskId);
    if (confirm('האם אתה בטוח שברצונך למחוק משימה זו?')) {
      this.isLoading = true;

      const sub = this.taskService.deleteTask(taskId).subscribe({
        next: () => {
          console.log('Task deleted successfully');
          this.loadTasks();
          this.showSuccess('המשימה נמחקה בהצלחה');
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.showError('שגיאה במחיקת המשימה');
          this.isLoading = false;
        },
      });
      this.subscriptions.add(sub);
    }
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      pending: 'ממתין',
      'in-progress': 'בביצוע',
      completed: 'הושלם',
      cancelled: 'בוטל',
    };
    return statusMap[status] || status;
  }

  getPriorityText(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      low: 'נמוכה',
      medium: 'בינונית',
      high: 'גבוהה',
    };
    return priorityMap[priority] || priority;
  }

  // Mobile view helpers
  toggleRow(row: Task): void {
    this.expandedRow = this.expandedRow === row ? null : row;
  }

  isRowExpanded(row: Task): boolean {
    return this.expandedRow === row;
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
}
