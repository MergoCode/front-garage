import React from 'react'
import useFetchRole from '../hooks/useFetchRole'
import Loading from '../components/Loading';
import { useNavigate } from 'react-router';
import '../css/Account.scss'; // додаємо стилі

function Account() {
    const {role, loading, error} = useFetchRole();
    const token = sessionStorage.getItem('accessToken');
    const navigate = useNavigate();

    return (
        <>
            {loading && <Loading />}
            {error && (
                <div className="account-modal-backdrop">
                    <div className="modal-content">
                        <p>Щоб перейти на цю сторінку, будь ласка, авторизуйтеся!</p>
                        <button onClick={() => navigate('/login-register')}>Увійти</button>
                        <button className='my-3 cancel' onClick={() => navigate('/home')}>Скасувати</button>
                    </div>
                </div>
            )}
            {!error && (
                <div className='mx-auto col-2 d-flex flex-column align-items-center'>
                    <div>Ваша роль: {role}</div>
                    {role === 'superuser' && <button>button</button>}
                </div>
            )}
        </>
    )
}

export default Account;
