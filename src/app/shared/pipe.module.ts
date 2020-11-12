import { NgModule } from '@angular/core';
import { FormatNumberReportPipe } from 'src/app/shared/pipes/formatNumber.pipe';
import { TranslatePipe } from '../_pipe/translate';

@NgModule({
   imports: [],
   exports: [
      FormatNumberReportPipe,
      TranslatePipe
   ],
   declarations: [
      FormatNumberReportPipe,
      TranslatePipe
   ]
})

export class PipeModule { }