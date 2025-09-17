import PokemonCard from './PokemonCard';
import PropTypes from 'prop-types';

const ZoomOverlay = ({ isActive, pokemon, onClose }) => {
    if (!isActive || !pokemon) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className={`zoom-overlay ${isActive ? 'active' : ''}`}
            onClick={handleOverlayClick}
        >
            <div className="zoom-card">
                <PokemonCard 
                    pokemon={pokemon} 
                    isFlipped={false}
                    onCardClick={() => {}} // Deshabilitado en zoom
                    onDoubleClick={() => {}} // Deshabilitado en zoom
                />
            </div>
        </div>
    );
};

ZoomOverlay.propTypes = {
    isActive: PropTypes.bool.isRequired,
    pokemon: PropTypes.object,
    onClose: PropTypes.func.isRequired
};

export default ZoomOverlay;