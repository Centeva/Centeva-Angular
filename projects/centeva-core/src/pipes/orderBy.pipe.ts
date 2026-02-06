import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash-es';

export enum SortOrder { Ascending = "asc", Descending = "desc" };

@Pipe({
    name: 'orderBy',
    standalone: false
})
export class OrderByPipe implements PipeTransform {
    transform(collection: any[], iteratees: string | string[], orders?: SortOrder | SortOrder[]) {
        if (!collection) return collection;
        for (let i = 0; i < collection.length; ++i) {
            if (typeof collection[i] === 'string')
                collection[i] = (collection[i] as string).toLowerCase();
        }

        return orderBy(collection, iteratees, orders);
    }
}
