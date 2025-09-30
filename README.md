# MongoDB Fundamentals - Week 1


## Setup Instructions

Before you begin this assignment, please make sure you have the following installed:

1. **MongoDB Community Edition** - [Installation Guide](https://www.mongodb.com/docs/manual/administration/install-community/)
2. **MongoDB Shell (mongosh)** - This is included with MongoDB Community Edition
3. **Node.js** - [Download here](https://nodejs.org/)

### Node.js Package Setup

Once you have Node.js installed, run the following commands in your assignment directory:

```powershell
# Initialize a package.json file
npm init -y

# Install the MongoDB Node.js driver
npm install mongodb
```

### Troubleshooting: Cannot find module 'mongodb'

If you see this error when running your JavaScript files:

```
Error: Cannot find module 'mongodb'
```

It means the MongoDB Node.js driver is not installed in your project. Make sure you are in your assignment directory and run:

```powershell
npm install mongodb
```

If you continue to experience issues:
1. Make sure MongoDB is installed and running on your system
2. Check that you're in the correct directory when installing packages
3. Verify your MongoDB connection string in your code

For more information, refer to the [MongoDB Node.js Driver documentation](https://www.mongodb.com/docs/drivers/node/current/).

## Assignment Overview

This week focuses on MongoDB fundamentals including:
- Creating and connecting to MongoDB databases
- CRUD operations (Create, Read, Update, Delete)
- MongoDB queries and filters
- Aggregation pipelines
- Indexing for performance

## Submission

Complete all the exercises in this assignment and push your code to GitHub using the provided GitHub Classroom link.


## How to Run Your Scripts

1. **Start your MongoDB server** (if not already running).
2. **Open a terminal** and navigate to the project directory:
	```powershell
	cd mongodb-data-layer-fundamentals-and-advanced-techniques-Magwaza51
	```
3. **Insert sample book data** by running:
	```powershell
	node insert_books.js
	```
	This will populate your `plp_bookstore` database with sample books.
4. **Run all MongoDB queries** by executing:
	```powershell
	node queries.js
	```
	This will print the results of all required queries, aggregations, and indexing tasks to your terminal.

If you see errors about missing modules, make sure you have installed dependencies with:
```powershell
npm install
```

If you prefer, you can also use MongoDB Compass or the MongoDB Shell (mongosh) to view your data.

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/) 