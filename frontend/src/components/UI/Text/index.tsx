import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';

interface TextProps extends WithTranslation {
    children: string;
}

const Text: React.FC<TextProps> = ({children, t }) => {
    return <>{t(children)}</>;
};

export default withTranslation()(Text);
