# Blockchain-Based Voting System

This project is a blockchain-based voting system developed as a college project. The system leverages blockchain technology to ensure secure and transparent voting processes. The system is composed of a backend server, a frontend application, and smart contracts deployed on the Ethereum blockchain.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- Python
- pip (Python Package Installer)
- Truffle
- Ganache CLI

## Installation

Follow the steps below to set up and run the application:

### 1. Install Global Dependencies

Open the first terminal and run the following commands:

```bash
npm install -g truffle
npm install -g ganache-cli
```

### 2. Set Up Backend

Open the second terminal and run the following commands:

```bash
cd Backend
python -m venv venv
venv\Scripts\Activate
pip install -r requirements.txt
```

### 3. Set Up Frontend

Open the third terminal and run the following commands:

```bash
cd Frontend\voting_run
npm install
```

## Running the Application

To start the application, follow these steps:

### 1. Start Ganache

In the first terminal, run:

```bash
ganache-cli -i 5777 -p 7545
```

### 2. Deploy Smart Contracts

In the second terminal, run:

```bash
cd Truffle
truffle migrate --network development
```

### 3. Start Backend Server

In the second terminal, after deploying smart contracts, run:

```bash
cd ../Backend
venv\Scripts\activate
cd voting_backend
python manage.py runserver
```

### 4. Start Frontend Development Server

In the third terminal, run:

```bash
cd Frontend\voting_run
npm run dev
```

The application will be running on `http://localhost:5173`. You can access it by opening your web browser and navigating to the URL.

### Using Batch Files (Windows Only)

If you are using Windows, you can use the provided batch files to start and stop the application more conveniently.

- **start.bat**: Starts all necessary services including Ganache, Truffle, Backend, and Frontend.
- **stop.bat**: Stops all running services.

### Using Shell Scripts (Unix-Based Systems)

If you are using Unix-based systems, you can use the provided shell scripts to start and stop the application more conveniently.

- **start.sh**: Starts all necessary services including Ganache, Truffle, Backend, and Frontend.
- **stop.sh**: Stops all running services.

## Project Structure

- **Backend**: Contains the backend code, including the Django server and the virtual environment setup.
- **Frontend**: Contains the frontend code, including the React application.
- **Truffle**: Contains the Truffle project for deploying smart contracts.

## License

This project is licensed under the MIT License.
