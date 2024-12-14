# To run copy and paste the code in terminal
## 1st terminal
```bash
cd Truffle
npm install -g truffle
truffle compile
truffle test
truffle migrate -network development
```
## 2nd Terminal
```bash
cd Backend
python -m venv venv
venv\Scripts\Activate
pip install -r requirements.txt
python.exe -m pip install --upgrade pip
cd voting_backend
python manage.py runserver
```
## 3rd Terminal
```bash
cd Frontend\voting-app
npm install
npm install axios
npm run dev 
```
