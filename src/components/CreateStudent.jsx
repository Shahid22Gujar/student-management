import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { createStudent } from "../services/mockAPIServices";
import { validateEmail } from "../utils";

function CreateStudentComponent() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [lastName, setLastName] = useState("");

  const [rollNumber, setRollNumber] = useState(1);
  const [grade, setGrade] = useState(1);
  const [course, setCourse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createStudent({
      firstName: firstName,
      course: course,
      lastName: lastName,
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
  const handleEmailChange = (event) => {
    const inputEmailValue = event.target.value;
    if (!validateEmail(inputEmailValue)) {
      setEmailError("Invalid Email.");
    } else {
      setEmailError("");
    }
    setEmail(inputEmailValue);
  };
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };
  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };
  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  return (
    <Container className="mt-5">
      <h1>Enter Student Data</h1>
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
            onChange={handleFirstNameChange}
            placeholder="First Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGrade">
          <Form.Label>Grade</Form.Label>
          <Form.Control
            type="number"
            name="grade"
            value={grade}
            onChange={handleGradeChange}
            placeholder="Grade"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCourse">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            name="course"
            value={course}
            onChange={handleCourseChange}
            placeholder="Course"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRollNumber">
          <Form.Label>Roll No.</Form.Label>
          <Form.Control
            type="number"
            name="rollNumber"
            value={rollNumber}
            onChange={handleRollNumberChange}
            placeholder="Roll Number"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </Container>
  );
}

export default CreateStudentComponent;
