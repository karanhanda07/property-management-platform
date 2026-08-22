CREATE TABLE properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  total_units INTEGER NOT NULL
);
CREATE TABLE owners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL
);
CREATE TABLE units (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  unit_number TEXT NOT NULL,
  owner_id INTEGER NOT NULL,
  is_rented INTEGER NOT NULL DEFAULT 0,

  FOREIGN KEY (property_id) REFERENCES properties(id),
  FOREIGN KEY (owner_id) REFERENCES owners(id)
);
CREATE TABLE tenants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL
);
CREATE TABLE leases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  unit_id INTEGER NOT NULL,
  tenant_id INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  rent_amount REAL NOT NULL,
  security_deposit REAL NOT NULL,
  status TEXT NOT NULL,

  FOREIGN KEY (unit_id) REFERENCES units(id),
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);