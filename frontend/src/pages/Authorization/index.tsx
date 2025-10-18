import { useEffect, useState, useCallback } from "react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { DefaultValue } from "../../types/default.types";
import Password from "../../components/UI/Password";
import './style.scss';
import { useNavigate } from "react-router-dom";
import { ButtonType } from "../../components/UI/Button";
import { authorizeUser } from "../../api/user";
import { saveTokenToStorage } from "../../redux/user/actions";
import { useTypedDispatch } from "../../redux/store";
import { resetValidation, validateEmail, validatePassword, validateValue } from "../../utils/validation";
import { showErrorToast } from "../../utils/toast";
import authBackground from '../../assets/auth_back.png';
import { useSelector } from "react-redux";
import { selectAuthData } from "../../redux/user/selectors";
import { LoadStatus } from "../../utils/types";
import Logo from "../../components/default/Logo";

function Authorization() {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const {token, status} = useSelector(selectAuthData);

    // Все useState хуки должны быть в начале компонента
    const [email, setEmail] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    const [password, setPassword] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    const [isValidateSuccess, setIsValidateSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRedirect = useCallback(() => {
        if (token && status === LoadStatus.SUCCESS) {
            navigate('/auth-proccess');
        }
    }, [token, status, navigate]);

    useEffect(() => {
        // Используем setTimeout для отложенного выполнения навигации
        const timer = setTimeout(() => {
            handleRedirect();
        }, 0);
        
        return () => clearTimeout(timer);
    }, [handleRedirect]);
    
    useEffect(() => {
        if(email.success && password.success) {
            setIsValidateSuccess(true);
        } else {
            setIsValidateSuccess(false);
        }
    }, [email.success, password.success]);

    const handleLogin = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await authorizeUser({
                email: email.value,
                password: password.value,
            });
            
            console.log('response', response);
            
            if (response && response.token) {
                dispatch(saveTokenToStorage(response.token));
                // Отложенная навигация для избежания проблем с concurrent rendering
                setTimeout(() => {
                    navigate('/auth-proccess');
                }, 0);
            } else {
                showErrorToast('Неверный ответ сервера');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.error?.message || error.message || 'Произошла ошибка при авторизации';
            showErrorToast(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [email.value, password.value, dispatch, navigate]);

    // Показываем загрузку пока проверяем токен - после всех хуков
    if (status === LoadStatus.IN_PROGRESS) {
        return <div>Загрузка...</div>;
    }
    
    return (
        <div className="authorization-page" style={{ backgroundImage: `url(${authBackground})` }}>
            <div className="authorization-page__logo-header">
                <Logo type="white" />
            </div>
            <div className="container">
                <div className="wrapper">
                    <div className="authorization-page__content">
                        <h1 className="authorization-page__title">
                            Авторизация
                        </h1>
                        <Input
                            label="Электронная почта"
                            placeholder="example@mail.com"
                            value={email.value}
                            onChange={(value) => setEmail({ ...email, value, success: true, error: '' })}
                            onBlur={() => {
                                validateValue({
                                    value: email.value,
                                    setField: setEmail,
                                    validateFnc: validateEmail,
                                    needValidate: true,
                                })
                            }}
                            onFocus={() => {
                                resetValidation(email, setEmail)
                            }}
                            error={email.error}
                            disabled={email.isDisabled}
                        />
                        <Password 
                            label="Пароль"
                            placeholder="********"
                            value={password.value}
                            onChange={(value) => setPassword({ ...password, value, success: true, error: '' })}
                            onBlur={() => {
                                validateValue({
                                    value: password.value,
                                    setField: setPassword,
                                    validateFnc: validatePassword,
                                    needValidate: true,
                                })
                            }}
                            onFocus={() => {
                                resetValidation(password, setPassword)
                            }}
                            error={password.error}
                            disabled={password.isDisabled}
                        />
                        <div className="authorization-page__buttons">
                            <Button
                                onClick={() => navigate('/')}
                                variant={ButtonType.GRAY}
                            >
                                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <svg width="16" height="16" style={{ marginRight: 6 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </span>
                            </Button>
                            <Button
                                onClick={() => navigate('/registration')}
                                variant={ButtonType.GRAY}
                            >
                                Регистрация
                            </Button>
                            <Button
                                onClick={handleLogin}
                                disabled={!isValidateSuccess}
                                loading={isLoading}
                                className="big"
                            >
                                Войти
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authorization;