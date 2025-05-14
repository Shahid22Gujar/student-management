import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import { updateStudent } from "../services/mockAPIServices";
import { validateEmail } from "../utils";
function UpdateStudentComponent() {
  const { studentId } = useParams();
  const studentData = JSON.parse(localStorage.getItem("student"));
  console.log(studentData);
  const [firstName, setFirstName] = useState(studentData.firstName);
  const [email, setEmail] = useState(studentData.email);
  const [emailError, setEmailError] = useState("");
  const [lastName, setLastName] = useState(studentData.lastName);
  const [rollNumber, setRollNumber] = useState(studentData.rollNumber);
  const [grade, setGrade] = useState(studentData.grade);
  const [errorMessage, setErrorMessage] = useState("");
  const [course, setCourse] = useState(studentData.course);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const inputEmailValue = event.target.value;
    if (!validateEmail(inputEmailValue)) {
      setEmailError("Invalid Email.");
    } else {
      setEmailError("");
    }
    setEmail(inputEmailValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateStudent(studentId, {
      firstName: firstName,
      lastName: lastName,
      course: course,
      email: email,
      rollNumber: rollNumber,
      grade: grade,
    });
    if (response.errorMessage) {
      setErrorMessage(response.errorMessage);
    } else {
      navigate("/");
    }
  };
  return (
    <Container className="mt-5">
      <h1>Update Student</h1>
      <br></br>
      <Form onSubmit={handleSubmit}>
        {errorMessage && <p className="text text-danger">{{ errorMessage }}</p>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter email"
          />
          {emailError && <p className="text text-danger">Invalid Email</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGrade">
          <Form.Label>Grade</Form.Label>
          <Form.Control
            type="number"
            name="grade"
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
            placeholder="Grade"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCourse">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            name="course"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            placeholder="Course"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRollNumber">
          <Form.Label>Roll No.</Form.Label>
          <Form.Control
            type="number"
            name="rollNumber"
            value={rollNumber}
            onChange={(event) => setRollNumber(event.target.value)}
            placeholder="Roll Number"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
}
export default UpdateStudentComponent;
