from fastapi import FastAPI
import psycopg2
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# database connectivity
# connection = psycopg2.connect(
#   host = os.getenv("HOST"),
#   port = os.getenv("PORT"),
#   database = os.getenv("DATABASE"),
#   user = os.getenv("USER"),
#   password = os.getenv("PASSWORD")
# )

connection = psycopg2.connect(os.getenv("DATABASE_URL"))

cursor = connection.cursor()

# class base validation
class Student(BaseModel):
  id: int = None
  name: str = None
  course: str = None


# get all students
@app.get("/students")
def get_students():
  query = "SELECT * FROM students"

  cursor.execute(query)
  rows = cursor.fetchall()
  student_list = []
  for row in rows:
    student_dict ={
      "id": row[0],
      "name": row[1],
      "course": row[2]
    }

    student_list.append(student_dict)

  return student_list

# get single student
@app.get("/students/{id}")
def get_single_student(id: int):

  cursor.execute("SELECT * FROM students WHERE id = %s",(id,))
  row = cursor.fetchone()

  return{
    "id": row[0],
    "name": row[1],
    "course":row[2]
  }

# create new student record
@app.post("/students")
def create_student_record(student: Student):
  cursor.execute("INSERT INTO students VALUES(%s,%s,%s)",(student.id,student.name,student.course))
  connection.commit()

  return{
    "message": "Student Record Created Successfully!"
  }


# replace the student recorde
@app.put("/students/{id}")
def replace_student_record(id: int,student: Student):
  cursor.execute("Update students SET id=%s, name=%s, course=%s WHERE id=%s",(student.id,student.name,student.course,id))
  connection.commit()

  return{
    "message":"Student Record Replace Successfully!"
  }

# update the student record
@app.patch("/students/{id}")
def update_student_record(id:int,student: Student):
  if student.id != None:
    cursor.execute("UPDATE students SET id=%s WHERE id=%s",(student.id,id))
    connection.commit()

  if student.name != None:
    cursor.execute("UPDATE students SET name=%s WHERE id=%s",(student.name,id))
    connection.commit()
  
  if student.course != None:
    cursor.execute("UPDATE students SET course=%s WHERE id=%s",(student.course,id))
    connection.commit()


  return{
    "message": "Student Record Updated Successfully!"
  }


# Delete Student Recorc
@app.delete("/students/{id}")
def delete_student_record(id: int):
  cursor.execute("DELETE FROM students WHERE id=%s",(id,))
  connection.commit()

  return{
    "message":"Student Record Deleted Successfully!"
  }