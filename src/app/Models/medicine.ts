import ObjectID from 'bson-objectid';

export class Medicine {
  constructor(
    public Name?: string,
    public Dose?: number,
    public Price?: number,
    public Stock?: number,
    public _id?: ObjectID
  ) {}
}
