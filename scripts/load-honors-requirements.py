import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

def load_honors_requirements(db):
    honors_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'requirements', 'honors-requirements.json')
    if os.path.exists(honors_file):
        with open(honors_file, 'r') as f:
            data = json.load(f)
            honors_requirements = data.get('honorsRequirements', {})
            if honors_requirements:
                print('Inserting honors requirements')
                db['requirements'].insert_one(honors_requirements)
            else:
                print('No honors requirements found')
    else:
        print(f'Honors requirements file not found: {honors_file}')

if __name__ == '__main__':
    load_dotenv()
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    DB_NAME = os.getenv('DB_NAME', 'dbName')

    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    load_honors_requirements(db)
    client.close()
