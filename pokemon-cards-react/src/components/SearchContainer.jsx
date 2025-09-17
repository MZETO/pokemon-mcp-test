import PropTypes from 'prop-types';

const SearchContainer = ({ 
    searchValue, 
    onSearchChange, 
    typeFilter, 
    onTypeChange, 
    onClearSearch, 
    resultsCount 
}) => {
    const pokemonTypes = [
        { value: 'normal', label: '⚪ Normal' },
        { value: 'fire', label: '🔥 Fuego' },
        { value: 'water', label: '💧 Agua' },
        { value: 'electric', label: '⚡ Eléctrico' },
        { value: 'grass', label: '🌱 Planta' },
        { value: 'ice', label: '❄️ Hielo' },
        { value: 'fighting', label: '👊 Lucha' },
        { value: 'poison', label: '☠️ Veneno' },
        { value: 'ground', label: '🌍 Tierra' },
        { value: 'flying', label: '🪶 Volador' },
        { value: 'psychic', label: '🔮 Psíquico' },
        { value: 'bug', label: '🐛 Bicho' },
        { value: 'rock', label: '🗿 Roca' },
        { value: 'ghost', label: '👻 Fantasma' },
        { value: 'dragon', label: '🐉 Dragón' },
        { value: 'dark', label: '🌚 Siniestro' },
        { value: 'steel', label: '⚙️ Acero' },
        { value: 'fairy', label: '🧚 Hada' }
    ];

    return (
        <div className="search-container">
            <div className="search-box">
                <input
                    type="text"
                    id="searchInput"
                    className="search-input"
                    placeholder="Buscar por nombre... (Ctrl+F)"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoComplete="off"
                    spellCheck="false"
                />
                {searchValue && (
                    <button
                        className="clear-button"
                        onClick={onClearSearch}
                        title="Limpiar búsqueda (Esc)"
                        aria-label="Limpiar búsqueda"
                    >
                        ✕
                    </button>
                )}
            </div>
            
            <div className="filter-box">
                <select
                    id="typeFilter"
                    className="type-filter"
                    value={typeFilter}
                    onChange={(e) => onTypeChange(e.target.value)}
                >
                    <option value="">🌈 Todos los tipos</option>
                    {pokemonTypes.map(type => (
                        <option key={type.value} value={type.value}>
                            {type.label}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="results-info">
                <span id="resultsCount">{resultsCount}</span> Pokémon encontrados
            </div>
        </div>
    );
};

SearchContainer.propTypes = {
    searchValue: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    typeFilter: PropTypes.string.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
    resultsCount: PropTypes.number.isRequired
};

export default SearchContainer;