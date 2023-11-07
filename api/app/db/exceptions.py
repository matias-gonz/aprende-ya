class EmailTakenException(Exception):
    def __init__(self):
        self.message = "Email is already taken"
        super().__init__(self.message)


class WrongCredentialsException(Exception):
    def __init__(self):
        self.message = "Wrong credentials"
        super().__init__(self.message)


class CourseNameTakenException(Exception):
    def __init__(self):
        self.message = "Course name is already taken"
        super().__init__(self.message)

class CourseNotFoundException(Exception):
    def __init__(self, message="Course not found"):
        self.message = message
        super().__init__(self.message)
