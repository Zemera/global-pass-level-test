import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'filterPropretyBookValue' , pure:false})
export class FilterPropretyBookValue implements PipeTransform {

  transform(books: any[], proprety: any): any {
    if (proprety == 'lang')
      return Array.from(new Set(books.map(book => book[proprety].name)))
    if (proprety == 'author')
      return Array.from(new Set(books.map(book => book[proprety].fullName)))
    return Array.from(new Set(books.map(book => book[proprety])))
  }

}