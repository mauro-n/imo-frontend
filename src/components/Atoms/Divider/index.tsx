import style from './style.module.scss';

export const Divider = ({ children }: any) => {
    return (
        <div className={style.divider}>
            <div className={style.dividerLine}></div>
            { children }
            <div className={style.dividerLine}></div>
        </div>
    )
}