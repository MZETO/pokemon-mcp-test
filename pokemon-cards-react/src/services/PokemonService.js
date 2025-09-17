// Configuración de la API
const API_BASE = 'https://pokeapi.co/api/v2';
const POKEMON_LIMIT = 20; // Límite de Pokémon por búsqueda

class PokemonService {
    // Obtener datos de un Pokémon específico
    static async fetchPokemonData(pokemonName) {
        try {
            const response = await fetch(`${API_BASE}/pokemon/${pokemonName}`);
            if (!response.ok) return null;
            
            const pokemonData = await response.json();
            
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                height: pokemonData.height / 10, // Convertir a metros
                weight: pokemonData.weight / 10, // Convertir a kg
                types: pokemonData.types.map(t => t.type.name),
                abilities: pokemonData.abilities.map(a => a.ability.name),
                stats: pokemonData.stats.map(s => ({
                    name: s.stat.name,
                    base: s.base_stat
                })),
                sprites: {
                    front: pokemonData.sprites.front_default,
                    back: pokemonData.sprites.back_default,
                    home: pokemonData.sprites.other?.home?.front_default,
                    dreamWorld: pokemonData.sprites.other?.dream_world?.front_default,
                    officialArtwork: pokemonData.sprites.other?.['official-artwork']?.front_default
                }
            };
        } catch (error) {
            console.error(`Error fetching ${pokemonName}:`, error);
            return null;
        }
    }

    // Buscar Pokémon por tipo
    static async searchPokemonByType(type) {
        try {
            const response = await fetch(`${API_BASE}/type/${type}`);
            if (!response.ok) throw new Error('Error fetching type data');
            
            const typeData = await response.json();
            const pokemonList = typeData.pokemon.slice(0, POKEMON_LIMIT);
            
            const pokemonPromises = pokemonList.map(p => 
                this.fetchPokemonData(p.pokemon.name)
            );
            
            const pokemonData = await Promise.all(pokemonPromises);
            return pokemonData.filter(pokemon => pokemon !== null);
        } catch (error) {
            console.error('Error searching by type:', error);
            throw error;
        }
    }

    // Cargar Pokémon populares iniciales
    static async loadInitialPokemon() {
        try {
            const popularPokemon = [
                'pikachu', 'charizard', 'blastoise', 'venusaur', 'mewtwo',
                'mew', 'lugia', 'celebi', 'rayquaza', 'dialga',
                'garchomp', 'lucario', 'greninja', 'decidueye'
            ];
            
            const pokemonPromises = popularPokemon.map(name => this.fetchPokemonData(name));
            const pokemonData = await Promise.all(pokemonPromises);
            return pokemonData.filter(pokemon => pokemon !== null);
        } catch (error) {
            console.error('Error loading initial Pokémon:', error);
            throw error;
        }
    }

    // Obtener colores para un tipo específico
    static getTypeColors(types) {
        const typeColorMap = {
            normal: { primary: '#A8A878', secondary: '#C6C6A7' },
            fire: { primary: '#F08030', secondary: '#F5AC78' },
            water: { primary: '#6890F0', secondary: '#9DB7F5' },
            electric: { primary: '#F8D030', secondary: '#FAE078' },
            grass: { primary: '#78C850', secondary: '#A7DB8D' },
            ice: { primary: '#98D8D8', secondary: '#BCE6E6' },
            fighting: { primary: '#C03028', secondary: '#D67873' },
            poison: { primary: '#A040A0', secondary: '#C183C1' },
            ground: { primary: '#E0C068', secondary: '#EBD69D' },
            flying: { primary: '#A890F0', secondary: '#C6B7F5' },
            psychic: { primary: '#F85888', secondary: '#FA92B2' },
            bug: { primary: '#A8B820', secondary: '#C6D16E' },
            rock: { primary: '#B8A038', secondary: '#D1C17D' },
            ghost: { primary: '#705898', secondary: '#A292BC' },
            dragon: { primary: '#7038F8', secondary: '#A27DFA' },
            dark: { primary: '#705848', secondary: '#A29288' },
            steel: { primary: '#B8B8D0', secondary: '#D1D1E0' },
            fairy: { primary: '#EE99AC', secondary: '#F4BDC9' }
        };

        const mainType = types[0];
        return typeColorMap[mainType] || typeColorMap.normal;
    }

    // Obtener gradientes de fondo por tipo
    static getTypeGradients() {
        return {
            normal: 'linear-gradient(135deg, #A8A878 0%, #C6C6A7 100%)',
            fire: 'linear-gradient(135deg, #F08030 0%, #FF6B1A 100%)',
            water: 'linear-gradient(135deg, #6890F0 0%, #4FC3F7 100%)',
            electric: 'linear-gradient(135deg, #F8D030 0%, #FFE082 100%)',
            grass: 'linear-gradient(135deg, #78C850 0%, #4CAF50 100%)',
            ice: 'linear-gradient(135deg, #98D8D8 0%, #B2EBF2 100%)',
            fighting: 'linear-gradient(135deg, #C03028 0%, #E57373 100%)',
            poison: 'linear-gradient(135deg, #A040A0 0%, #BA68C8 100%)',
            ground: 'linear-gradient(135deg, #E0C068 0%, #FFD54F 100%)',
            flying: 'linear-gradient(135deg, #A890F0 0%, #9FA8DA 100%)',
            psychic: 'linear-gradient(135deg, #F85888 0%, #F48FB1 100%)',
            bug: 'linear-gradient(135deg, #A8B820 0%, #9CCC65 100%)',
            rock: 'linear-gradient(135deg, #B8A038 0%, #FFB74D 100%)',
            ghost: 'linear-gradient(135deg, #705898 0%, #9575CD 100%)',
            dragon: 'linear-gradient(135deg, #7038F8 0%, #7986CB 100%)',
            dark: 'linear-gradient(135deg, #705848 0%, #8D6E63 100%)',
            steel: 'linear-gradient(135deg, #B8B8D0 0%, #B0BEC5 100%)',
            fairy: 'linear-gradient(135deg, #EE99AC 0%, #F8BBD9 100%)'
        };
    }

    // Obtener fondos temáticos para la imagen del Pokémon
    static getTypeBackgrounds(types) {
        const mainType = types[0];
        const backgroundPatterns = {
            fire: {
                background: 'radial-gradient(circle at 30% 70%, #FF6B1A 0%, transparent 50%), radial-gradient(circle at 70% 30%, #FF8A50 0%, transparent 50%), linear-gradient(135deg, #F08030 0%, #FF6B1A 100%)',
                pattern: '🔥'
            },
            water: {
                background: 'radial-gradient(circle at 20% 80%, #4FC3F7 0%, transparent 40%), radial-gradient(circle at 80% 20%, #81D4FA 0%, transparent 40%), linear-gradient(135deg, #6890F0 0%, #4FC3F7 100%)',
                pattern: '💧'
            },
            electric: {
                background: 'radial-gradient(circle at 25% 75%, #FFE082 0%, transparent 45%), radial-gradient(circle at 75% 25%, #FFF176 0%, transparent 45%), linear-gradient(135deg, #F8D030 0%, #FFE082 100%)',
                pattern: '⚡'
            },
            grass: {
                background: 'radial-gradient(circle at 30% 30%, #81C784 0%, transparent 50%), radial-gradient(circle at 70% 70%, #A5D6A7 0%, transparent 50%), linear-gradient(135deg, #78C850 0%, #4CAF50 100%)',
                pattern: '🌿'
            },
            ice: {
                background: 'radial-gradient(circle at 20% 20%, #E1F5FE 0%, transparent 60%), radial-gradient(circle at 80% 80%, #B3E5FC 0%, transparent 60%), linear-gradient(135deg, #98D8D8 0%, #B2EBF2 100%)',
                pattern: '❄️'
            },
            fighting: {
                background: 'radial-gradient(circle at 40% 60%, #E57373 0%, transparent 50%), linear-gradient(135deg, #C03028 0%, #E57373 100%)',
                pattern: '👊'
            },
            poison: {
                background: 'radial-gradient(circle at 35% 65%, #CE93D8 0%, transparent 50%), radial-gradient(circle at 65% 35%, #DA70D6 0%, transparent 50%), linear-gradient(135deg, #A040A0 0%, #BA68C8 100%)',
                pattern: '☠️'
            },
            ground: {
                background: 'radial-gradient(circle at 25% 75%, #FFCC02 0%, transparent 50%), radial-gradient(circle at 75% 25%, #FFD54F 0%, transparent 50%), linear-gradient(135deg, #E0C068 0%, #FFD54F 100%)',
                pattern: '🏔️'
            },
            flying: {
                background: 'radial-gradient(circle at 30% 30%, #C5CAE9 0%, transparent 60%), radial-gradient(circle at 70% 70%, #E8EAF6 0%, transparent 60%), linear-gradient(135deg, #A890F0 0%, #9FA8DA 100%)',
                pattern: '☁️'
            },
            psychic: {
                background: 'radial-gradient(circle at 40% 40%, #F8BBD9 0%, transparent 50%), radial-gradient(circle at 60% 60%, #F48FB1 0%, transparent 50%), linear-gradient(135deg, #F85888 0%, #F48FB1 100%)',
                pattern: '🔮'
            },
            bug: {
                background: 'radial-gradient(circle at 30% 70%, #AED581 0%, transparent 50%), radial-gradient(circle at 70% 30%, #C8E6C9 0%, transparent 50%), linear-gradient(135deg, #A8B820 0%, #9CCC65 100%)',
                pattern: '🐛'
            },
            rock: {
                background: 'radial-gradient(circle at 20% 80%, #BCAAA4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D7CCC8 0%, transparent 50%), linear-gradient(135deg, #B8A038 0%, #FFB74D 100%)',
                pattern: '🗿'
            },
            ghost: {
                background: 'radial-gradient(circle at 35% 35%, #B39DDB 0%, transparent 60%), radial-gradient(circle at 65% 65%, #9575CD 0%, transparent 60%), linear-gradient(135deg, #705898 0%, #9575CD 100%)',
                pattern: '👻'
            },
            dragon: {
                background: 'radial-gradient(circle at 25% 75%, #9C27B0 0%, transparent 50%), radial-gradient(circle at 75% 25%, #7986CB 0%, transparent 50%), linear-gradient(135deg, #7038F8 0%, #7986CB 100%)',
                pattern: '🐉'
            },
            dark: {
                background: 'radial-gradient(circle at 30% 70%, #6D4C41 0%, transparent 50%), radial-gradient(circle at 70% 30%, #8D6E63 0%, transparent 50%), linear-gradient(135deg, #705848 0%, #8D6E63 100%)',
                pattern: '🌙'
            },
            steel: {
                background: 'radial-gradient(circle at 40% 40%, #CFD8DC 0%, transparent 50%), radial-gradient(circle at 60% 60%, #ECEFF1 0%, transparent 50%), linear-gradient(135deg, #B8B8D0 0%, #B0BEC5 100%)',
                pattern: '⚙️'
            },
            fairy: {
                background: 'radial-gradient(circle at 30% 30%, #F8BBD9 0%, transparent 50%), radial-gradient(circle at 70% 70%, #FCE4EC 0%, transparent 50%), linear-gradient(135deg, #EE99AC 0%, #F8BBD9 100%)',
                pattern: '🧚'
            },
            normal: {
                background: 'radial-gradient(circle at 35% 65%, #D7CCC8 0%, transparent 50%), linear-gradient(135deg, #A8A878 0%, #C6C6A7 100%)',
                pattern: '⭐'
            }
        };

        return backgroundPatterns[mainType] || backgroundPatterns.normal;
    }

    // Utilidades
    static capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static formatStatName(statName) {
        const nameMap = {
            'hp': 'HP',
            'attack': 'ATK',
            'defense': 'DEF',
            'special-attack': 'SP.ATK',
            'special-defense': 'SP.DEF',
            'speed': 'VEL'
        };
        return nameMap[statName] || statName.toUpperCase();
    }
}

export default PokemonService;