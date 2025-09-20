import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form.component.html',   // 👈 external HTML
  styleUrls: ['./transaction-form.component.css']     // 👈 external CSS
})
export class TransactionFormComponent {
  @Output() transactionAdded = new EventEmitter<Transaction>();

  description = '';
  amount: number | null = null;
  type: 'income' | 'expense' = 'expense';
  category = 'Food';
  categories = ['Food','Travel','Bills','Entertainment','Salary','Other'];

  onSubmit() {
    if (!this.description || this.amount === null) return;

    const t: Transaction = {
      id: Date.now(),
      description: this.description,
      amount: Number(this.amount),
      type: this.type,
      category: this.category,
      date: new Date().toISOString()
    };

    this.transactionAdded.emit(t);

    // reset form
    this.description = '';
    this.amount = null;
    this.type = 'expense';
    this.category = 'Food';
  }
}
