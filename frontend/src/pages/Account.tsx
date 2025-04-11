import React from 'react'
import useFetchRole from '../hooks/useFetchRole'
import Loading from '../components/Loading';
import { useNavigate } from 'react-router';
function Account() {
    const {role, loading, error} = useFetchRole();
    const token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();
  return (
    <>
        {loading ? <Loading /> : ('') }
        <div className='mx-auto col-2 d-flex flex-column align-items-center'>
        {error ? 
        <div><p>Щоб перейти на цю сторінку, будь ласка, авторизуйтеся!</p><button onClick={()=> navigate('/login-register')}>Log in</button></div>  
        : <><div>Ваша роль: {role}</div> {role === 'superuser' ? <button>button</button> : '' }</> 
         }

    </div>
    </>

  )
}

export default Account