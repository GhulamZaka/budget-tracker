/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/idb.js":
/*!**************************!*\
  !*** ./public/js/idb.js ***!
  \**************************/
/***/ (() => {

eval("// create variable to hold db connection\r\nlet db;\r\n// establish a connection to IndexedDB database called 'budget_tracker' and set it to version 1\r\nconst request = indexedDB.open(\"budget_tracker\", 1);\r\n\r\n// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)\r\nrequest.onupgradeneeded = function (event) {\r\n  // save a reference to the database\r\n  const db = event.target.result;\r\n  // create an object store (table) called `new_transaction`, set it to have an auto incrementing primary key of sorts\r\n  db.createObjectStore(\"new_transaction\", { autoIncrement: true });\r\n};\r\n\r\n// upon a successful\r\nrequest.onsuccess = function (event) {\r\n  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable\r\n  db = event.target.result;\r\n\r\n  // check if app is online, if yes run uploadTransaction() function to send all local db data to api\r\n  if (navigator.onLine) {\r\n    // we haven't created this yet, but we will soon, so let's comment it out for now\r\n    uploadTransaction();\r\n  }\r\n};\r\n\r\nrequest.onerror = function (event) {\r\n  // log error here\r\n  console.log(event.target.errorCode);\r\n};\r\n\r\n// This function will be executed if we attempt to submit a new transaction and there's no internet connection\r\nfunction saveRecord(record) {\r\n  // open a new transaction with the database with read and write permissions\r\n  const transaction = db.transaction([\"new_transaction\"], \"readwrite\");\r\n\r\n  // access the object store for `new_transaction`\r\n  const moneyObjectStore = transaction.objectStore(\"new_transaction\");\r\n\r\n  // add record to your store with add method\r\n  moneyObjectStore.add(record);\r\n}\r\n\r\nfunction uploadTransaction() {\r\n  // open a transaction on your db\r\n  const transaction = db.transaction([\"new_transaction\"], \"readwrite\");\r\n\r\n  // access your object store\r\n  const moneyObjectStore = transaction.objectStore(\"new_transaction\");\r\n\r\n  // get all records from store and set to a variable\r\n  const getAll = moneyObjectStore.getAll();\r\n\r\n  // more to come...\r\n  getAll.onsuccess = function () {\r\n    // if there was data in indexedDb's store, let's send it to the api server\r\n    if (getAll.result.length > 0) {\r\n      fetch(\"/api/transaction\", {\r\n        method: \"POST\",\r\n        body: JSON.stringify(getAll.result),\r\n        headers: {\r\n          Accept: \"application/json, text/plain, */*\",\r\n          \"Content-Type\": \"application/json\",\r\n        },\r\n      })\r\n        .then((response) => response.json())\r\n        .then((serverResponse) => {\r\n          if (serverResponse.message) {\r\n            throw new Error(serverResponse);\r\n          }\r\n          // open one more transaction\r\n          const transaction = db.transaction([\"new_transaction\"], \"readwrite\");\r\n          // access the new_transaction object store\r\n          const moneyObjectStore = transaction.objectStore(\"new_transaction\");\r\n          // clear all items in your store\r\n          moneyObjectStore.clear();\r\n\r\n          alert(\"All saved tranaction has been submitted!\");\r\n        })\r\n        .catch((err) => {\r\n          console.log(err);\r\n        });\r\n    }\r\n  };\r\n}\r\n\r\n// listen for app coming back online\r\nwindow.addEventListener(\"online\", uploadTransaction);\r\n\n\n//# sourceURL=webpack://budget-app/./public/js/idb.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public/js/idb.js"]();
/******/ 	
/******/ })()
;