import ReactModal from "react-modal"
import style from './style.module.scss';
import { Heading } from "../Heading";
import { SubTitle } from "../SubTitle";

type ConfirmAction = {
    title?: string,
    subTitle?: string,
    isOpen: boolean,
    onRequestClose: Function,
    onConfirm?: Function,
    onReject?: Function
}

export const ConfirmAction = ({
    title = 'Confirmar ação?',
    subTitle = 'Esta ação é irrerversível',
    isOpen,
    onRequestClose,
    onConfirm = () => null,
    onReject = () => null }: ConfirmAction) => {
    const closeFn = onRequestClose;

    const customModal = {
        overlay: {
            zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
        }
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={() => closeFn()}
            className={style['confirmation-modal']}
            style={customModal}
            ariaHideApp={false}
        >
            <Heading as='h3' size='md'>{title}</Heading>
            <SubTitle>{subTitle}</SubTitle>
            <div className={style['btn-container']}>
                <button
                    className={`
                    ${style['reject']}
                    ${style['btn']}
                    `}
                    onClick={() => onReject()}
                >
                    Cancelar
                </button>
                <button
                    className={`
                    ${style['confirm']}
                    ${style['btn']}
                    `}
                    onClick={() => onConfirm()}
                >
                    Confirmar
                </button>
            </div>
        </ReactModal>
    )
}