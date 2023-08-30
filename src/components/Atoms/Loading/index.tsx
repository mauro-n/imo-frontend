import style from './style.module.scss';

export const Loading = () => {
    return (
        <div className={style['loading']}>
            <div className={style['spin-icon']}></div>
        </div>
    )
}