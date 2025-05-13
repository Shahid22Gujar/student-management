import { lazy, Suspense } from 'react'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import NavComponent from './components/NavComponent'
const Student = lazy(() => import('./components/Students'));
import LoaderComponent from './components/Loader';
import CreateStudentComponent from './components/CreateStudent'
import UpdateStudentComponent from './components/UpdateStudent'

function App() {
  
const posts=[1,2,3,4,6]

  return (
    <>
      <NavComponent/>
      <Routes>
        <Route path='/' element={<Suspense fallback={<LoaderComponent/>}><Student/></Suspense>}/>
        <Route path='/create' element={<CreateStudentComponent/>}/>
        <Route path='/update/:studentId' element={<UpdateStudentComponent/>}/>
      </Routes>
      
    </>
  )
}

export default App
