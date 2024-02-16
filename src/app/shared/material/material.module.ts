import { NgModule } from '@angular/core';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';

@NgModule({
  imports: [MatButtonModule, MatSlideToggleModule],
  exports: [MatButtonModule, MatSlideToggleModule],
  providers: [],
})
export class MaterialModule {}
