ipcMain.handle("getDishes", async (event, storeId) => {
  try {
    // Step 1: Fetch dishes from the API
    const response = await axios.get(
      `http://localhost:8000/api/v1/dish/get/${storeId}`
    );
    const dishes = response.data.data;

    // Step 2: Loop through each dish to ensure category and inventory exist
    for (const dish of dishes) {
      // Fetch category for the dish
      let category = await getCategory(dish.categoryId);
      if (!category) {
        // If the category doesn't exist locally, fetch and store it
        category = await fetchAndInsertCategory(dish.categoryId);
      }

      // Fetch inventory items used by the dish
      let inventoryItems = [];
      for (const item of dish.usedItems) {
        let inventory = await getInventory(item.id);
        if (!inventory) {
          // If the inventory item doesn't exist locally, fetch and store it
          inventory = await fetchAndInsertInventory(item.id);
        }
        inventoryItems.push(inventory.id); // Collect the inventory IDs to link to the dish
      }

      // Step 3: Insert the dish into the local database along with its related data
      await insertDishIntoLocalDB(dish, category.id, inventoryItems, storeId);
    }

    return {
      statusCode: 200,
      message: "Dishes inserted into local DB successfully.",
      success: true,
    };
  } catch (error) {
    console.error("Error fetching or inserting dishes:", error);
    return {
      statusCode: 500,
      message: "Error fetching or inserting dishes.",
      success: false,
    };
  }
});

// Directly using IPC calls to get inventory and category from local DB

async function getCategory(categoryId) {
  // Fetch the category from the local DB directly
  const result = await db.get("SELECT * FROM categories WHERE id = ?", [
    categoryId,
  ]);
  return result;
}

async function getInventory(inventoryId) {
  // Fetch the inventory from the local DB directly
  const result = await db.get("SELECT * FROM inventory WHERE id = ?", [
    inventoryId,
  ]);
  return result;
}

// Function to fetch and insert a category if it doesn't exist locally
async function fetchAndInsertCategory(categoryId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/category/get/${categoryId}`
  );
  const category = response.data.data;

  // Insert category into the local SQLite DB
  await insertCategoryIntoLocalDB(category);

  return category; // Return the category object
}

// Function to fetch and insert an inventory item if it doesn't exist locally
async function fetchAndInsertInventory(inventoryId) {
  const response = await axios.get(
    `http://localhost:8000/api/v1/inventory/get/${inventoryId}`
  );
  const inventory = response.data.data;

  // Insert inventory into the local SQLite DB
  await insertInventoryIntoLocalDB(inventory);

  return inventory; // Return the inventory object
}

// Function to insert a dish into the local SQLite DB
async function insertDishIntoLocalDB(dish, categoryId, inventoryIds, storeId) {
  // Insert dish data
  await db.run(
    `
      INSERT INTO dishes (id, name, description, price, categoryId, storeId, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      dish.id,
      dish.name,
      dish.description || "",
      dish.cost,
      categoryId,
      storeId,
      dish.createdAt,
      dish.updatedAt,
    ]
  );

  // Insert inventory references to the dish (handling many-to-many relation)
  for (const inventoryId of inventoryIds) {
    await db.run(
      `
        INSERT INTO dish_inventory (dishId, inventoryId)
        VALUES (?, ?)`,
      [dish.id, inventoryId]
    );
  }
}

// Function to insert a category into the local SQLite DB
async function insertCategoryIntoLocalDB(category) {
  await db.run(
    `
      INSERT INTO categories (id, name, createdAt, updatedAt)
      VALUES (?, ?, ?, ?)`,
    [category.id, category.name, category.createdAt, category.updatedAt]
  );
}

// Function to insert an inventory item into the local SQLite DB
async function insertInventoryIntoLocalDB(inventory) {
  await db.run(
    `
      INSERT INTO inventory (id, name, quantity, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?)`,
    [
      inventory.id,
      inventory.name,
      inventory.quantity,
      inventory.createdAt,
      inventory.updatedAt,
    ]
  );
}
