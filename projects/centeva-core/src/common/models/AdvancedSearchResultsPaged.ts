
export class AdvancedSearchResultsPaged<T> {
	public FirstItemOnPage: number ;
	public HasNextPage: boolean ;
	public HasPreviousPage: boolean ;
	public IsFirstPage: boolean ;
	public IsLastPage: boolean ;
	public LastItemOnPage: number ;
	public PageNumber: number ;
	public PageSize: number ;
	public Records: any[]  = [];
	public TotalItems: number ;
	public TotalPages: number ;

	public constructor(
		type: { new(...args: unknown[]): T },
		fields?: Partial<AdvancedSearchResultsPaged<T>>) {

		if (fields) {



			if (fields.Records) { fields.Records = fields.Records.map(x => new type(x)); }
			Object.assign(this, fields);
		}
	}
}
