import { StringFilterCriteria } from './StringFilterCriteria';

export class SearchCriteriaRequest {
	public FilterCriteria: StringFilterCriteria[]  = [];
	public FilterCriteriaOr: StringFilterCriteria[]  = [];
	public PageNumber: number ;
	public PageSize: number ;
	public SortDirection: string ;
	public SortProperty: string ;

	public constructor(
		fields?: Partial<SearchCriteriaRequest>) {

		if (fields) {



			if (fields.FilterCriteria) { fields.FilterCriteria = fields.FilterCriteria.map(x => new StringFilterCriteria(x)); }
			if (fields.FilterCriteriaOr) { fields.FilterCriteriaOr = fields.FilterCriteriaOr.map(x => new StringFilterCriteria(x)); }
			Object.assign(this, fields);
		}
	}
}
