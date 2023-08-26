import style from './style.module.scss';
import { useState } from 'react';

type inputHelp = {
    id?: string
    children: string
    drop?: "center" | "end"
}

export const InputHelp = ({ children, id, drop }: inputHelp) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <span
            className={style['inputHelp']}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <span className={style['inputHelp-title']}>?</span>
            <span
                className={`
                ${style['inputHelp-body']}
                ${isHover ? style['body--hover'] : ''}
                ${drop ? style[`drop-${drop}`] : ''}
                `}
                id={id}
            >
                {children}
            </span>
        </span>
    )
}