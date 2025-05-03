import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import {
  getEmployees,
  loginEmployee,
  registerEmployees,
} from "../controllers/employee.controller";
import { getStores, registerStore } from "../controllers/store.controller";
import { getCustomers } from "../controllers/customer.controller";
import {
  addInventory,
  getInventory,
} from "../controllers/inventory.controller";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategoryStatus,
} from "../controllers/category.controller";
import {
  deleteAddon,
  deleteDish,
  getAddons,
  getAddonsByStoreId,
  getDishes,
  getDishInventory,
} from "../controllers/dish.controller";
import { createRole, getRoles } from "../controllers/role.controller";
import { getTableList } from "../controllers/table.controller";
import { getOrders } from "../controllers/order.controller";

const router = Router();

// employee
router
  .route("/employee/register")
  .post(upload.single("avatarPath"), registerEmployees);

router.route("/employee/login").post(loginEmployee);
router.get("/employees/:storeId", getEmployees);

// store
router.route("/store/register").post(upload.single("logo"), registerStore);
router.route("/store/getStore").get(getStores);

//customer
// router.route("/customer/register").post(addCustomer);
router.route("/customer/get/:storeId").get(getCustomers);

//order
router.route("/order/get/:storeId").get(getOrders);

//inventory
// router.route("/inventory/add").post(addInventory);
router.route("/inventory/get/:storeId").get(getInventory);

// category
router.route("/category/add").post(addCategory);
router.route("/category/get/:storeId").get(getCategories);
router.route("/category/delete/:id").patch(deleteCategory);
router.route("/category/status/:id").patch(updateCategoryStatus);

// dish
// router.route("/dish/add").post(upload.single("picturePath"), addDish);
// router.route("/dish/addon").post(addAddon);
router.route("/dish/delete/:id").patch(deleteDish);
router.route("/dish/get/:storeId").get(getDishes);
router.route("/dishInventory/get/:dishId").get(getDishInventory);

// role
// router.route("/role/create").post(createRole);
router.get("/roles/:storeId", getRoles);

// addons
router.route("/addon/get/:dishId").get(getAddons);
router.route("/addon/delete/:id").patch(deleteAddon);
router.route("/addon/getAll/:storeId").get(getAddonsByStoreId);

// get table
router.get("/table/get/:storeId", getTableList);

export default router;
