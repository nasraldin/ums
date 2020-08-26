import * as sharedComponents from './components';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';

/**
 * Use shared module to reference the common components, directives, and pipes.
 */
@NgModule({
  declarations: [...sharedComponents.components],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ...sharedComponents.components,
  ],
  /* NO PROVIDERS HERE! */
})
export class SharedModule {
  static forRoot(): any {
    return {
      ngModule: SharedModule,
      providers: [
        /* ALL OF YOUR SERVICES HERE!*/
      ],
    };
  }
}
