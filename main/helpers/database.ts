import path from "path";
import { app } from "electron";
import Database from "better-sqlite3";
import fs from "fs";

// Initialize SQLite database
const dbPath = path.join(app.getPath("userData"), "local.db");
// console.log(dbPath);

// Check if the database exists and delete it

// if (fs.existsSync(dbPath)) {
//   fs.unlinkSync(dbPath);
//   console.log("Deleted the existing database file.");
// }

// Create a new instance of the database
const db = new Database(dbPath, {});

// Define the schema
const schema = `
  CREATE TABLE IF NOT EXISTS stores (
    id TEXT PRIMARY KEY,
    name TEXT,
    logo TEXT,
    organizationId TEXT,
    taxRate INTEGER,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT
  );

  CREATE TABLE IF NOT EXISTS device_settings (
    id TEXT PRIMARY KEY,
    storeId TEXT,
    theme TEXT,
    printer TEXT,
    paperSize TEXT,
    updateAvailable INTEGER,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id)
  );

  CREATE TABLE IF NOT EXISTS social_links (
    id TEXT PRIMARY KEY,
    storeId TEXT,
    platform TEXT,
    url TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id)
  );

  CREATE TABLE IF NOT EXISTS vouchers (
    id TEXT PRIMARY KEY,
    storeId TEXT,
    code TEXT UNIQUE,
    discount REAL,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id)
  );

  CREATE TABLE IF NOT EXISTS roles (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE,
    storeId TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    userManagement INTEGER DEFAULT 0,
    orderManagement INTEGER DEFAULT 0,
    inventoryManagement INTEGER DEFAULT 0,
    reportManagement INTEGER DEFAULT 0,
    menuManagement INTEGER DEFAULT 0,
    settingManagement INTEGER DEFAULT 0,
    roleManagement INTEGER DEFAULT 0,
    kitchenManagement INTEGER DEFAULT 0,
    cashManagement INTEGER DEFAULT 0,
    customerManagement INTEGER DEFAULT 0,
    supplierManagement INTEGER DEFAULT 0,
    FOREIGN KEY (storeId) REFERENCES stores(id)
  );

  CREATE TABLE IF NOT EXISTS employees (
    id TEXT PRIMARY KEY,
    storeId TEXT,
    roleId TEXT,
    firstName TEXT,
    lastName TEXT,
    phone TEXT,
    address TEXT,
    email TEXT UNIQUE,
    avatarPath TEXT,
    password TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    lastLogin TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id),
    FOREIGN KEY (roleId) REFERENCES roles(id)
  );

  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    storeId TEXT,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    storeId TEXT NOT NULL,
    customerId TEXT,
    orderType TEXT,
    status TEXT NOT NULL,
    deliveryStatus TEXT NOT NULL,
    amount REAL NOT NULL,
    paymentStatus TEXT NOT NULL,
    peakAt TEXT,
    notes TEXT,
    assignedStaff TEXT,
    createdBy TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedOn TEXT NOT NULL,
    deletedAt TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id),
    FOREIGN KEY (customerId) REFERENCES customers(id),
    FOREIGN KEY (createdBy) REFERENCES employees(id) 
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id TEXT PRIMARY KEY NOT NULL,
    orderId TEXT NOT NULL,
    dishId TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    price REAL NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (dishId) REFERENCES Dish(id)
  );

  CREATE TABLE IF NOT EXISTS order_item_addons (
    id TEXT PRIMARY KEY NOT NULL,
    orderItemId TEXT NOT NULL,
    addonId TEXT NOT NULL,
    addonName TEXT NOT NULL,
    addonPrice REAL NOT NULL,
    FOREIGN KEY (orderItemId) REFERENCES order_items(id),
    FOREIGN KEY (addonId) REFERENCES addons(id)
  );

  CREATE TABLE IF NOT EXISTS order_logs (
    id TEXT PRIMARY KEY,
    orderId TEXT,
    status TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (orderId) REFERENCES orders(id)
  );

  CREATE TABLE IF NOT EXISTS Dish (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    rating REAL,
    addOns TEXT, 
    bowls INTEGER DEFAULT 1,
    persons INTEGER DEFAULT 1,
    price REAL NOT NULL,
    imageUrl TEXT,
    itemDetails TEXT,
    deletedAt DATETIME,
    storeId TEXT,
    employeeId TEXT,
    categoryId TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id) ON DELETE SET NULL,
    FOREIGN KEY (employeeId) REFERENCES employees(id) ON DELETE SET NULL,
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL
 );

  CREATE TABLE IF NOT EXISTS DishInventory (
    id TEXT PRIMARY KEY NOT NULL,
    dishId TEXT NOT NULL,
    inventoryItemId TEXT NOT NULL,
    defaultSelected INTEGER DEFAULT 0,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY (dishId) REFERENCES Dish(id) ON DELETE CASCADE,
    FOREIGN KEY (inventoryItemId) REFERENCES inventory(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS addons (
    id TEXT PRIMARY KEY,
    dishId TEXT,
    storeId TEXT,
    name TEXT,
    price REAL,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (dishId) REFERENCES Dish(id),
    FOREIGN KEY (storeId) REFERENCES stores(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS inventory (
    id TEXT PRIMARY KEY,
    storeId TEXT,
    name TEXT,
    quantity INTEGER,
    threshold INTEGER,
    supplier TEXT,
    createdBy TEXT,
    createdById TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id) ON DELETE CASCADE,
    FOREIGN KEY (createdById) REFERENCES employees(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS categories (
    id TEXT PRIMARY KEY,
    storeId TEXT,
    name TEXT,
    status INTEGER,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id)
  );

  CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    storeId TEXT,
    reportType TEXT,
    data TEXT,
    createdAt TEXT,
    updatedAt TEXT,
    deletedAt TEXT,
    FOREIGN KEY (storeId) REFERENCES stores(id)
  );

  CREATE TABLE IF NOT EXISTS employee_cash_flows (
    id TEXT PRIMARY KEY,
    employeeId TEXT NOT NULL,
    type TEXT NOT NULL, -- 'CASH_IN' or 'CASH_OUT'
    amount REAL NOT NULL,
    reason TEXT NOT NULL,
    pdfUrl TEXT, -- local file path or url
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    storeId TEXT NOT NULL,
    FOREIGN KEY (employeeId) REFERENCES employees(id),
    FOREIGN KEY (storeId) REFERENCES stores(id)
  );

  CREATE TABLE IF NOT EXISTS tables (
    id TEXT PRIMARY KEY,
    storeId TEXT NOT NULL,
    name TEXT NOT NULL,
    chairs INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'AVAILABLE', -- AVAILABLE, OCCUPIED, RESERVED, MERGED
    customerName TEXT,
    reservationName TEXT,
    reservationTime TEXT,
    mergedIntoId TEXT, -- references another table's id if merged
    deletedAt TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (storeId) REFERENCES stores(id),
    FOREIGN KEY (mergedIntoId) REFERENCES tables(id)
  );
`;

db.exec(schema);

export default db;
