import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ExpenseChartComponent } from './expense-chart/expense-chart.component';
import { Transaction } from './models/transaction.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TransactionFormComponent, TransactionListComponent, ExpenseChartComponent],
  template: `
    <div class="container">
      <h1>💰 Expense Tracker</h1>
      <div class="row">
        <div class="card">
          <h3>Add Transaction</h3>
          <app-transaction-form (transactionAdded)="addTransaction($event)"></app-transaction-form>
        </div>
        <div class="card">
          <h3>Summary</h3>
          <p><strong>Balance:</strong> {{ getBalance() | currency:'INR':'symbol' }}</p>
          <p><strong>Total Income:</strong> {{ getTotalIncome() | currency:'INR':'symbol' }}</p>
          <p><strong>Total Expense:</strong> {{ getTotalExpense() | currency:'INR':'symbol' }}</p>
        </div>
      </div>

      <div class="card transactions">
        <h3>Transactions</h3>
        <app-transaction-list [transactions]="transactions" (remove)="removeTransaction($event)"></app-transaction-list>
      </div>

      <div class="card">
        <h3>Expenses by Category</h3>
        <app-expense-chart [transactions]="transactions"></app-expense-chart>
      </div>
    </div>
  `
})
export class AppComponent {
  transactions: Transaction[] = [];

  addTransaction(transaction: Transaction) {
    this.transactions = [transaction, ...this.transactions];
  }

  removeTransaction(id: number) {
    this.transactions = this.transactions.filter(t => t.id !== id);
  }

  getTotalIncome() {
    return this.transactions.filter(t=>t.type==='income').reduce((s,n)=> s + n.amount, 0);
  }
  getTotalExpense() {
    return this.transactions.filter(t=>t.type==='expense').reduce((s,n)=> s + n.amount, 0);
  }
  getBalance() {
    return this.getTotalIncome() - this.getTotalExpense();
  }
}