import React from "react";
import {DefaultValue} from "../types/default.types";

type ValidationParams = {
    value: any;
    setField: React.Dispatch<React.SetStateAction<DefaultValue<any>>> | ((val: DefaultValue<any>) => void);
    validateFnc?: (value: any) => ValidationResult;
    needValidate?: boolean;
};

type ValidationResult = {
     status: boolean;
     errorText: string;
 };

export const validateValue: (params: ValidationParams) => void = ({
                                                                        value,
                                                                        setField,
                                                                        validateFnc,
                                                                        needValidate = true,
                                                                    }) => {
    let validation = {
        status: true,
        errorText: '',
    };

    if (validateFnc) {
        const validationRes = validateFnc(value);
        validation = {
            errorText: validationRes.errorText,
            status: validationRes.status,
        };
    }
    if ((value == '' || value?.trim?.() == '') && needValidate) {
        validation.status = false;
        validation.errorText = 'Поле не может быть пустым';
    }
    setField({
        value: value,
        success: validation.status,
        error: validation.errorText,
        isDisabled: false,
    });
};

export const validateEmail = (email: string): ValidationResult => {
    if (!/^(?=.{1,42}$)([А-яЁёA-Za-z0-9]+[А-яЁёA-Za-z0-9._+-]{0,31}[А-яЁёA-Za-z0-9])@[А-яЁёA-Za-z0-9]+([-\._][А-яЁёA-Za-z0-9]+)*(\.[А-яЁёA-Za-z]{2,10})+$/u.test(email)) {
        return {
            status: false,
            errorText: 'E-mail указан неверно. Проверьте введённые данные'
        }
    }

    return {
        status: true,
        errorText: '',
    }
}

export const validatePassword = (password: string): ValidationResult => {
    if (!password || password.trim().length < 8) {
        return {
            status: false,
            errorText: 'Пароль должен быть минимум 8 символов',
        };
    }

    return {
        status: true,
        errorText: '',
    };
};

export const resetValidation = (state: DefaultValue<any>, setState: React.Dispatch<React.SetStateAction<DefaultValue<any>>>) => {
    setState({ ...state, success: true, error: '' })
}