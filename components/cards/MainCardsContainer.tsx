import './cards__styles.css'
import MainCard, {CardProps} from "@/components/cards/MainCard";

const MainCardsContainer = ({cards}: {cards: CardProps[]}) => {
    return (
        <div className={"main-card__container"}>
            {cards.map((card: CardProps) => (
                    <MainCard key={card.path} imgPath={card.imgPath} title={card.title} path={card.path}/>
                )
            )}
        </div>
    );
};

export default MainCardsContainer;