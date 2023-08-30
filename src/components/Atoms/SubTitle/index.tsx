import style from './style.module.scss';

type SubTitle = {
    children: string,
    as?: React.ElementType
}

export const SubTitle = ({ children, as = 'p' }: SubTitle) => {
    const As = as;
    return (
        <As className={style['subtitle']}>{children}</As>
    )
}