# health_insure_backend

## Project setup

### SETUP VIRTUAL ENVIRONMENT
```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### SETUP ENVIRONMENT VARIABLES
```
export MONGO_URI=<MONGO_URI>
export OPENAI_API_KEY=<OPENAI_API_KEY>
```

### RUN SERVER
```
uvicorn main:app --reload
```

