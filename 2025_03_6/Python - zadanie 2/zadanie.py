class Course:
    def __init__(self, name: str):
        self.name = name

class Student:
    def __init__(self, student_id: int, first_name: str, last_name: str, age: int):
        self.student_id = student_id
        self.first_name = first_name
        self.last_name = last_name
        self.age = age
        self.courses = []

    def add_course(self, course: Course):
        self.courses.append(course)

    def __str__(self):
        course_names = ", ".join(course.name for course in self.courses)
        return f"{self.first_name} {self.last_name} ({self.age} lat): {course_names}"

    def write_courses_to_file(self):
        with open(f"{self.first_name.lower()}_{self.last_name.lower()}.txt", 'w', encoding='utf-8') as f:
            f.write("Kursy:\n")
            for course in self.courses:
                f.write(f" - {course.name}\n")

def import_students(filename: str):
    students = {}
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file:
            student_id, first_name, last_name, age = line.strip().split(',')
            students[int(student_id)] = Student(int(student_id), first_name, last_name, int(age))
    return students

def import_courses(filename: str):
    courses = []
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file:
            student_id, course_name = line.strip().split(',')
            courses.append((int(student_id), course_name))
    return courses

def map_courses_to_students(students, courses):
    for student_id, course_name in courses:
        if student_id in students:
            course = Course(course_name)
            students[student_id].add_course(course)

def display_students(students):
    for student in students.values():
        print(student)

def main():
    students = import_students('students.txt')
    courses = import_courses('courses.txt')
    
    map_courses_to_students(students, courses)
    
    display_students(students)
    
    for student in students.values():
        student.write_courses_to_file()

if __name__ == "__main__":
    main()