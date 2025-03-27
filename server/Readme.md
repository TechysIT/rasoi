# Express Backend Config

**Version:** 1.0.0  
**Author:** Opu Pal  

## Description  

This project provides a professional backend structure using **Express.js, Prisma, PostgreSQL, and related technologies**. It aims to streamline the development process by offering a solid foundation for building **scalable and maintainable** backend applications.  

## Features  

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.  
- **Prisma**: Modern database ORM for PostgreSQL with **type safety** and **auto-generated queries**.  
- **PostgreSQL**: Powerful, open-source relational database system.  
- **bcrypt**: Library for **secure password hashing**.  
- **cookie-parser**: Middleware for parsing cookies in Express.  
- **cors**: Middleware for enabling **Cross-Origin Resource Sharing (CORS)**.  
- **dotenv**: Module for loading environment variables from a `.env` file.  
- **jsonwebtoken**: Implementation of JSON Web Tokens (**JWT**) for user authentication.  
- **zod**: Schema validation for input data.  

## Installation  

1. Clone the repository:  

   ```bash
   git clone [repository_url]
   cd [project_directory]
   ```

2. Install dependencies:  

   ```bash
   npm install
   ```

3. Set up your **PostgreSQL database** and update the `.env` file with the **database URL**.  

4. Run database migrations:  

   ```bash
   npx prisma migrate dev
   ```

## Usage  

### Development  

To run the server in development mode with **auto-reloading**:  

```bash
npm run dev
```

This command utilizes `nodemon` for **auto-restarting the server upon file changes**.  

### Production  

To start the server in production mode:  

```bash
npm start
```

## Configuration  

This project uses the `dotenv` module for managing environment variables. **Create a `.env` file** in the root directory and define your environment variables there. Here's an example:  

```
DATABASE_URL="DB URL"

PORT=8000

CORS_ORIGIN=*

ACCESS_TOKEN_SECRET="use secret token hash"

ACCESS_TOKEN_EXPIRY=1d
```

**⚠️ Important:** Never commit your `.env` file to version control. Use `.gitignore` to exclude it.  

## Prisma Commands  

- **Generate Prisma Client** (after modifying `schema.prisma`):  
  ```bash
  npx prisma generate
  ```
- **Apply Database Migrations**:  
  ```bash
  npx prisma migrate dev
  ```
- **View Database Structure (GUI)**:  
  ```bash
  npx prisma studio
  ```

## License  

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

