import { useState, useEffect, useCallback } from 'react';
import PokemonCard from './components/PokemonCard';
import SearchContainer from './components/SearchContainer';
import ZoomOverlay from './components/ZoomOverlay';
import LoadingSpinner from './components/LoadingSpinner';
import NoResults from './components/NoResults';
import ErrorMessage from './components/ErrorMessage';
import PokemonService from './services/PokemonService';

function App() {
    // Estados principales
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Estados de búsqueda y filtros
    const [searchValue, setSearchValue] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    
    // Estados de UI
    const [flippedCards, setFlippedCards] = useState(new Set());
    const [zoomPokemon, setZoomPokemon] = useState(null);
    const [isZoomActive, setIsZoomActive] = useState(false);

    // Actualizar fondo según el tipo seleccionado
    const updateBackgroundForType = useCallback((type) => {
        const typeGradients = PokemonService.getTypeGradients();
        const gradient = type ? typeGradients[type] : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        document.body.style.background = gradient;
    }, []);

    // Cargar Pokémon iniciales
    const loadInitialPokemon = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await PokemonService.loadInitialPokemon();
            setFilteredData(data);
        } catch (error) {
            console.error('Error loading initial Pokémon:', error);
            setError('Error al cargar Pokémon iniciales');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Effect para cargar datos iniciales solo una vez
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await PokemonService.loadInitialPokemon();
                setFilteredData(data);
            } catch (error) {
                console.error('Error loading initial Pokémon:', error);
                setError('Error al cargar Pokémon iniciales');
            } finally {
                setIsLoading(false);
            }
        };
        
        loadData();
    }, []); // Solo ejecutar una vez al montar

    // Effect para manejar búsqueda con debounce
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchValue && searchValue.length >= 2) {
                // Buscar por nombre
                setIsLoading(true);
                setError(null);
                try {
                    const pokemon = await PokemonService.fetchPokemonData(searchValue.toLowerCase());
                    if (pokemon) {
                        setFilteredData([pokemon]);
                    } else {
                        setFilteredData([]);
                    }
                } catch (error) {
                    console.error('Error searching by name:', error);
                    setFilteredData([]);
                    setError('Error al buscar Pokémon');
                } finally {
                    setIsLoading(false);
                }
            } else if (typeFilter) {
                // Buscar por tipo
                setIsLoading(true);
                setError(null);
                try {
                    const data = await PokemonService.searchPokemonByType(typeFilter);
                    setFilteredData(data);
                } catch (error) {
                    console.error('Error searching by type:', error);
                    setError('Error al buscar por tipo');
                    setFilteredData([]);
                } finally {
                    setIsLoading(false);
                }
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchValue, typeFilter]);

    // Manejar cambio de tipo
    const handleTypeChange = useCallback(async (selectedType) => {
        setTypeFilter(selectedType);
        updateBackgroundForType(selectedType);
        
        if (selectedType) {
            // Buscar por tipo directamente aquí
            setIsLoading(true);
            setError(null);
            try {
                const data = await PokemonService.searchPokemonByType(selectedType);
                setFilteredData(data);
            } catch (error) {
                console.error('Error searching by type:', error);
                setError('Error al buscar por tipo');
                setFilteredData([]);
            } finally {
                setIsLoading(false);
            }
        } else {
            await loadInitialPokemon();
        }
    }, [loadInitialPokemon, updateBackgroundForType]);

    // Limpiar búsqueda
    const clearSearch = useCallback(() => {
        setSearchValue('');
        setTypeFilter('');
        updateBackgroundForType('');
        loadInitialPokemon();
    }, [loadInitialPokemon, updateBackgroundForType]);

    // Manejar click en carta (flip)
    const handleCardClick = useCallback((pokemonId) => {
        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(pokemonId)) {
                newSet.delete(pokemonId);
            } else {
                newSet.add(pokemonId);
            }
            return newSet;
        });
    }, []);

    // Manejar doble click (zoom)
    const handleCardDoubleClick = useCallback((pokemon) => {
        setZoomPokemon(pokemon);
        setIsZoomActive(true);
        document.body.style.overflow = 'hidden';
    }, []);

    // Cerrar zoom
    const closeZoom = useCallback(() => {
        setIsZoomActive(false);
        setZoomPokemon(null);
        document.body.style.overflow = '';
    }, []);

    // Manejar teclas de escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (isZoomActive) {
                    closeZoom();
                } else if (searchValue.length > 0) {
                    clearSearch();
                }
            }
            
            // Ctrl+F para enfocar búsqueda
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
                document.getElementById('searchInput')?.select();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isZoomActive, searchValue, closeZoom, clearSearch]);

    // Cargar datos iniciales al montar el componente
    useEffect(() => {
        loadInitialPokemon();
    }, [loadInitialPokemon]);

    return (
        <div className="container">
            <header className="header">
                <h1 className="title">Pokédex Interactiva</h1>
                <p className="subtitle">Haz click para girar las cartas • Doble click para zoom</p>
                
                <SearchContainer
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    typeFilter={typeFilter}
                    onTypeChange={handleTypeChange}
                    onClearSearch={clearSearch}
                    resultsCount={filteredData.length}
                />
            </header>

            <main>
                {isLoading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage onRetry={loadInitialPokemon} />
                ) : (
                    <div className="cards-grid">
                        {filteredData.length === 0 ? (
                            <NoResults 
                                searchTerm={searchValue} 
                                onRetry={loadInitialPokemon}
                            />
                        ) : (
                            filteredData.map(pokemon => (
                                <PokemonCard
                                    key={pokemon.id}
                                    pokemon={pokemon}
                                    isFlipped={flippedCards.has(pokemon.id)}
                                    onCardClick={() => handleCardClick(pokemon.id)}
                                    onDoubleClick={() => handleCardDoubleClick(pokemon)}
                                />
                            ))
                        )}
                    </div>
                )}
            </main>

            <ZoomOverlay
                isActive={isZoomActive}
                pokemon={zoomPokemon}
                onClose={closeZoom}
            />
        </div>
    );
}

export default App;