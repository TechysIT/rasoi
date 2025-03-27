import { Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import {
  getEmployees,
  loginEmployee,
  registerEmployees,
} from "../controllers/employee.controller";
import { getStores, registerStore } from "../controllers/store.controller";
import { addCustomer } from "../controllers/customer.controller";
import {
  addInventory,
  getInventory,
} from "../controllers/inventory.controller";
import { addCategory, getCategories } from "../controllers/category.controller";
import { getAddons, getDishes } from "../controllers/dish.controller";
import { createRole, getRoles } from "../controllers/role.controller";

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

//order
// router.route("/order/create").post(createOrder);

//inventory
// router.route("/inventory/add").post(addInventory);
router.route("/inventory/get/:storeId").get(getInventory);

// category
router.route("/category/add").post(addCategory);
router.route("/category/get/:storeId").get(getCategories);

// dish
// router.route("/dish/add").post(upload.single("picturePath"), addDish);
// router.route("/dish/addon").post(addAddon);
// router.route("/addon/get/:storeId").get(getAddons);
router.route("/dish/get/:storeId").get(getDishes);
// role
// router.route("/role/create").post(createRole);
router.get("/roles/:storeId", getRoles);

export default router;
