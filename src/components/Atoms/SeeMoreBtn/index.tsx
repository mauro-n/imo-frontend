import style from './style.module.scss';
export const SeeMoreBtn = (props: any) => {
    const text: string = props.children || 'Ver mais';

    return (
        <button className={style.btn}>
            {text}
        </button>
    )
}