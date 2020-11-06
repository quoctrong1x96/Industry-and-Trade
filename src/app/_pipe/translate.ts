import {Pipe, PipeTransform} from '@angular/core';
import {TRANSLATE} from '../i18n/tes'


@Pipe({
    name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    let message = TRANSLATE[value];
    return message;
  }
} 