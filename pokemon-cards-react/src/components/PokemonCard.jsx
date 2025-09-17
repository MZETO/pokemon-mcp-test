import PokemonService from '../services/PokemonService';
import PropTypes from 'prop-types';

const PokemonCard = ({ pokemon, isFlipped, onCardClick, onDoubleClick }) => {
    const typeColors = PokemonService.getTypeColors(pokemon.types);
    const typeBackground = PokemonService.getTypeBackgrounds(pokemon.types);
    const mainType = pokemon.types[0];
    const mainStats = pokemon.stats.slice(0, 4);
    
    const cardStyle = {
        '--primary-color': typeColors.primary,
        '--secondary-color': typeColors.secondary,
        '--type-background': typeBackground.background
    };

    return (
        <div 
            className={`pokemon-card ${isFlipped ? 'flipped' : ''}`}
            data-pokemon-id={pokemon.id}
            data-type={mainType}
            onClick={onCardClick}
            onDoubleClick={onDoubleClick}
        >
            <div className="card-inner">
                {/* Frente de la carta */}
                <div className="card-front" style={cardStyle}>
                    <div className="card-header">
                        <div className="pokemon-name">
                            {PokemonService.capitalizeFirst(pokemon.name)}
                        </div>
                        <div className="pokemon-id">
                            #{pokemon.id.toString().padStart(3, '0')}
                        </div>
                    </div>
                    
                    <div className="pokemon-image-container">
                        <img 
                            src={pokemon.sprites.front} 
                            alt={pokemon.name} 
                            className="pokemon-image" 
                            loading="lazy"
                        />
                        <div className="image-glow"></div>
                    </div>
                    
                    <div className="card-info">
                        <div className="pokemon-types">
                            {pokemon.types.map(type => (
                                <span 
                                    key={type}
                                    className={`type-badge type-${type}`}
                                >
                                    {PokemonService.capitalizeFirst(type)}
                                </span>
                            ))}
                        </div>
                        
                        <div className="pokemon-stats">
                            {mainStats.map(stat => (
                                <div key={stat.name} className="stat-item">
                                    <span className="stat-name">
                                        {PokemonService.formatStatName(stat.name)}
                                    </span>
                                    <span className="stat-value">{stat.base}</span>
                                    <div className="stat-bar">
                                        <div 
                                            className="stat-fill" 
                                            style={{ 
                                                width: `${Math.min(stat.base / 150 * 100, 100)}%` 
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="abilities">
                            <div className="abilities-title">Habilidades</div>
                            <div className="abilities-list">
                                {pokemon.abilities.map(ability => 
                                    PokemonService.capitalizeFirst(ability.replace('-', ' '))
                                ).join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Reverso de la carta */}
                <div className="card-back" data-type={mainType} style={cardStyle}>
                    <div className="card-back-content">
                        <div className="pokemon-silhouette">
                            <img 
                                src={pokemon.sprites.back || pokemon.sprites.front} 
                                alt={`${pokemon.name} back`} 
                                className="back-image"
                            />
                        </div>
                        <div className="back-info">
                            <h3 className="back-name">
                                {PokemonService.capitalizeFirst(pokemon.name)}
                            </h3>
                            <div className="physical-stats">
                                <div className="physical-stat">
                                    <span className="stat-label">📏 Altura</span>
                                    <span className="stat-value">{pokemon.height}m</span>
                                </div>
                                <div className="physical-stat">
                                    <span className="stat-label">⚖️ Peso</span>
                                    <span className="stat-value">{pokemon.weight}kg</span>
                                </div>
                            </div>
                            <div className="flavor-text">
                                `Un increíble Pokémon de tipo {pokemon.types.map(t => 
                                    PokemonService.capitalizeFirst(t)
                                ).join('/')} con habilidades únicas.`
                            </div>
                            <div className="all-stats">
                                {pokemon.stats.slice(4).map(stat => (
                                    <div key={stat.name} className="mini-stat">
                                        <span>{PokemonService.formatStatName(stat.name)}</span>
                                        <span>{stat.base}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string).isRequired,
        abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
        stats: PropTypes.arrayOf(PropTypes.object).isRequired,
        sprites: PropTypes.object.isRequired,
        height: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired
    }).isRequired,
    isFlipped: PropTypes.bool.isRequired,
    onCardClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func.isRequired
};

export default PokemonCard;