import { FilterByPipe } from "./filter-by.pipe";

describe('Filter By Pipe Tests', () => {
  var pipe = new FilterByPipe();

  it('should be to filter array of objects', () => {
    const objs = [
      {Name: 'bob', Id: 1},
      {Name: 'bobby', Id: 2},
      {Name: 'carl', Id: 1},
      {Name: 'bo', Id: 2},
    ]
    const results = pipe.transform(objs, {Name: 'bo'});
    expect(results.length).toBe(3);
  });

  it('should be to filter array of objects by two keys', () => {
    const objs = [
      {Name: 'bob', Id: 1},
      {Name: 'bobby', Id: 2},
      {Name: 'carl', Id: 1},
      {Name: 'bo', Id: 2},
    ]
    const results = pipe.transform(objs, {Name: 'bo', Id: 2});
    expect(results.length).toBe(2);
  });

  it('should be to filter array of objects by two keys and handle case sensitivity', () => {
    const objs = [
      {Name: 'Bob', Id: 1},
      {Name: 'Bobby', Id: 2},
      {Name: 'Carl', Id: 1},
      {Name: 'Bo', Id: 2},
    ]
    const results = pipe.transform(objs, {Name: 'bo', Id: 2});
    expect(results.length).toBe(2);
  });

});
