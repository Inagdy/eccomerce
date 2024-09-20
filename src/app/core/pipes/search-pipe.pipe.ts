import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
  standalone: true,
})
export class SearchPipePipe implements PipeTransform {
  transform(arrayofObject: any[], text: string): any[] {
    return arrayofObject.filter((item) => item.title.toLowerCase().includes(text)  );
  }
}
