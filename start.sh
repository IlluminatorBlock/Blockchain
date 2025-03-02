echo "==================================="
echo "   Voting System Startup Script"
echo "==================================="

# Step 1: Start Ganache on port 7545
echo "[1/4] Starting Ganache..."
ganache-cli -i 5777 -p 7545 &
sleep 7

# Step 2: Run Truffle commands
echo "[2/4] Deploying smart contracts with Truffle..."
cd Truffle
truffle migrate --network development
if [ $? -ne 0 ]; then
    echo "Error: Truffle migration failed"
    exit 1
fi
cd ..

# Step 3: Start Backend
echo "[3/4] Starting Backend server..."
cd Backend
if [ ! -f "venv/bin/activate" ]; then
    echo "Error: Virtual environment not found. Please create it first."
    exit 1
fi
source venv/bin/activate
cd voting_backend
python manage.py runserver &
cd ../..
sleep 10

# Step 4: Start Frontend
echo "[4/4] Starting Frontend development server..."
cd Frontend/voting_run
npm run dev &
sleep 10

echo "==================================="
echo "   All services are now running"
echo "==================================="
echo "Ganache: http://localhost:7545"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
