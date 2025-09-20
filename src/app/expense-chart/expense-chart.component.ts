import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
  <div style="width: 300px; height: 300px; margin: auto;">
  <canvas baseChart
    [data]="pieChartData"
    [options]="pieChartOptions"
    [type]="'pie'">
  </canvas>
</div>

  `
})
export class ExpenseChartComponent {
  @Input() transactions: Transaction[] = [];
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderWidth: 1
      }
    ]
  };

 pieChartOptions: ChartOptions<'pie'> = {
  responsive: false,   // disable auto-scaling
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        font: { size: 14 }
      }
    }
  }
};


  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    const expenses = this.transactions.filter(t => t.type === 'expense');
    const grouped: { [key: string]: number } = {};

    expenses.forEach(e => {
      grouped[e.category] = (grouped[e.category] || 0) + e.amount;
    });

    const categories = Object.keys(grouped);
    const amounts = Object.values(grouped);

    this.pieChartData.labels = categories;
    this.pieChartData.datasets[0].data = amounts;

    // Assign colors dynamically, repeating if more categories than colors
    const baseColors = [
      '#4CAF50', '#FF5722', '#2196F3',
      '#FFC107', '#9C27B0', '#E91E63'
    ];
    this.pieChartData.datasets[0].backgroundColor =
      categories.map((_, i) => baseColors[i % baseColors.length]);

    // Refresh chart
    this.chart?.update();
  }
}
