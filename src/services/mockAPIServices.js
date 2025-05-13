import axios from "axios";
import APIURL from "./constants";
async function getStudents() {
  let data=[]
  let errorMessage=''
  try {
    const response = await axios.get(APIURL);
    data=response.data
    console.log(data,'ddaddd')
  } catch (error) {
    errorMessage=error
  }
  return { data, errorMessage };
}
async function createStudent(payload) {
  let data=[]
  let errorMessage=''
 
  const response = await axios.post(APIURL,payload);
  if (response.ok){
    data=response.data
  }
  else{
    errorMessage=response.error
  }
  return { data, errorMessage };
}
async function updateStudent(id,payload) {
  let data=[]
  let errorMessage=''
 
  const response = await axios.put(`${APIURL}/${id}`,payload);
  if (response.ok){
    data=response.data
  }
  else{
    errorMessage=response.error
  }
  return { data, errorMessage };
}
async function deleteStudent(id) {
  let errorMessage=''
 
  const response = await axios.delete(`${APIURL}/${id}`);
  if (!response.ok){
      errorMessage=response.error
  }
  return { errorMessage };
}
export  {getStudents,createStudent,updateStudent,deleteStudent};