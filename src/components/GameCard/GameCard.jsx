import GameHeader from "../GameHeader/GameHeader";
import InningTable from "../InningTable/IninngTable";

const GameCard = ({ game, innings }) => {
  return (
    <>
      <GameHeader game={game} />

      <InningTable innings={innings} game={game} />
    </>
  );
};

export default GameCard;
