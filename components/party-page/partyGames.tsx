export default function PartyGames({ games }: { games: Game[] }) {
    return (
        <div>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.name} - Player Count: {game.minplayers} to {game.maxplayers}</li>
                ))}
            </ul>
        </div>
    );
}