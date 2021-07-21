
export class StringFilterCriteria {
	public Operand: string ;
	public PropertyName: string ;
	public Value: string ;
	public Value2: string ;

	public constructor(
		fields?: Partial<StringFilterCriteria>) {

		if (fields) {




			Object.assign(this, fields);
		}
	}
}
