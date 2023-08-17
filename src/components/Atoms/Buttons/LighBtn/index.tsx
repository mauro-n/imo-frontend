import { Button } from "react-bootstrap"
import style from '../button.module.scss';
import light from './style.module.scss';

export const LightBtn = (props: any) => {
    const handleClick = props.handleClick;
    const children = props.children;
    const disabled = props?.disabled;

    return (
        <div className={style.btnContainer}>
            <Button
                className={light.lightBtn}
                onClick={() => handleClick() }
                disabled={disabled}
            >
                {children}
            </Button>
        </div>
    )
}