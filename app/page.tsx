import MainCardsContainer from "@/components/cards/MainCardsContainer";
import {CardProps} from "@/components/cards/MainCard";

const cards: CardProps[] = [
  {
    imgPath: "/placements_n.png",
    title: "Placements (no repetitions)",
    path: "/placements_no_repetitions"
  },
  {
    imgPath: "/placements_r.png",
    title: "Placements (with repetitions)",
    path: "/placements_with_repetitions"
  },
  {
    imgPath: "/permutations_n.png",
    title: "Permutations (no repetitions)",
    path: "/permutations_no_repetitions"
  },
  {
    imgPath: "/permutations_r.png",
    title: "Permutations (with repetitions)",
    path: "/permutations_with_repetitions"
  },
  {
    imgPath: "/combinations_n.png",
    title: "Combinations (no repetitions)",
    path: "/combinations_no_repetitions"
  },
  {
    imgPath: "/combinations_r.png",
    title: "Combinations (with repetitions)",
    path: "/combinations_with_repetitions"
  },
  {
    imgPath: "/urn_all.png",
    title: "Url model (get all marked)",
    path: "/urn_all_marked"
  },
  {
    imgPath: "/urn_part.png",
    title: "Url model (get R marked)",
    path: "/urn_part_marked"
  },
];

export default function Combinatorics() {
  return (
    <>
      <MainCardsContainer cards={cards}/>
    </>
  );
}
