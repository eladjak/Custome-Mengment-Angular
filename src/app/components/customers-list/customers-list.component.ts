import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

/**
 * קומפוננטה להצגת רשימת הלקוחות
 */
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  /** העמודות שיוצגו בטבלה */
  displayedColumns: string[] = [
    'id',
    'name',
    'area',
    'phone',
    'email',
    'actions',
  ];
  /** מקור הנתונים לטבלה */
  dataSource: MatTableDataSource<Customer>;
  /** האם הקומפו��נטה במצב טעינה */
  isLoading = false;
  /** הודעת שגיאה להצגה */
  error: string | null = null;
  expandedRow: Customer | null = null;
  isMobile = false;
  private subscriptions = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
  ) {
    console.log('אתחול קומפוננטת רשימת לקוחות');
    this.dataSource = new MatTableDataSource<Customer>([]);

    // Monitor screen size changes
    this.subscriptions.add(
      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small, '(max-width: 960px)'])
        .subscribe((result) => {
          this.isMobile = result.matches;
        }),
    );
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * טעינת רשימת הלקוחות מהשרת
   */
  loadCustomers(): void {
    this.isLoading = true;
    this.error = null;

    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.dataSource.data = customers;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'שגיאה בטעינת הלקוחות. אנא נסה שוב.';
        this.isLoading = false;
        console.error('Error loading customers:', error);
        this.snackBar.open('שגיאה בטעינת הלקוחות', 'סגור', {
          duration: 3000,
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
        });
      },
    });
  }

  /**
   * רענון רשימת הלקוחות
   */
  refresh(): void {
    this.loadCustomers();
  }

  /**
   * הפעלת פילטר על הטבלה
   * @param event אירוע שינוי טקסט ב��דה החיפוש
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * רחיקת לקוח
   * @param id מזהה הלקוח למחיקה
   */
  deleteCustomer(id: string): void {
    if (confirm('האם אתה בטוח שברצונך למחוק לקוח זה?')) {
      this.isLoading = true;
      this.customerService.deleteCustomer(id).subscribe({
        next: () => {
          this.loadCustomers();
          this.snackBar.open('הלקוח נמחק בהצלחה', 'סגור', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
          });
        },
        error: (error) => {
          this.error = 'שגיאה במחיקת הלקוח. אנא נסה שוב.';
          this.isLoading = false;
          console.error('Error deleting customer:', error);
          this.snackBar.open('שגיאה במחיקת הלקוח', 'סגור', {
            duration: 3000,
            horizontalPosition: 'start',
            verticalPosition: 'bottom',
          });
        },
      });
    }
  }

  // Mobile view helpers
  toggleRow(row: Customer): void {
    this.expandedRow = this.expandedRow === row ? null : row;
  }

  isRowExpanded(row: Customer): boolean {
    return this.expandedRow === row;
  }
}
