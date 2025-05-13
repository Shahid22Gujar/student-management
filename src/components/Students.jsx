import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { getStudents, deleteStudent } from '../services/mockAPIServices';
import SearchFormComponent from './SearchForm';
import { convertUTCDateToLocalDate } from '../utils';
import { useNavigate } from 'react-router';

function Student() {
    let navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [searchedStudents, setSearchedStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 4;

    useEffect(() => {
        getStudents().then(response => {
            setStudents(response.data);
            setSearchedStudents(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // pagination implementation
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = searchedStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(searchedStudents.length / studentsPerPage);

    const handleDelete = async (studentId) => {
        if (window.confirm('Are you sure you want to delete?')) {
            const deleteResponse = await deleteStudent(studentId);
            if (deleteResponse.errorMessage) {
                alert(deleteResponse.errorMessage);
            } else {
                const updatedList = students.filter(item => item.id !== studentId);
                setStudents(updatedList);
                setSearchedStudents(updatedList);
            }
        }
    };

   

    return (
        <Container>
            <h1>All Students</h1>
            <SearchFormComponent students={students} setSearchedStudents={setSearchedStudents} />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Roll No.</th>
                        <th>Grade</th>
                        <th>Course</th>
                        <th>Avatar</th>
                        <th>Created At</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.rollNumber}</td>
                            <td>{student.grade}</td>
                            <td>{student.course}</td>
                            <td><Image src={student.avatar} height={20} width={20} /></td>
                            <td>{convertUTCDateToLocalDate(new Date(student.createdAt)).toLocaleString()}</td>
                            <td><Button onClick={() => navigate(`/update/${student.id}`)}>Edit</Button></td>
                            <td><Button className='btn btn-danger' onClick={() => handleDelete(student.id)}>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="pagination-buttons">
                <Button disabled={currentPage === 1} onClick={() => handlePagination(currentPage - 1)}>Previous</Button>
                {[...Array(totalPages)].map((_, index) => (
                    <Button 
                        key={index + 1} 
                        onClick={() => handlePagination(index + 1)} 
                        variant={index + 1 === currentPage ? 'primary' : 'secondary'}>
                        {index + 1}
                    </Button>
                ))}
                <Button disabled={currentPage === totalPages} onClick={() => handlePagination(currentPage + 1)}>Next</Button>
            </div>
        </Container>
    );
}

export default Student;
