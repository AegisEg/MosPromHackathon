import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Text from '../../components/UI/Text';
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button"
import { DefaultValue } from "../../types/default.types";
import Select from "../../components/UI/Select";

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
    const { i18n } = useTranslation();

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
                        error={surname.error}
                        disabled={surname.isDisabled}
                        required
                    />
                    <Input
                        label="Имя"
                        placeholder="Иван"
                        value={name.value}
                        onChange={(value) => setName({ ...name, value, success: true, error: '' })}
                        error={name.error}
                        disabled={name.isDisabled}
                        required
                    />
                    <Input
                        label="Отчество"
                        placeholder="Иванович"
                        value={patronymic.value}
                        onChange={(value) => setPatronymic({ ...patronymic, value, success: true, error: '' })}
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
                        disabled={confirmPassword.isDisabled}
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
                <Button>
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    );
};

export default Registration;
