import { FilterByOrPipe } from "projects/centeva-core/src/pipes/filter-by-or.pipe";


describe('Filter By OR Pipe Tests', () => {
  var pipe = new FilterByOrPipe();

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
    const results = pipe.transform(objs, {Name: 'bo', Id: 1});
    expect(results.length).toBe(4);
  });


 
});
