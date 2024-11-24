import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

def load_majors(db):
    majors_dir = os.path.join(os.path.dirname(__file__), '..', 'mock-data', 'requirements', 'major-requirements')
    for major_file in os.listdir(majors_dir):
        if major_file.endswith('.json'):
            major_path = os.path.join(majors_dir, major_file)
            with open(major_path, 'r') as f:
                data = json.load(f)
                if 'name' in data and 'totalUnits' in data:
                    # Delete old major requirements if it exist
                    result = db['majors'].delete_one({'name': data['name']})
                    if result.deleted_count > 0:
                        print(f'Deleted old major: {data["name"]}')
                    
                    # Insert the new major requirements
                    db['majors'].insert_one(data)
                    print(f'Inserted new major: {data["name"]}')
                else:
                    print(f'Invalid major structure in {major_path}')
        else:
            print(f'{major_file} is not a JSON file')

if __name__ == '__main__':
    load_dotenv()
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    DB_NAME = os.getenv('DB_NAME', 'dbName')

    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    load_majors(db)
    client.close()
