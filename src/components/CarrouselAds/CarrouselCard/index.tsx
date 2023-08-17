import style from './style.module.scss';
import house from '../../../assets/img/house2.jpg';
import { Card } from 'react-bootstrap';

export const CarrouselCard = (props: any) => {
    const region: string = props.region ? props.region : 'Unknow';
    const price: string = props.price ? props.price : 'xxx.xxx';

    return (
        <Card className={`${style.card} bg-dark text-white`}>
            <Card.Img src={house} className={style.cardImg} alt="Card image" />
            <Card.ImgOverlay className={style.cardContent}>
                <Card.Title className={style.cardTitle}>{price}</Card.Title>
                <Card.Subtitle>{region}</Card.Subtitle>
            </Card.ImgOverlay>
        </Card>
    );
}