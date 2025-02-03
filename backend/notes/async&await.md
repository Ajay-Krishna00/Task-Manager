// Async and Await in JavaScript

// 1. async function
// An async function is a function that always returns a Promise.
// If the function returns a value, the value is automatically wrapped in a Promise.
// If the function throws an error, it is automatically wrapped in a rejected Promise.

// Syntax:
async function myFunction() {
// Asynchronous code
}

// Any function marked with async is implicitly a Promise-returning function.
// You can use await inside an async function to pause its execution until a Promise is resolved.

// Example:
async function example() {
return "Hello, World!";
}

example().then(result => console.log(result)); // "Hello, World!"

// In this example, the example function returns a Promise, which resolves to "Hello, World!".

// 2. await expression
// The await keyword can only be used inside an async function.
// It pauses the execution of the async function and waits for the Promise to resolve (or reject) before continuing.
// The result of the await expression is the resolved value of the Promise.

// Syntax:
const result = await promise;

// If the promise is resolved, result will contain the resolved value.
// If the promise is rejected, an error is thrown (you can handle this with try...catch).

// 3. Example of async and await

// Simulate an asynchronous task (e.g., fetching data)
function fetchData() {
return new Promise(resolve => {
setTimeout(() => resolve('Data fetched!'), 2000); // Resolve after 2 seconds
});
}

async function getData() {
console.log('Fetching data...');
const result = await fetchData(); // Wait for the promise to resolve
console.log(result); // Output: 'Data fetched!'
}

getData();

// In this example:
// - fetchData() simulates a delayed operation using setTimeout and returns a Promise that resolves after 2 seconds.
// - The await expression in the getData function pauses the execution until the fetchData Promise is resolved.
// - Once fetchData resolves, the result ('Data fetched!') is logged to the console.

// 4. Error Handling with async/await

// To handle errors in async functions, you can use try...catch blocks.

// Example with Error Handling:
async function fetchData() {
const data = await new Promise((resolve, reject) => {
setTimeout(() => reject('Failed to fetch data'), 2000); // Reject after 2 seconds
});
return data;
}

async function getData() {
try {
const result = await fetchData();
console.log(result); // This will not be reached if fetchData rejects
} catch (error) {
console.log('Error:', error); // Output: 'Error: Failed to fetch data'
}
}

getData();

// In this case:
// - The fetchData function returns a rejected promise.
// - The catch block handles the rejection and logs the error message.

// 5. Using async/await with Multiple Promises

// You can also use async/await with multiple asynchronous operations, waiting for all promises to resolve using Promise.all() or await for each individually.

// Example:
async function fetchData1() {
return new Promise(resolve => setTimeout(() => resolve('Data 1'), 1000));
}

async function fetchData2() {
return new Promise(resolve => setTimeout(() => resolve('Data 2'), 1500));
}

async function getData() {
try {
const [data1, data2] = await Promise.all([fetchData1(), fetchData2()]);
console.log(data1); // Output: 'Data 1'
console.log(data2); // Output: 'Data 2'
} catch (error) {
console.error('Error:', error);
}
}

getData();

// Here:
// - Promise.all() allows you to run both fetchData1() and fetchData2() concurrently.
// - The await will pause until both promises resolve.

// Summary of async/await:
// - async functions always return a Promise.
// - await is used to pause the execution of an async function until a Promise resolves.
// - You can use try...catch to handle errors in asynchronous code.
// - Promise.all() can be used to run multiple asynchronous operations concurrently.

// ----------------------------------------------------------------------------------------

// What is a Promise in JavaScript?

// A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
// Promises provide a way to handle asynchronous operations more cleanly and avoid callback hell (nested callbacks).

// A Promise has three possible states:
// 1. Pending: The promise is still being processed (the asynchronous operation has not yet completed).
// 2. Resolved (Fulfilled): The asynchronous operation completed successfully, and the promise has a result (value).
// 3. Rejected: The asynchronous operation failed, and the promise has a reason (error).

// Basic Promise Syntax
// A Promise is created using the new Promise() constructor, which takes a callback function with two parameters: resolve and reject.
// resolve(value): Used to indicate the operation was successful and provides the result.
// reject(error): Used to indicate the operation failed and provides the reason (error).

// Example:
const myPromise = new Promise((resolve, reject) => {
const success = true;

if (success) {
resolve("Operation was successful!");
} else {
reject("Something went wrong.");
}
});

myPromise
.then(result => console.log(result)) // Handles the resolved promise
.catch(error => console.log(error)); // Handles the rejected promise

// How Promises Work:
// - Pending: When the Promise is created, it’s in the pending state.
// - Fulfilled: If the asynchronous operation is successful, the resolve() function is called, and the promise is moved to the fulfilled state.
// - Rejected: If the operation fails, the reject() function is called, and the promise is moved to the rejected state.

// Once a promise has settled (either fulfilled or rejected), it cannot be changed.

// Methods to Handle Promises
// JavaScript promises have a few built-in methods for working with them:
// - then(onFulfilled): Used to handle the successful resolution of a promise.
// - catch(onRejected): Used to handle a promise rejection (error).
// - finally(onFinally): Used to run code after the promise is settled (whether fulfilled or rejected).

// Example:
const myPromise = new Promise((resolve, reject) => {
const success = true;
setTimeout(() => {
if (success) {
resolve("Success!"); // Promise resolved after 2 seconds
} else {
reject("Failure!"); // Promise rejected after 2 seconds
}
}, 2000);
});

myPromise
.then(result => {
console.log(result); // Output: "Success!"
})
.catch(error => {
console.log(error); // Will run if the promise is rejected
})
.finally(() => {
console.log("This will always run."); // Output: "This will always run."
});

// Chaining Promises
// Promises allow you to chain multiple .then() methods. Each .then() returns a new promise, allowing you to chain further actions after an asynchronous operation is completed.

// Example:
const fetchData = new Promise((resolve, reject) => {
setTimeout(() => {
resolve("Data fetched!");
}, 2000);
});

fetchData
.then(result => {
console.log(result); // Output: "Data fetched!"
return "Next step"; // Return a new value to be passed to the next then()
})
.then(nextResult => {
console.log(nextResult); // Output: "Next step"
})
.catch(error => {
console.log(error);
})
.finally(() => {
console.log("Promise has been handled.");
});

// Example: Using Promises for Asynchronous Operations

// Here’s an example where we simulate fetching data from a server:
// Simulate an API request returning a promise
function fetchDataFromServer() {
return new Promise((resolve, reject) => {
setTimeout(() => {
const data = { userId: 1, username: "JohnDoe" };
const success = true;
if (success) {
resolve(data); // Promise resolves after 2 seconds
} else {
reject("Failed to fetch data.");
}
}, 2000);
});
}

fetchDataFromServer()
.then(data => {
console.log("Data:", data); // Output: { userId: 1, username: "JohnDoe" }
})
.catch(error => {
console.error(error); // Output: "Failed to fetch data."
})
.finally(() => {
console.log("Fetching data is done.");
});

// Benefits of Using Promises
// - Improved readability: Promises make asynchronous code easier to read and maintain, especially when handling complex logic.
// - Avoids callback hell: Promises help you avoid deeply nested callbacks, which can make the code hard to follow.
// - Error handling: Promises provide a more structured way to handle errors using .catch() compared to traditional callback functions.

// Promise States Recap:
// - Pending: Initial state, before the promise is resolved or rejected.
// - Fulfilled: The operation completed successfully, and the promise has a result.
// - Rejected: The operation failed, and the promise has an error.

// Summary:
// - A Promise represents an asynchronous operation that may or may not be completed.
// - Promises allow you to handle the result of asynchronous operations with then(), catch(), and finally().
// - They help you avoid nested callbacks and make asynchronous code more readable.
