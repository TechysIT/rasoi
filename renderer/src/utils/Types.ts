export type CategoryTypes = {
  value: string;
  label: string;
}[];

export enum OrderStatus {
  PROCESSING = "processing",
  DELIVERED = "delivered",
  REMOVED = "removed",
}

export enum OrderType {
  DINE_IN = "dine-in",
  TAKEAWAY = "takeaway",
  DELIVERY = "delivery",
}

export enum DeliveryStatus {
  DELIVERED = "delivered",
  PENDING = "pending",
  CANCELLED = "cancelled",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
}

// order
export type OrderData = {
  id: string;
  dateTime: string;
  orderType: string;
  customerName: string;
  items: string;
  orderStatus: string;
  amount: number;
  paymentStatus: string;
  notes?: string;
  createdBy: string;
};

export interface OrderManageData {
  id: string;
  storeId: string;
  customerId: string;
  orderType: "DINE_IN" | "TAKEAWAY" | "DELIVERY";
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  deliveryStatus: "PENDING" | "DELIVERED" | "IN_PROGRESS";
  amount: number;
  paymentStatus: string;
  peakAt: string | null;
  popularFoodItem: string | null;
  repeatCustomer: boolean;
  feedbackScore: number;
  notes: string;
  assignedStaff: string | null;
  createdBy: string;
  updatedOn: string;
  createdAt: string;
  deletedAt: string | null;
  OrderItems: OrderManageDataOrderItem[];
  customer: OrderManageDataCustomer;
}

export interface OrderManageDataOrderItem {
  id: string;
  orderId: string;
  dishId: string;
  dishName: string;
  quantity: number;
  price: number;
  dish: OrderManageDataDish;
  OrderItemAddons: OrderManageDataOrderItemAddon[];
}

export interface OrderManageDataDish {
  id: string;
  name: string;
  rating: number;
  addOns: any;
  bowls: number;
  persons: number;
  price: number;
  imageUrl: string | null;
  itemDetails: string;
  deletedAt: string | null;
  storeId: string;
  employeeId: string;
  categoryId: string;
}

export interface OrderManageDataOrderItemAddon {
  id: string;
  orderItemId: string;
  addonId: string;
  addonName: string;
  addonPrice: number;
  addon: OrderManageDataAddon;
}

export interface OrderManageDataAddon {
  id: string;
  dishId: string;
  storeId: string;
  name: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface OrderManageDataCustomer {
  id: string;
  storeId: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type OrderAnalysisData = {
  id: string;
  dateTime: string;
  orderType: OrderType;
  customerName: string;
  customerContact: string;
  dishes: { name: string; quantity: number }[];
  status: OrderStatus;
  amount: number;
  paymentStatus: string;
  peakAt: string;
  popularFoodItem: string;
  repeatCustomer: boolean;
  feedbackScore: number;
  profitMargin: number;
  assignedStaff: string;
  deliveryStatus: DeliveryStatus;
  notes: string;
  updatedOn: string;
  createdBy: string;
};

export type InventoryStockData = {
  id: string;
  storeId?: string;
  name: string;
  createdBy: string;
  threshold: number;
  quantity: number;
  supplier: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type InventoryCategoryData = {
  id: string;
  name: string;
  status: boolean;
  categoryIndex: number;
};
export type InventoryGRNData = {
  id: string;
  name: string;
  supplier: string;
  recivedDate: string;
  recivedby: string;
  qty: number;
  category: string;
  amount: number;
  items: number;
};
export type DishesManagementData = {
  id: string;
  name: string;
  rating: number | null;
  bowls: number;
  persons: number;
  price: number;
  imageUrl: string | null;
  itemDetails: string | null;
  deletedAt: string | null;
  // storeId: string;
  // employeeId: string | null;
  // categoryId: string | null;
  createdBy: string | null;
  categoryName: string | null;
  dishInventories: {
    id: string;
    inventoryItemId: string;
    itemName: string;
    quantity: number;
    defaultSelected: number;
  }[];
  addons: {
    id: string;
    name: string;
    price: number;
  }[];
};

export type AddOnsTypes = {
  id: string;
  name: string;
  price: number;
  dishId?: string;
  storeId?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type UserList = {
  id: string;
  storeId: string;
  roleName: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  avatarPath: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  lastLogin: string | null;
};

export type UserRoles = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  storeId: string;
  userManagement: boolean;
  orderManagement: boolean;
  inventoryManagement: boolean;
  reportManagement: boolean;
  menuManagement: boolean;
  settingManagement: boolean;
  roleManagement: boolean;
  kithiManagement: boolean;
  cashManagement: boolean;
  customerManagement: boolean;
  supplierManagement: boolean;
};

export type Order = {
  item: string;
  quantity: number;
};

export type CustomerData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: Order[];
  createdAt: string;
  // status: OrderStatus;
  createdBy: string;
  updatedBy: string;
  deletedAt?: string | null;
};

export enum PaymentMethod {
  cash = "Cash",
  bank = "Bank Transfer",
  card = "Credit Card",
}
export type ExpenseData = {
  id: string;
  date: string;
  category: string;
  amount: number;
  paymentMethod: PaymentMethod;
  supplier: string;
};

export interface Table {
  id: string;
  name: string;
  chairs: number;
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED" | "MERGED";
  customerName?: string;
  reservationName?: string;
  reservationTime?: string;
  mergedIntoId?: string;
  mergedTables?: Table[];
}
