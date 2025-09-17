import PropTypes from 'prop-types';

const NoResults = ({ searchTerm, onRetry }) => {
    return (
        <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No se encontraron Pokémon</h3>
            <p>
                {searchTerm 
                    ? `No se encontraron resultados para "${searchTerm}"` 
                    : 'Intenta con otro nombre o tipo'
                }
            </p>
            {onRetry && (
                <button className="retry-button" onClick={onRetry}>
                    Cargar Pokémon populares
                </button>
            )}
        </div>
    );
};

NoResults.propTypes = {
    searchTerm: PropTypes.string,
    onRetry: PropTypes.func
};

export default NoResults;