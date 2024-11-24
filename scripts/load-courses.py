import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

def load_courses(db):
    courses_dir = os.path.join(os.path.dirname(__file__), '..', 'mock-data', 'course-data')
    for subject_dir in os.listdir(courses_dir):
        subject_path = os.path.join(courses_dir, subject_dir)
        if os.path.isdir(subject_path):
            courses_file = os.path.join(subject_path, 'courses.json')
            if os.path.exists(courses_file):
                with open(courses_file, 'r') as f:
                    data = json.load(f)
                    courses = data.get('courses', [])
                    if courses:
                        print(f'Inserting {len(courses)} courses from {subject_dir}')
                        db['course-data'].delete_many({})  # Clear existing data
                        db['course-data'].insert_many(courses)
                    else:
                        print(f'No courses found in {courses_file}')
            else:
                print(f'Courses file not found: {courses_file}')
        else:
            print(f'{subject_path} is not a directory')

if __name__ == '__main__':
    load_dotenv()
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    DB_NAME = os.getenv('DB_NAME', 'dbName')

    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]
    load_courses(db)
    client.close()
