import { useEffect, useState } from "react";
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

function Authorization() {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    const [password, setPassword] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    const [isValidateSuccess, setIsValidateSuccess] = useState<boolean>(false);
    
    useEffect(() => {
        if(email.success && password.success) {
            setIsValidateSuccess(true);
        } else {
            setIsValidateSuccess(false);
        }
    }, [email.success, password.success]);

    const handleLogin = () => {
        authorizeUser({
            email: email.value,
            password: password.value,
        }).then((response) => {
            console.log('response', response);
            dispatch(saveTokenToStorage(response.token));
            navigate('/protected');
        }).catch((error) => {
            const errorMessage = error.response?.data?.error || 'Произошла ошибка при авторизации';
            showErrorToast(errorMessage);
        });
    }
    
    return (
        <div className="authorization-page" style={{ backgroundImage: `url(${authBackground})` }}>
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
                                Вернуться
                            </Button>
                            <Button
                                onClick={handleLogin}
                                disabled={!isValidateSuccess}
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