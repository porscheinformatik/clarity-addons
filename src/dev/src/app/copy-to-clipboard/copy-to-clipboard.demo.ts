/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule, ClrCopyToClipboard } from '@porscheinformatik/clr-addons';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface TreeNode {
  name: string;
  code: string;
  children?: TreeNode[];
}

@Component({
  selector: 'copy-to-clipboard-demo',
  templateUrl: './copy-to-clipboard.demo.html',
  standalone: true,
  imports: [CommonModule, ClarityModule, ClrAddonsModule, ClrCopyToClipboard],
})
export class CopyToClipboardDemo {
  users: User[] = [
    { id: 'USR-001', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 'USR-002', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
    { id: 'USR-003', name: 'Carol Williams', email: 'carol@example.com', role: 'Viewer' },
    { id: 'USR-004', name: 'David Brown', email: 'david@example.com', role: 'Editor' },
  ];

  treeData: TreeNode[] = [
    {
      name: 'Engineering',
      code: 'ENG-100',
      children: [
        { name: 'Frontend', code: 'ENG-110' },
        { name: 'Backend', code: 'ENG-120' },
      ],
    },
    {
      name: 'Marketing',
      code: 'MKT-200',
      children: [{ name: 'Digital', code: 'MKT-210' }],
    },
  ];

  tableRows = [
    { label: 'Order Number', value: 'ORD-2026-4815' },
    { label: 'Tracking ID', value: 'TRK-XJ9K2M' },
    { label: 'Invoice Reference', value: 'INV-2026-03-001' },
  ];

  getChildren = (node: TreeNode): TreeNode[] => node.children || [];
}
