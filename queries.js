// queries.js - MongoDB CRUD queries for Week 1 Assignment

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // --- Task 2: Basic CRUD Operations ---

    // 1. Find all books in a specific genre (e.g., 'Fiction')
    const fictionBooks = await collection.find({ genre: 'Fiction' }).toArray();
    console.log('Books in Fiction genre:', fictionBooks);

    // 2. Find books published after a certain year (e.g., 2000)
    const booksAfter2000 = await collection.find({ published_year: { $gt: 2000 } }).toArray();
    console.log('Books published after 2000:', booksAfter2000);

    // 3. Find books by a specific author (e.g., 'George Orwell')
    const orwellBooks = await collection.find({ author: 'George Orwell' }).toArray();
    console.log('Books by George Orwell:', orwellBooks);

    // 4. Update the price of a specific book (e.g., '1984')
    const updateResult = await collection.updateOne(
      { title: '1984' },
      { $set: { price: 15.99 } }
    );
    console.log('Update result for 1984:', updateResult.modifiedCount);

    // 5. Delete a book by its title (e.g., 'Moby Dick')
    const deleteResult = await collection.deleteOne({ title: 'Moby Dick' });
    console.log('Delete result for Moby Dick:', deleteResult.deletedCount);

    // --- Task 3: Advanced Queries ---

    // 1. Find books that are both in stock and published after 2010
    const inStockAfter2010 = await collection.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray();
    console.log('\nBooks in stock and published after 2010:', inStockAfter2010);

    // 2. Use projection to return only the title, author, and price fields
    const projectionExample = await collection.find({}, { projection: { _id: 0, title: 1, author: 1, price: 1 } }).toArray();
    console.log('\nBooks with only title, author, and price:', projectionExample);

    // 3. Sorting books by price ascending
    const sortedByPriceAsc = await collection.find({}).sort({ price: 1 }).toArray();
    console.log('\nBooks sorted by price (ascending):', sortedByPriceAsc);

    // 4. Sorting books by price descending
    const sortedByPriceDesc = await collection.find({}).sort({ price: -1 }).toArray();
    console.log('\nBooks sorted by price (descending):', sortedByPriceDesc);

    // 5. Pagination: 5 books per page, page 1 (skip 0)
    const page1 = await collection.find({}).sort({ title: 1 }).skip(0).limit(5).toArray();
    console.log('\nPage 1 (first 5 books by title):', page1);

    // 6. Pagination: 5 books per page, page 2 (skip 5)
    const page2 = await collection.find({}).sort({ title: 1 }).skip(5).limit(5).toArray();
    console.log('\nPage 2 (next 5 books by title):', page2);

    // --- Task 4: Aggregation Pipelines ---

    // 1. Average price of books by genre
    const avgPriceByGenre = await collection.aggregate([
      { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log('\nAverage price of books by genre:', avgPriceByGenre);

    // 2. Author with the most books in the collection
    const mostProlificAuthor = await collection.aggregate([
      { $group: { _id: "$author", bookCount: { $sum: 1 } } },
      { $sort: { bookCount: -1 } },
      { $limit: 1 }
    ]).toArray();
    console.log('\nAuthor with the most books:', mostProlificAuthor);

    // 3. Group books by publication decade and count them
    const booksByDecade = await collection.aggregate([
      { $addFields: { decade: { $concat: [ { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } }, "s" ] } } },
      { $group: { _id: "$decade", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    console.log('\nBooks grouped by publication decade:', booksByDecade);

    // --- Task 5: Indexing ---

    // 1. Create an index on the 'title' field
    const titleIndex = await collection.createIndex({ title: 1 });
    console.log(`\nCreated index on 'title':`, titleIndex);

    // 2. Create a compound index on 'author' and 'published_year'
    const authorYearIndex = await collection.createIndex({ author: 1, published_year: 1 });
    console.log(`Created compound index on 'author' and 'published_year':`, authorYearIndex);

    // 3. Use explain() to demonstrate performance improvement
    // Query before index (should now use the index)
    const explainTitle = await collection.find({ title: '1984' }).explain('executionStats');
    console.log("\nExplain output for find by title:", JSON.stringify(explainTitle.executionStats, null, 2));

    const explainCompound = await collection.find({ author: 'George Orwell', published_year: 1949 }).explain('executionStats');
    console.log("\nExplain output for find by author and published_year:", JSON.stringify(explainCompound.executionStats, null, 2));

  } catch (err) {
    console.error('Error running queries:', err);
  } finally {
    await client.close();
  }
}

runQueries().catch(console.error);
