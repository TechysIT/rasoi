import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../db/db";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

const registerEmployees = asyncHandler(async (req, res) => {
  try {
    const { firstName, lastName, email, phone, storeId, roleId, address } =
      req.body;
    console.log("Received Body:", req.body);

    // Validate inpu

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "storeId",
      "roleId",
      "address",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      throw new ApiError(
        400,
        `Missing required fields: ${missingFields.join(", ")}`,
      );
    }
    // Check if store exists
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new ApiError(404, "Store not found");
    }

    // Check if role exists
    let role = null;
    if (roleId) {
      role = await prisma.role.findUnique({
        where: { id: roleId },
      });

      if (!role) {
        throw new ApiError(404, "Role not found");
      }
    }

    // Check if employee already exists
    const existingEmployee = await prisma.employee.findFirst({
      where: {
        storeId,
        deletedAt: null,
        OR: [{ email }, { phone }],
      },
    });

    if (existingEmployee) {
      throw new ApiError(
        400,
        "An employee with this email or phone already exists in this store",
      );
    }

    // Generate a 6-digit PIN
    const generatedPin = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPin = await bcrypt.hash(generatedPin, 10);

    // Avatar path if uploaded
    const avatarPath = req.file ? req.file.filename : null;

    // Create the new employee
    const newEmployee = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone,
        avatarPath: `/public/temp/${avatarPath}`,
        password: hashedPin,
        storeId,
        roleId,
        address,
      },
    });

    if (!newEmployee) {
      throw new ApiError(500, "Failed to create employee");
    }

    // Respond with employee data and the plain PIN
    res.status(201).json(
      new ApiResponse(
        201,
        {
          pin: generatedPin,
          employee: {
            id: newEmployee.id,
            firstName: newEmployee.firstName,
            lastName: newEmployee.lastName,
            email: newEmployee.email,
            phone: newEmployee.phone,
            avatarPath: newEmployee.avatarPath,
            storeId: newEmployee.storeId,
            roleId: newEmployee.roleId,
            address: newEmployee.address,
            lastLoggedIn: newEmployee.lastLogin,
            createdAt: newEmployee.createdAt,
            updatedAt: newEmployee.updatedAt,
          },
        },
        "Employee created successfully",
      ),
    );
  } catch (error: any) {
    throw new ApiError(500, "Something went wrong", error);
  }
});

const loginEmployee = asyncHandler(async (req, res) => {
  // console.log("Received Body:", req.body);

  try {
    const { email, pin } = req.body;
    // console.log("Email:", email, "PIN:", pin);

    // Validate input
    if (!email || !pin) {
      throw new ApiError(400, "Email and PIN are required");
    }

    // Find the employee by email
    const employee = await prisma.employee.findFirst({
      where: { email, deletedAt: null },
      include: {
        role: true,
      },
    });

    console.log(employee);
    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    // Compare PIN
    const isPinValid = await bcrypt.compare(pin, employee.password);
    console.log("Is PIN Valid:", isPinValid);

    if (!isPinValid) {
      throw new ApiError(401, "Invalid PIN");
    }

    // Update lastLoggedIn
    const updatedEmployee = await prisma.employee.update({
      where: { id: employee.id },

      data: { lastLogin: new Date() },
    });

    if (!updatedEmployee) {
      throw new ApiError(500, "Failed to update last login time");
    }

    // Respond with employee data
    res.status(200).json(
      new ApiResponse(
        200,
        {
          employee: {
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            avatarPath: employee.avatarPath,
            storeId: employee.storeId,
            roleId: employee.roleId,
            createdAt: employee.createdAt,
            address: employee.address,
            lastLoggedIn: updatedEmployee.lastLogin,
            role: employee.role,
          },
        },
        "Login successful",
      ),
    );
  } catch (error: any) {
    throw new ApiError(500, "Something went wrong", error);
  }
});

const getEmployees = asyncHandler(async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const employees = await prisma.employee.findMany({
      where: { storeId },
    });

    // Remove the password
    const employeesWithoutPassword = employees.map(
      ({ password, ...rest }) => rest,
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          employeesWithoutPassword,
          "Employees retrieved successfully",
        ),
      );
  } catch (error: any) {
    throw new ApiError(500, "Internal Server Error", error);
  }
});

export { registerEmployees, loginEmployee, getEmployees };
