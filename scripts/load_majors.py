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
                majors = data.get('majors', [])
                if majors:
                    print(f'Inserting {len(majors)} majors from {major_file}')
                    db['majors'].insert_many(majors)
                else:
                    print(f'No majors found in {major_path}')
        else:
            print(f'{major_file} is not a JSON file')

if __name__ == '__main__':
    # Load environment variables from .env file
    load_dotenv()
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    DB_NAME = os.getenv('DB_NAME', 'tapDb')

    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    load_majors(db)
    client.close()
