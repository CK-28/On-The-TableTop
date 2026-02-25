export default function PartyGames({ games }: { games: Game[] }) {
    return (
        <div>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
    );
}