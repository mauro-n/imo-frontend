import { Button } from "react-bootstrap"
import style from '../button.module.scss';
import dark from './style.module.scss';

export const DarkBtn = (props: any) => {
    const handleClick = props.handleClick;
    const children = props.children;
    const disabled = props?.disabled;

    return (
        <div className={style.btnContainer}>
            <Button
                className={dark.darkBtn}
                onClick={() => handleClick() }
                disabled={disabled}
            >
                {children}
            </Button>
        </div>
    )
}