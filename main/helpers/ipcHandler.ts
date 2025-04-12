import { ipcMain } from "electron";
import db from "./database";
import axios from "axios";

export default function ipcHandler() {
  // fetch store
  ipcMain.handle("getStores", async (_event, organizationId) => {
    console.log(
      "Received request to get stores for organizationId:",
      organizationId
    );

    try {
      const stores = db
        .prepare("SELECT * FROM stores WHERE organizationId = ?")
        .all(organizationId);

      if (stores.length > 0) {
        console.log("Returning local stores:", stores);
        return stores;
      }

      console.log("No local stores found, fetching from API...");

      const apiResponse = await axios.get(
        "http://localhost:8000/api/v1/store/getStore",
        {
          headers: {
            "Content-Type": "application/json",
            "organization-id": organizationId,
          },
        }
      );

      const apiStores = apiResponse.data.data;

      if (!Array.isArray(apiStores)) {
        console.error("Invalid API response:", apiStores);
        return [];
      }

      const insertStmt = db.prepare(`
        INSERT INTO stores (id, name, logo, taxRate, organizationId, createdAt, updatedAt, deletedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertMany = db.transaction((stores) => {
        for (const store of stores) {
          insertStmt.run(
            store.id,
            store.name,
            store.logo || null,
            store.taxRate || 0,
            store.organizationId,
            store.createdAt,
            store.updatedAt,
            store.deletedAt || null
          );
        }
      });

      insertMany(apiStores);

      console.log("Fetched stores saved to local database.");
      return apiStores;
    } catch (error) {
      console.error("Error fetching stores:", error);
      return [];
    }
  });
  //fetch employee
  ipcMain.handle("getEmployeesByStore", async (_event, storeId) => {
    // console.log("Received request to get employees for storeId:", storeId);

    try {
      // Check if roles exist for this storeId in the local database
      const existingRoles = db
        .prepare("SELECT COUNT(*) AS count FROM roles WHERE storeId = ?")
        .get(storeId) as { count: number };

      if (existingRoles.count === 0) {
        console.log("No roles found locally for storeId, fetching from API...");

        const roleApiResponse = await axios.get(
          `http://localhost:8000/api/v1/roles/${storeId}`
        );
        const roles = roleApiResponse.data.data;

        if (Array.isArray(roles) && roles.length > 0) {
          const insertRoleStmt = db.prepare(
            `INSERT INTO roles (id, name, storeId) VALUES (?, ?, ?) 
             ON CONFLICT(id) DO UPDATE SET name=excluded.name`
          );

          const insertRoles = db.transaction((roles) => {
            for (const role of roles) {
              insertRoleStmt.run(role.id, role.name, storeId);
            }
          });

          insertRoles(roles);
          console.log("Roles for storeId stored in the local database.");
        } else {
          console.error("Invalid roles API response:", roleApiResponse);
          return [];
        }
      } else {
        console.log(
          "Roles for storeId already exist locally, skipping API fetch."
        );
      }

      // Check if employees exist for this storeId in the local DB
      const employees = db
        .prepare(
          `SELECT employees.*, roles.name AS roleName 
           FROM employees 
           LEFT JOIN roles ON employees.roleId = roles.id 
           WHERE employees.storeId = ?`
        )
        .all(storeId) as {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        roleName: string;
        avatarPath: string | null;
        createdAt: string;
        updatedAt: string;
        roleId: string;
        address: string;
        deletedAt: string | null;
        storeId: string;
        lastLogin: string | null;
      }[];
      console.log("Fetched employees from local DB:", employees);
      if (employees.length > 0) {
        console.log("Returning local employees with role names:", employees);
        return employees.map((emp) => ({
          id: emp.id,
          name: `${emp.firstName} ${emp.lastName}`,
          role: emp.roleName || "Unknown Role",
          image: emp.avatarPath,
          isAdmin: emp.roleName?.toLowerCase() === "admin",
          storeId: emp.storeId,
          createdAt: new Date(emp.createdAt).toLocaleString(),
          updatedAt: new Date(emp.updatedAt).toLocaleString(),
          deletedAt: emp.deletedAt
            ? new Date(emp.deletedAt).toLocaleString()
            : null,
          email: emp.email,
          phone: emp.phone,
          address: emp.address,
          lastLogin: emp.lastLogin
            ? new Date(emp.lastLogin).toLocaleString()
            : null,
        }));
      }

      console.log("No local employees found, fetching from API...");

      // Fetch Employees from API based on storeId
      const apiResponse = await axios.get(
        `http://localhost:8000/api/v1/employees/${storeId}`
      );
      console.log("API Response:", apiResponse.data);
      const apiEmployees = apiResponse.data.data;

      if (!Array.isArray(apiEmployees)) {
        console.error("Invalid employees API response:", apiResponse);
        return [];
      }

      // Insert Employees into Local DB
      const insertEmployeeStmt = db.prepare(
        `INSERT INTO employees (
            id, storeId, firstName, lastName, email, phone, roleId, createdAt, updatedAt, address, lastLogin
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET 
            storeId=excluded.storeId, 
            firstName=excluded.firstName, 
            lastName=excluded.lastName, 
            email=excluded.email, 
            phone=excluded.phone, 
            roleId=excluded.roleId, 
            createdAt=excluded.createdAt, 
            updatedAt=excluded.updatedAt, 
            address=excluded.address, 
            lastLogin=excluded.lastLogin`
      );

      const insertEmployees = db.transaction((employees) => {
        for (const employee of employees) {
          console.log("Inserting employee:", employee);
          insertEmployeeStmt.run(
            employee.id,
            employee.storeId,
            employee.firstName,
            employee.lastName,
            employee.email,
            employee.phone,
            employee.roleId,
            employee.createdAt,
            employee.updatedAt,
            employee.address,
            employee.lastLogin
          );
        }
      });

      insertEmployees(apiEmployees);

      console.log("Inserted new employees into the local database.");

      // Fetch Updated Employees with Role Names
      const updatedEmployees = db
        .prepare(
          `SELECT employees.*, roles.name AS roleName 
           FROM employees 
           LEFT JOIN roles ON employees.roleId = roles.id 
           WHERE employees.storeId = ?`
        )
        .all(storeId) as {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        roleName: string;
        avatarPath: string | null;
        roleId: string;
        deletedAt: string | null;
        storeId: string;
      }[];

      return updatedEmployees.map((emp) => ({
        id: emp.id,
        name: `${emp.firstName} ${emp.lastName}`,
        role: emp.roleName || "Unknown Role",
        image: emp.avatarPath,
        isAdmin: emp.roleName?.toLowerCase() === "admin",
        storeId: emp.storeId,
        deletedAt: emp.deletedAt
          ? new Date(emp.deletedAt).toLocaleString()
          : null,
        email: emp.email,
      }));
    } catch (error) {
      console.error("Error fetching employees:", error);
      return [];
    }
  });

  // employee login
  ipcMain.handle("employeeLogin", async (_event, { email, pin }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/employee/login",
        { email, pin }
      );

      return response.data;
    } catch (error) {
      console.error("Employee login failed:", error);

      const errorMessage =
        error.response?.data?.message || "An error occurred during login.";
      return { success: false, message: errorMessage };
    }
  });

  // fetch category
  ipcMain.handle("getCategories", async (_event, storeId) => {
    console.log("Received request to get categories for storeId:", storeId);

    try {
      // Fetch from local DB
      const categories = db
        .prepare("SELECT * FROM categories WHERE storeId = ?")
        .all(storeId);

      if (categories.length > 0) {
        console.log("Returning local categories:", categories);
        return categories;
      }

      console.log("No local categories found, fetching from API...");

      // Fetch from API
      const apiResponse = await axios.get(
        `http://localhost:8000/api/v1/category/get/${storeId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const apiCategories = apiResponse.data.data;
      console.log("API categories:", apiCategories);

      if (!Array.isArray(apiCategories)) {
        console.error("Invalid API response format:", apiCategories);
        return [];
      }

      // Insert into local DB
      const insertStmt = db.prepare(`
        INSERT INTO categories (id, name, storeId, status, createdAt, updatedAt, deletedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      const insertMany = db.transaction((categories) => {
        for (const category of categories) {
          insertStmt.run(
            category.id,
            category.name,
            category.storeId,
            category.status ? 1 : 0,
            category.createdAt,
            category.updatedAt,
            category.deletedAt || null
          );
        }
      });

      insertMany(apiCategories);

      console.log("Categories synced to local DB.");
      return apiCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  });

  // fetch inventory
  ipcMain.handle("getInventory", async (_event, storeId) => {
    console.log("Received request to get inventory for storeId:", storeId);

    try {
      // Try local fetch first
      const inventory = db
        .prepare(
          `
          SELECT i.id, i.storeId, i.name, i.quantity, i.threshold, i.supplier,
                 i.createdById,
                 (e.firstName || ' ' || e.lastName) AS createdBy,
                 i.createdAt, i.updatedAt, i.deletedAt
          FROM inventory i
          LEFT JOIN employees e ON i.createdById = e.id
          WHERE i.storeId = ?
        `
        )
        .all(storeId);

      if (inventory.length > 0) {
        console.log("Returning local inventory:", inventory);
        return inventory;
      }

      console.log("No local inventory found, fetching from API...");

      // Fetch from API
      const apiResponse = await axios.get(
        `http://localhost:8000/api/v1/inventory/get/${storeId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const apiInventory = apiResponse.data.data;
      console.log("API Inventory Response:", apiInventory);

      if (!Array.isArray(apiInventory)) {
        console.error("Invalid API response:", apiInventory);
        return [];
      }

      // Prepare to insert into SQLite
      const insertStmt = db.prepare(`
        INSERT INTO inventory (
          id, storeId, name, quantity, threshold, supplier,
          createdById, createdAt, updatedAt, deletedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertMany = db.transaction((items) => {
        for (const item of items) {
          insertStmt.run(
            item.id,
            item.storeId,
            item.name,
            item.quantity,
            item.threshold || null,
            item.supplier || null,
            item.createdById || null,
            item.createdAt,
            item.updatedAt,
            item.deletedAt || null
          );
        }
      });

      insertMany(apiInventory);
      console.log("Inventory synced to local database.");

      // Refetch with employee names
      const updatedInventory = db
        .prepare(
          `
          SELECT i.id, i.storeId, i.name, i.quantity, i.threshold, i.supplier,
                 i.createdById,
                 (e.firstName || ' ' || e.lastName) AS createdBy,
                 i.createdAt, i.updatedAt, i.deletedAt
          FROM inventory i
          LEFT JOIN employees e ON i.createdById = e.id
          WHERE i.storeId = ?
        `
        )
        .all(storeId);

      return updatedInventory;
    } catch (error) {
      console.error("Error fetching inventory:", error);
      return [];
    }
  });

  // fetch dishes
  ipcMain.handle("getDishes", async (_event, storeId) => {
    console.log("Received request to get dishes for storeId:", storeId);
    try {
      const dishQuery = `
        SELECT d.*, e.firstName, e.lastName, c.name AS categoryName
        FROM Dish d
        LEFT JOIN employees e ON d.employeeId = e.id
        LEFT JOIN categories c ON d.categoryId = c.id
        WHERE d.storeId = ?
      `;
      const localDishes = db.prepare(dishQuery).all(storeId);

      const insertAddon = db.prepare(`
        INSERT INTO addons (
          id, name, price, dishId, storeId,
          createdAt, updatedAt, deletedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const enrichDishes = (dishes: any[]) => {
        return dishes.map((dish) => {
          const inventories = db
            .prepare(
              `SELECT di.id, di.inventoryItemId, i.name AS itemName, di.quantity, di.defaultSelected
               FROM DishInventory di
               LEFT JOIN inventory i ON di.inventoryItemId = i.id
               WHERE di.dishId = ?`
            )
            .all(dish.id);

          const addons = db
            .prepare(
              `SELECT id, name, price FROM addons WHERE dishId = ? AND deletedAt IS NULL`
            )
            .all(dish.id);

          const { addOns, ...rest } = dish;

          return {
            ...rest,
            createdBy:
              dish.firstName && dish.lastName
                ? `${dish.firstName} ${dish.lastName}`
                : null,
            categoryName: dish.categoryName || null,
            dishInventories: inventories,
            addons,
          };
        });
      };

      if (localDishes.length > 0) {
        const enriched = enrichDishes(localDishes);
        console.log("Returning local dishes:", enriched.length);
        return enriched;
      }

      // Fetch from API if not found locally
      console.log("No local dishes found. Fetching from API...");
      const response = await axios.get(
        `http://localhost:8000/api/v1/dish/get/${storeId}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const apiDishes = response.data.data || [];

      const insertDish = db.prepare(`
        INSERT INTO Dish (
          id, name, rating, addOns, bowls, persons, price, imageUrl, itemDetails,
          deletedAt, storeId, employeeId, categoryId
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertDI = db.prepare(`
        INSERT INTO DishInventory (
          id, dishId, inventoryItemId, defaultSelected, quantity
        ) VALUES (?, ?, ?, ?, ?)
      `);

      const insertMany = db.transaction((dishes: any[]) => {
        for (const dish of dishes) {
          insertDish.run(
            dish.id,
            dish.name,
            dish.rating || null,
            JSON.stringify(dish.addOns || []),
            dish.bowls || 1,
            dish.persons || 1,
            dish.price,
            dish.imageUrl || null,
            dish.itemDetails || null,
            dish.deletedAt || null,
            dish.storeId,
            dish.employeeId || null,
            dish.categoryId || null
          );
        }
      });

      insertMany(apiDishes);
      console.log(`Inserted ${apiDishes.length} dishes.`);

      for (const dish of apiDishes) {
        const diRes = await axios.get(
          `http://localhost:8000/api/v1/dishInventory/get/${dish.id}`
        );
        const inventories = diRes.data.data || [];

        console.log(
          `Fetched ${inventories} inventories for dish ID ${dish.id}`
        );
        // Fetch and insert Addons
        const addonRes = await axios.get(
          `http://localhost:8000/api/v1/addon/get/${dish.id}`
        );
        const addons = addonRes.data.data || [];

        console.log(`Fetched ${addons.length} addons for dish ID ${dish.id}`);

        for (const addon of addons) {
          try {
            insertAddon.run(
              addon.id,
              addon.name,
              addon.price,
              addon.dishId,
              addon.storeId,
              addon.createdAt || null,
              addon.updatedAt || null,
              addon.deletedAt || null
            );
          } catch (err: any) {
            console.error(`Failed to insert Addon:`, err.message);
          }
        }

        for (const inv of inventories) {
          try {
            insertDI.run(
              inv.id,
              inv.dishId,
              inv.inventoryItemId,
              inv.defaultSelected ? 1 : 0,
              Number(inv.quantity) || 1
            );
          } catch (err: any) {
            console.error(`Failed to insert DishInventory:`, err.message);
          }
        }
      }

      // Fetch enriched updated dishes
      const updatedDishes = db.prepare(dishQuery).all(storeId);
      const enriched = enrichDishes(updatedDishes);
      console.log("Returning updated dishes with inventories:", enriched);
      return enriched;
    } catch (error: any) {
      console.error("Error in getDishes:", error.message);
      return [];
    }
  });

  // fetch addons
  ipcMain.handle("getAddonsByStoreId", async (_event, storeId) => {
    try {
      const localAddons = db
        .prepare(
          `SELECT a.id, a.name, a.price, a.dishId, a.storeId, d.name AS dishName, a.createdAt, a.updatedAt
           FROM addons a
           LEFT JOIN Dish d ON a.dishId = d.id
           WHERE a.storeId = ? AND a.deletedAt IS NULL`
        )
        .all(storeId);

      if (localAddons.length > 0) {
        console.log(
          `Found ${localAddons.length} addons locally for storeId ${storeId}`
        );

        return localAddons.map((addon) => ({
          ...(addon as {
            id: string;
            name: string;
            price: number;
            dishId: string;
            storeId: string;
            dishName: string | null;
            createdAt: string | null;
            updatedAt: string | null;
          }),
          dishName: (addon as { dishName: string | null }).dishName || null,
        }));
      }

      console.log(
        `No local addons found for storeId ${storeId}. Fetching from API...`
      );
      const res = await axios.get(
        `http://localhost:8000/api/v1/addon/getAll/${storeId}`
      );
      const apiAddons = res.data.data || [];

      if (apiAddons.length === 0) {
        console.log(`No addons found from the API for storeId ${storeId}`);
        return [];
      }

      const insertAddon = db.prepare(`
        INSERT INTO addons (
          id, name, price, dishId, storeId,
          createdAt, updatedAt, deletedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const insertMany = db.transaction((addons: any[]) => {
        for (const addon of addons) {
          insertAddon.run(
            addon.id,
            addon.name,
            addon.price,
            addon.dishId,
            addon.storeId,
            addon.createdAt || null,
            addon.updatedAt || null,
            addon.deletedAt || null
          );
        }
      });

      insertMany(apiAddons);

      const enrichedAddons = apiAddons.map((addon) => {
        const dish = db
          .prepare(`SELECT name FROM Dish WHERE id = ?`)
          .get(addon.dishId) as { name: string } | undefined;

        return {
          ...addon,
          dishName: dish ? dish.name : null,
          createdAt: addon.createdAt || null,
          updatedAt: addon.updatedAt || null,
        };
      });

      console.log(`Inserted ${apiAddons.length} addons from API.`);
      return enrichedAddons;
    } catch (error: any) {
      console.error("Error in getAddonsByStoreId:", error.message);
      return [];
    }
  });
}
