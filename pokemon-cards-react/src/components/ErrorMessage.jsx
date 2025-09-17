import PropTypes from 'prop-types';

const ErrorMessage = ({ onRetry }) => {
    return (
        <div className="error-message">
            <div className="error-icon">⚠️</div>
            <h3>Error al cargar Pokémon</h3>
            <p>No se pudo conectar con la API. Intenta de nuevo más tarde.</p>
            {onRetry && (
                <button className="retry-button" onClick={onRetry}>
                    Reintentar
                </button>
            )}
        </div>
    );
};

ErrorMessage.propTypes = {
    onRetry: PropTypes.func
};

export default ErrorMessage;