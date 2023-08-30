import style from './style.module.scss';

type Heading = {
    as?: React.ElementType,
    children: string,
    center?: boolean,
    size?: string
}

export const Heading = ({
    as = 'h1',
    children,
    center = true,
    size }: Heading) => {
    const As = as;
    return (
        <As className={`
        ${style['heading']}
        ${center ? style['center'] : ''}
        ${size ? style[`${size}`] : style ['md']}`}
        >
            {children}
        </As>
    )
}