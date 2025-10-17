import React, { useState } from "react";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { DefaultValue } from "../../types/default.types";
import Password from "../../components/UI/Password";
import './style.scss';
import { useNavigate } from "react-router-dom";
import { ButtonType } from "../../components/UI/Button";

function Authorization() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    const [password, setPassword] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });

    const handleLogin = () => {
        console.log(email, password);
    }
    
    return (
        <div className="authorization-page">
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
                            error={email.error}
                            disabled={email.isDisabled}
                            required
                        />
                        <Password 
                            label="Пароль"
                            placeholder="********"
                            value={password.value}
                            onChange={(value) => setPassword({ ...password, value, success: true, error: '' })}
                            error={password.error}
                            disabled={password.isDisabled}
                            required
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
                                disabled={email.isDisabled || password.isDisabled}
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