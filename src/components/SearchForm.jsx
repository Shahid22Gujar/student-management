import { useState } from "react";
import Form from "react-bootstrap/Form";

function SearchFormComponent({ students, setSearchedStudents }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    if (!searchValue) {
      setSearchedStudents(students);
    }
    const filteredStudents = students.filter((std) =>
      `${std.firstName} ${std.lastName} ${std.email} ${std.course}`
        .toLowerCase()
        .includes(searchValue)
    );
    setSearchedStudents(filteredStudents);
    setSearchTerm(searchValue);
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control
          type="text"
          placeholder="Search By Name,Email,Course"
          value={searchTerm}
          onChange={handleChange}
        />
        <Form.Label>Search</Form.Label>
      </Form.Group>
    </Form>
  );
}

export default SearchFormComponent;
