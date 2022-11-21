import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(posts: any, category = ''): any {
    if(!category) {
      return posts
    }
    return posts.filter((posts: any) => {
      return posts.category.toLowerCase() == category.toLowerCase()
    })
  }

}
