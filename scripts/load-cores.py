import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

def load_cores(db):
    cores_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'core-data', 'courses.json')
    if os.path.exists(cores_file):
        with open(cores_file, 'r') as f:
            data = json.load(f)
            core_curriculum_requirements = data.get('coreCurriculumRequirements', [])
            if core_curriculum_requirements:
                print('Inserting core curriculum requirements')
                db['core-data'].delete_many({})  # Clear existing data
                db['core-data'].insert_many(core_curriculum_requirements)
            else:
                print('No core curriculum requirements found in the file.')
    else:
        print(f'Cores file not found: {cores_file}')

if __name__ == '__main__':
    load_dotenv()
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    DB_NAME = os.getenv('DB_NAME', 'dbName')

    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    load_cores(db)
    client.close()
