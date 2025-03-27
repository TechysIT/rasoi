import { CustomerStatus, OrderStatus, OrderType } from "@prisma/client";

//organization
export interface OrganizationLoginRequestBody {
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
}

// employee

export interface RegisterEmployeeRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  storeId: string;
  roleId: string;
  address: string;
}

export interface LoginRequestBody {
  email: string;
  pin: string;
}

// store
export interface StoreRegister {
  name: string;
  logo?: string;
  organizationId: string;
  taxRate?: number;
  theme?: string;
  printer?: string;
  paperSize?: string;
  updateAvailable?: boolean;
}

// customer
export interface CustomerRegister {
  storeId: string;
  name: string;
  email?: string;
  phone?: string;
  status?: CustomerStatus;
  updatedBy?: string;
  primaryAddress?: string;
}

// inventory
export interface InventoryRegister {
  storeId: string;
  name: string;
  quantity: number;
  threshold?: number;
  createdBy: string;
  supplier: string;
}

//category
export interface CategoryRegister {
  storeId: string;
  name: string;
  status: boolean;
  categoryIndex: number;
}

// dish
export interface DishRegister {
  storeId: string;
  name: string;
  categoryId: string;
  cost: number;
  picturePath?: string;
  createdBy: string;
}

// addons
export interface AddonRegister {
  storeId: string;
  name: string;
  variations?: string;
  mandatory: boolean;
  cost: number;
  itemsUsed?: string;
}

// order
export interface OrderRegister {
  customerId: string;
  orderType: OrderType;
  status: OrderStatus;
  price: number;
  createdBy: string;
  employeeId: string;
  storeId: string;
  dishes: string[];
}
export interface OrderLogRegister {
  orderId: string;
  storeId: string;
  status: OrderStatus;
  updatedBy: string;
}

// role
export interface RoleRegister {
  name: string;
  permissions: any;
  storeId: string;
}
