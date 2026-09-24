/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
/**
 * A custom export type together with a required id (for identification) and optional custom label.
 */
export interface CustomExportType {
  id: string; // used to differentiate across custom export types
  value?: string;
}
