import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

export enum SortOrder { Ascending = "asc", Descending = "desc" };

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
    transform(collection: any[], iteratees: string | string[], orders?: SortOrder | SortOrder[]) {
        if (!collection) return collection;
        return _.orderBy(collection, iteratees, orders);
    }
}
