import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let t of transactions" class="transaction">
      <div>
        <div><strong>{{t.description}}</strong></div>
        <div class="small">{{t.category}} • {{t.date | date:'short'}}</div>
      </div>
      <div>
        <div [ngClass]="{'amount': true, 'income': t.type==='income', 'expense': t.type==='expense'}">
          {{ t.amount | currency:'INR':'symbol' }}
        </div>
        <div><button (click)="remove.emit(t.id)">Delete</button></div>
      </div>
    </div>
  `
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Output() remove = new EventEmitter<number>();
}