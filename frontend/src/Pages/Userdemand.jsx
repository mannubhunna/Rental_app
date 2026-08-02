
import { useNavigate } from 'react-router-dom'
import CustomerCard from './CustomerCard';

const Userdemand = () => {
  const Navigate= useNavigate();
  return (
    <>
    <div className='d-flex'>


<button onClick={()=>Navigate("/addcustomer/manual")} className='btn btn-primary m-3'>Add Client</button>
    </div>

    <CustomerCard/>
    
    </>
  )
}

export default Userdemand