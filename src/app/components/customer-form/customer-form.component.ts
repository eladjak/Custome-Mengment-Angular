import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customerForm: FormGroup;
  isEditMode = false;
  customerId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    console.log('CustomerFormComponent initialized');
    this.customerForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      area: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    this.customerId = this.route.snapshot.paramMap.get('id');
    if (this.customerId) {
      this.isEditMode = true;
      this.loadCustomer();
    }
  }

  // Load customer data in edit mode
  loadCustomer(): void {
    if (this.customerId) {
      console.log('Loading customer data for ID:', this.customerId);
      this.customerService.getCustomer(this.customerId).subscribe({
        next: (customer) => {
          console.log('Customer data loaded:', customer);
          this.customerForm.patchValue(customer);
        },
        error: (error) => {
          console.error('Error loading customer:', error);
        }
      });
    }
  }

  // Submit form
  onSubmit(): void {
    if (this.customerForm.valid) {
      console.log('Form submitted:', this.customerForm.value);

      if (this.isEditMode && this.customerId) {
        this.customerService.updateCustomer(this.customerId, this.customerForm.value).subscribe({
          next: () => {
            console.log('Customer updated successfully');
            this.router.navigate(['/customers']);
          },
          error: (error) => {
            console.error('Error updating customer:', error);
          }
        });
      } else {
        this.customerService.createCustomer(this.customerForm.value).subscribe({
          next: () => {
            console.log('Customer created successfully');
            this.router.navigate(['/customers']);
          },
          error: (error) => {
            console.error('Error creating customer:', error);
          }
        });
      }
    }
  }
}
