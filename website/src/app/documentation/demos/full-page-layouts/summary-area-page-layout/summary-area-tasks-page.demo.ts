import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'clr-summary-area-tasks-page-demo',
  template: `
    <div class="tasks-header">
      <h3 style="margin-top: 0">Open Tasks for John Doe</h3>
      <p>You have 5 open tasks assigned.</p>
    </div>

    <clr-datagrid>
      <clr-dg-column>Task</clr-dg-column>
      <clr-dg-column>Status</clr-dg-column>
      <clr-dg-column>Due Date</clr-dg-column>
      <clr-dg-column>Actions</clr-dg-column>

      <clr-dg-row *ngFor="let task of tasks">
        <clr-dg-cell>{{ task.title }}</clr-dg-cell>
        <clr-dg-cell>{{ task.status }}</clr-dg-cell>
        <clr-dg-cell>{{ task.due | date : 'yyyy-MM-dd' }}</clr-dg-cell>
        <clr-dg-cell>
          <button class="btn btn-sm" (click)="viewTask(task)">View</button>
          <button class="btn btn-sm" (click)="completeTask(task)" [disabled]="task.status === 'Completed'">
            Complete
          </button>
        </clr-dg-cell>
      </clr-dg-row>
    </clr-datagrid>
  `,
  standalone: false,
})
export class SummaryAreaTasksPageDemo {
  tasks = [
    { title: 'Submit monthly report', status: 'Open', due: new Date('2026-06-10') },
    { title: 'Review project plan', status: 'Open', due: new Date('2026-06-12') },
    { title: 'Update profile information', status: 'Open', due: new Date('2026-06-15') },
    { title: 'Approve budget request', status: 'Open', due: new Date('2026-06-18') },
    { title: 'Schedule team meeting', status: 'Open', due: new Date('2026-06-20') },
  ];

  viewTask(task: any) {
    alert('Viewing task: ' + task.title);
  }

  completeTask(task: any) {
    task.status = 'Completed';
    alert('Task marked as completed: ' + task.title);
  }
}
