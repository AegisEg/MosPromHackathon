import { useEffect } from "react";
import Loader from "../../components/default/Loader"
import { clearTokenFromStorage } from "../../redux/user/actions";
import { useTypedDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../api/user";
import './style.scss';

const LogoutPage = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                // Вызываем эндпоинт logout
                await logoutUser();
                
                // Очищаем токен из storage
                await dispatch(clearTokenFromStorage());
                
                // Перенаправляем на главную страницу
                navigate('/');
            } catch (error) {
                console.error('Ошибка при выходе:', error);
                
                // Даже если API вернул ошибку, очищаем токен и перенаправляем
                await dispatch(clearTokenFromStorage());
                navigate('/');
            }
        };

        performLogout();
    }, [dispatch, navigate]);
    
    return (
        <div className="logout-page">
            <Loader />
        </div>
    )
}

export default LogoutPage;