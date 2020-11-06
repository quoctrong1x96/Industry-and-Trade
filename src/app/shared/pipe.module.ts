import { NgModule } from '@angular/core';
import { FormatNumberReportPipe } from 'src/app/shared/pipes/formatNumber.pipe';

@NgModule({
   imports :[],
   exports : [
    FormatNumberReportPipe
   ],
   declarations: [
    FormatNumberReportPipe
   ]
})

export class PipeModule{}