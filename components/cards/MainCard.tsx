import Link from "next/link";
import './cards__styles.css'

export type CardProps = {
    imgPath: string,
    title: string,
    path: string;
}

const MainCard = ({imgPath, title, path}: CardProps) => {
    return (
        <Link href={path} className={"main-card__title"}><div className={"main-card__item"}>
            <img src={imgPath} alt={title + " image"} className={"main-card__image"}/>
            <span>{title}</span>
        </div></Link>
    );
};

export default MainCard;