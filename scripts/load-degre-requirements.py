import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

def load_degree_requirements(db):
    requirements_file = os.path.join(os.path.dirname(__file__), '..', 'mock-data', 'requirements', 'degree-requirements.json')
    if os.path.exists(requirements_file):
        with open(requirements_file, 'r') as f:
            data = json.load(f)
            degree_requirements = data.get('degreeRequirements', {})
            if degree_requirements:
                print('Inserting degree requirements')
                db['degree-requirements'].delete_many({})  # Clear existing data
                db['degree-requirements'].insert_one(degree_requirements)
            else:
                print('No degree requirements found')
    else:
        print(f'Degree requirements file not found: {requirements_file}')

if __name__ == '__main__':
    # Load environment variables from .env file
    load_dotenv()
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    DB_NAME = os.getenv('DB_NAME', 'dbName')

    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    load_degree_requirements(db)
    client.close()
