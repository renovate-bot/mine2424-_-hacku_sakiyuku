export class SchoolEntity {
  readonly id: number;
  readonly name: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly phone: string;
  readonly website: string;
  readonly email: string;
  readonly image: string;
  readonly description: string;
  readonly latitude: string;
  readonly longitude: string;

  constructor(
    id: number,
    name: string,
    address: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    website: string,
    email: string,
    image: string,
    description: string,
    latitude: string,
    longitude: string
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
    this.website = website;
    this.email = email;
    this.image = image;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
