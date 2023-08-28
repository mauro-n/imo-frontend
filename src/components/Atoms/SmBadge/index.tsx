import style from './style.module.scss';

type SmBadge = {
    children: string
}
export const SmBadge = ( {children}: SmBadge) => {
    return (
        <li className={style['detail']}>
            {children}
        </li>
    )
}