import { useRegistration } from '../../../../hooks/useRegistration';
import style from '../floating.module.scss';
import { useState, useRef, useEffect } from 'react';

export const FloatingLabelName = (props: any) => {
    /* Extracting props */
    const placeholder: string = props?.placeholder;
    const label: string = props?.label;
    const prepend: string = props?.prepend;
    const disabled: boolean = props?.disabled;

    /* State */
    const { registration, setRegistration } = useRegistration();
    const { setErrMsg } = registration;
    const { validName } = registration;
    const [inputValue, setInputValue] = useState('');
    const [isFocus, setIsFocus] = useState(false);
    const inputRef: any = useRef();

    /* Updates the name ref on context */
    useEffect(() => {
        setRegistration((prev: any) => {
            return {
                ...prev,
                nameRef: inputRef
            }
        })
    }, [])

    const handleChange = () => {
        const curValue = inputRef.current?.value;
        const valid = curValue.length > 0 && curValue.length < 40;

        setRegistration((prev: any) => {
            return {
                ...prev,
                validName: valid,
                name: curValue,
            };
        });

        setInputValue(curValue);
        return;
    }

    const handleFocus = () => {
        setIsFocus(true)
        setErrMsg([]);
    }

    return (
        <>
            <div className={`${style['container']}`}>
                <div className={`${style['floating-label-content']} ${style['input-group']}`}>
                    <span className={style['prepend-container']}>
                        <div
                            className={`
                                ${style["prepend"]}
                                ${validName ? '' : inputValue ? style['invalid'] : ''}
                            `}
                            onClick={() => inputRef.current.focus()}
                        >
                            {prepend}
                        </div>
                    </span>
                    <input
                        className={`
                            ${style["floating-input"]}
                            ${inputValue ? style['has-value'] : ''}
                            ${isFocus ? style['has-value'] : ''}
                            ${validName ? '' : inputValue ? style['invalid'] : ''}
                        `}
                        type='text'
                        placeholder={placeholder}
                        onChange={() => handleChange()}
                        onFocus={handleFocus}
                        onBlur={() => setIsFocus(false)}
                        ref={inputRef}
                        disabled={disabled}
                    />
                    <label className={style["did-floating-label"]}>
                        {label}
                    </label>
                </div>
            </div>
        </>
    )
}