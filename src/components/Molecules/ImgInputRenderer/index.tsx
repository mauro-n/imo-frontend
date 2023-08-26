import style from './style.module.scss';
/* Bootstrap */
import { Form } from "react-bootstrap"
/* Hooks */
import { useRef } from 'react';

type img = {
    id: string,
    file: any
}

type imgInput = {
    source: img[],
    setSource: any
}

export const ImgInputRenderer = ({ source, setSource }: imgInput) => {
    const images = source;
    const setImages = setSource;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImgUpload = (e: any) => {
        const file = e?.target?.files[0];
        const name = e?.target?.name;

        if (file) {
            const newImages = images.map((img) => {
                if (img.id === name) {
                    return { ...img, file: file }
                }
                return img;
            });
            setImages(newImages);
        }
    }

    const handleImgDelete = (e: any) => {
        e.preventDefault();
        const id = e?.target?.value;
        for (let img of images) {
            if (img.id === id && !img.file) {
                if (inputRef?.current) inputRef.current.focus();
                return;
            };
        }

        const newImages = images.filter((img) => {
            if (img.id !== id) return img;
        });

        return setImages(newImages);
    }

    return (
        <>
            {images.length > 0 ?
                images.map((img) => {
                    return (
                        <div
                            key={img.id}
                            className={style['imgInput-container']}
                        >
                            <Form.Control
                                ref={inputRef}
                                name={img.id}
                                type='file'
                                onChange={(e) => handleImgUpload(e)}
                            />
                            <button
                                className={style['delete']}
                                onClick={(e) => handleImgDelete(e)}
                                value={img.id}
                            >
                                X
                            </button>
                        </div>
                    )
                })
                : <></>

            }
        </>
    )
}