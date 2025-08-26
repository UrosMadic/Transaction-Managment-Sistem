# DOCUMENTATION

## Prerequisites

Required software and versions:

### 1. Node

node version 22.5.1

### 2. Npm

npm version 10.8.2

### 3. Git

latest version

## Installation

Before running a project, make sure you have all the prerequisites installed on your machine:

### Node and npm

Install the right version for your machine from: https://nodejs.org/en/blog/release/v22.5.1

### Git

Install the latest version for your machine from: https://git-scm.com/downloads

- Check the versions after installation with:

```bash
node -v
```

```bash
npm -v
```

```bash
git --version
```

## Configuration

After finishing installation and clonning project to your machine you should navigate to project directory and than install dependencies with running command:
(
Running in powershell before npm install requires this command:

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

)

```bash
npm install
```

## Running the application

Run the application with the command:

```bash
npm run dev
```

## API Documentation

### 1. GET/transactions endpoint

Retrieve all transactions from the provided CSV file

**Request example**

```http
GET /api/transactions
```

**Response example**

- Status 200, OK
  [
  {Transaction Date: '2025-03-01', Account Number: '7289-3445-1121', Account Holder Name: 'Maria Johnson', Amount: '150.00', Status: 'Settled'},
  {Transaction Date: '2025-03-02', Account Number: '1122-3456-7890', Account Holder Name: 'John Smith', Amount: '75.50', Status: 'Pending'},
  ...
  ]

- Status 400, Bad request

### 2. POST/transactions endpoint

Add a new transaction to the CSV file

**Request example**

```http
POST /api/transactions
```

body:
{transactionDate: '2025-03-03', accountNumber: '3344-5566-7788', accountHolderName: 'Robert Chen', amount: '220.25'}

headers: {"Content-Type": "application/json",}

**Response example**

- Status 201, Created
  [
  {transactionDate: '2025-03-03', accountNumber: '3344-5566-7788', accountHolderName: 'Robert Chen', amount: '220.25', Status: 'Failed'}
  ]

- Status 400, Bad request

## Testing

1. Open the application in your browser

   After running the application (STEP Running the application) open the application in your browser by going to the http://localhost:3000 .
   You will see the home page with a table that displays all transactions retrieved from the CSV file.

2. Click on the "Add Transaction" button.
   A modal popup will appear with a form containing the following fields:

- Transaction Date (text input, format: YYYY-MM-DD)
- Account Number (text input, format: XXXX-XXXX-XXXX)
- Account Holder Name (text input)
- Amount (number input)

And 2 buttons:

- Add Transaction for subbmiting transaction
- Close for closing modal popup

3. Succesfully adding a transaction

- If all fields are correctly filled in the proper format, clicking "Add Transaction"
  - Save the new transaction to CSV file
  - Close the popup
  - Refresh the table to display te newly added transaction
- If any field is empty or in the wrong format, an appropriate error message will appear at the bottom of the popup.
