echo "==================================="
echo "   Stop All Running Processes"
echo "==================================="

# Stop Ganache
echo "[1/3] Stopping Ganache..."
GANACHE_PID=$(lsof -t -i:7545)
if [ -n "$GANACHE_PID" ]; then
    kill -9 $GANACHE_PID
    echo "Ganache stopped"
else
    echo "Ganache not running"
fi

# Stop Node processes (Truffle and Frontend)
echo "[2/3] Stopping Node processes..."
pkill -f node

# Stop Python processes (Backend Django)
echo "[3/3] Stopping Python processes..."
pkill -f python

echo "==================================="
echo "   All Processes Have Been Stopped"
echo "==================================="
