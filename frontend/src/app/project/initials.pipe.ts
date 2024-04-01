import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(text: string | null | undefined): string {
    if (!text) {
      return '';
    }

    const words = text.split(/[\s\-_]+/);
    if (words.length === 1) {
      // Handle single word: take first and last letter (if it has at least 2 characters)
      if (text.length >= 2) {
        return text.charAt(0).toUpperCase() + text.charAt(text.length - 1).toUpperCase();
      } else {
        // If less than 2 characters, return the entire word uppercase
        return text.toUpperCase();
      }
    }
    return words.map(word => word.charAt(0).toUpperCase()).join('');
  }

}
