import React from 'react';
export interface IBibliographyProps extends React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement> {
    mode: 'input' | 'print';
    num?: number;
    source?: string;
}
export declare const Bibliography: React.FunctionComponent<IBibliographyProps>;
