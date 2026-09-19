export interface StoredUser {
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  zip: string;
  address: string;
  billing: string;
}

export interface CurrentUser {
  name: string;
  email: string;
}
