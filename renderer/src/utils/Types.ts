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

export type OrderManageData = {
  id: string;
  status: OrderStatus;
  orderType: OrderType;
  dateTime: string;
  updatedOn: string;
  dishes: { name: string; quantity: number }[];
  price: number;
  customerName: string;
  createdBy: string;
};

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
  pictures: string;
  name: string;
  categoryId: string;
  addedOn: string;
  showOnMenu: boolean;
  cost: number;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  storeId: string;
  itemUsed: {
    id: string;
    storeId: string;
    name: string;
    quantity: number;
    threshold: number;
    supplier: string;
    createdById: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }[];
};

export type AddOnsTypes = {
  id: string;
  name: string;
  variations: string;
  itemUsed: string;
  mandatory: boolean;
  price: number;
  createdBy: string;
};

export type UserList = {
  id: string;
  franchise: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  lastLogin: string;
  createdOn: string;
};

export type UserRoles = {
  id: string;
  name: string;
  permissions: string[];
  createdby: string;
};

export type Order = {
  item: string;
  quantity: number;
};

export type CustomerData = {
  id: string;
  name: string;
  orders: Order[];
  createdAt: string;
  status: OrderStatus;
  createdBy: string;
  updatedBy: string;
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

export type Table = {
  id: number;
  name: string;
  chairs: number;
  status: "available" | "occupied" | "reserved";
  customerName?: string;
  reservationName?: string;
  reservationTime?: string;
  mergedFrom?: number[];
  merged?: boolean;
};
