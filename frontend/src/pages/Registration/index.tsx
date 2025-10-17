import React, {useEffect, useState} from "react";
import Text from '../../components/UI/Text';
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button"
import { DefaultValue } from "../../types/default.types";
import Select from "../../components/UI/Select";
import {resetValidation, validateEmail, validatePassword, validateValue} from "../../utils/validation";
import { registerUser } from "../../api/user";
import { showErrorToast } from "../../utils/toast";
import { saveTokenToStorage } from "../../redux/user/actions";
import { useTypedDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
    const dispatch = useTypedDispatch();
    const navigate = useNavigate();

    const userRoleOptions = [
        { value: '1', label: 'Работодатель' },
        { value: '2', label: 'Соискатель' },
        { value: '3', label: 'Администратор' },
        { value: '4', label: 'Институт' },
    ];

    /**
     * Имя
     */
    const [name, setName] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    /**
     * Фамилия
     */
    const [surname, setSurname] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    /**
     * Отчество
     */
    const [patronymic, setPatronymic] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    /**
     * Почта
     */
    const [email, setEmail] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    /**
     * Пароль
     */
    const [password, setPassword] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    /**
     * Повторите пароль
     */
    const [confirmPassword, setConfirmPassword] = useState<DefaultValue<string>>({ value: '', success: false, error: '', isDisabled: false });
    /**
     * Роль
     */
    const [userRoleId, setUserRoleId] = useState<DefaultValue<number>>({ value: 0, success: false, error: '', isDisabled: false });

    /**
     * Валидность формы
     */
    const [isValidateSuccess, setIsValidateSuccess] = useState<boolean>(false);


    useEffect(() => {
        if(name.success && surname.success && patronymic.success &&
            email.success && password.success && confirmPassword.success &&
            userRoleId.success) {
            setIsValidateSuccess(true)
        } else {
            setIsValidateSuccess(false)

        }
    }, [name.success, surname.success, patronymic.success, email.success, password.success, confirmPassword.success, userRoleId.success]);


    const handleRegister = async () => {
        try {
            const result = await registerUser({
                role: userRoleId.value,
                first_name: name.value,
                last_name: surname.value,
                middle_name: patronymic.value,
                email: email.value,
                password: password.value,
            });
            
            console.log('result', result);
            
            // Сохраняем токен в Redux и localStorage
            if (result && result.token) {
                dispatch(saveTokenToStorage(result.token));
                showErrorToast('Регистрация прошла успешно!');
                navigate('/protected');
            }
        } catch (error: any) {
            console.log('error', error);
            const errorMessage = error.response?.data?.error?.message || 'Произошла ошибка при регистрации';
            showErrorToast(errorMessage);
        } 
    }

    return (
        <div className="registration-page">
            <div className="wrapper">
                <h1 className="main-page__title">
                    <Text>registrationTitle</Text>
                </h1>
                <div className="inner-wrapper">
                    <Input
                        label="Фамилия"
                        placeholder="Иванов"
                        value={surname.value}
                        onChange={(value) => setSurname({ ...surname, value, success: true, error: '' })}
                        onBlur={() => {
                            validateValue({
                                value: surname.value,
                                setField: setSurname,
                                needValidate: true,
                            })
                        }}
                        onFocus={() => {
                            resetValidation(surname, setSurname)
                        }}
                        error={surname.error}
                        disabled={surname.isDisabled}
                        required
                    />
                    <Input
                        label="Имя"
                        placeholder="Иван"
                        value={name.value}
                        onChange={(value) => setName({ ...name, value, success: true, error: '' })}
                        onBlur={() => {
                            validateValue({
                                value: name.value,
                                setField: setName,
                                needValidate: true,
                            })
                        }}
                        onFocus={() => {
                            resetValidation(name, setName)
                        }}
                        error={name.error}
                        disabled={name.isDisabled}
                        required
                    />
                    <Input
                        label="Отчество"
                        placeholder="Иванович"
                        value={patronymic.value}
                        onChange={(value) => setPatronymic({ ...patronymic, value, success: true, error: '' })}
                        onBlur={() => validateValue({
                            value: patronymic.value,
                            setField: setPatronymic,
                            needValidate: true,
                        })}
                        onFocus={() => {
                            resetValidation(patronymic, setPatronymic)
                        }}
                        error={patronymic.error}
                        disabled={patronymic.isDisabled}
                        required
                    />
                    <Input
                        label="E-mail"
                        type="email"
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
                        required
                    />
                    <Input
                        label="Пароль"
                        type="password"
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
                        required
                    />
                    <Input
                        label="Повторите пароль"
                        type="password"
                        placeholder="********"
                        value={confirmPassword.value}
                        onChange={(value) => setConfirmPassword({ ...confirmPassword, value, success: true, error: '' })}
                        error={confirmPassword.error}
                        disabled={!password.value && !password.success}
                        required
                    />
                    <Select
                        label="Роль"
                        options={userRoleOptions}
                        value={userRoleOptions.find(opt => opt.value === String(userRoleId.value))}
                        onChange={(option: any) => setUserRoleId({ ...userRoleId, value: Number(option?.value || 0), success: true, error: '' })}
                        placeholder="Выберите роль"
                        error={userRoleId.error}
                        isDisabled={userRoleId.isDisabled}
                        required
                    />
                </div>
                <Button onClick={handleRegister} disabled={!isValidateSuccess}>
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    );
};

export default Registration;
