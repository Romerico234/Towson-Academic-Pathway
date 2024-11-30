import json
import os
from pymongo import MongoClient
from dotenv import load_dotenv

def load_courses(db):
    courses_dir = os.path.join(os.path.dirname(__file__), '..', 'data', 'course-data')
    
    if not os.path.exists(courses_dir):
        print(f"Error: Courses directory not found: {courses_dir}")
        return
    
    # Clear existing data in the database collection
    print("Clearing existing course data...")
    db['course-data'].delete_many({})  
    
    # Iterate over each subject directory in the course-data directory
    for subject_dir in os.listdir(courses_dir):
        subject_path = os.path.join(courses_dir, subject_dir)
        if os.path.isdir(subject_path):
            courses_file = os.path.join(subject_path, 'courses.json')
            
            if os.path.exists(courses_file):
                try:
                    with open(courses_file, 'r') as f:
                        data = json.load(f)

                        courses = data.get('courses', [])
                        
                        if courses:
                            print(f'Inserting {len(courses)} courses from {subject_dir}...')
                            
                            for course in courses:
                                course['subject'] = subject_dir.upper()  
                            
                            db['course-data'].insert_many(courses)
                        else:
                            print(f'Warning: No courses found in {courses_file}')
                except json.JSONDecodeError as e:
                    print(f"Error: Failed to parse JSON file: {courses_file}. Error: {e}")
                except Exception as e:
                    print(f"Error: Failed to process {courses_file}. Error: {e}")
            else:
                print(f'Warning: Courses file not found: {courses_file}')
        else:
            print(f'Warning: {subject_path} is not a directory')

if __name__ == '__main__':
    load_dotenv()
    
    MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
    DB_NAME = os.getenv('DB_NAME', 'dbName')

    try:
        client = MongoClient(MONGODB_URI)
        db = client[DB_NAME]

        load_courses(db)
    except Exception as e:
        print(f"Error: Could not connect to MongoDB. {e}")
    finally:

        client.close()
        print("MongoDB connection closed.")
