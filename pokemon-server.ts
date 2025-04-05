// pokemon-server.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create a new MCP server
const server = new McpServer({
  name: "pokemon-api",
  version: "1.0.0",
  capabilities: {
    tools: {},
  }
});

// Base URL for the Pokémon API
const POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2";

// Fetch Pokémon by name or ID
server.tool(
  "get-pokemon",
  {
    nameOrId: z.string().describe("Pokémon name (e.g., 'pikachu') or ID (e.g., '25')")
  },
  async ({ nameOrId }) => {
    try {
      const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon/${nameOrId.toLowerCase()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            content: [{ type: "text", text: `Pokémon '${nameOrId}' not found.` }],
            isError: true
          };
        }
        return {
          content: [{ type: "text", text: `Error fetching Pokémon: ${response.statusText}` }],
          isError: true
        };
      }
      
      const pokemon = await response.json();
      
      // Format the Pokémon data
      const formattedData = {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height / 10, // Convert to meters
        weight: pokemon.weight / 10, // Convert to kg
        types: pokemon.types.map((t: any) => t.type.name),
        abilities: pokemon.abilities.map((a: any) => a.ability.name),
        stats: pokemon.stats.map((s: any) => ({
          name: s.stat.name,
          base: s.base_stat
        })),
        sprites: {
          front: pokemon.sprites.front_default,
          back: pokemon.sprites.back_default
        }
      };
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(formattedData, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: `Error fetching Pokémon data: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
);

// Fetch Pokémon type data
server.tool(
  "get-type",
  {
    type: z.string().describe("Pokémon type (e.g., 'electric', 'water')")
  },
  async ({ type }) => {
    try {
      const response = await fetch(`${POKEMON_API_BASE_URL}/type/${type.toLowerCase()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            content: [{ type: "text", text: `Type '${type}' not found.` }],
            isError: true
          };
        }
        return {
          content: [{ type: "text", text: `Error fetching type: ${response.statusText}` }],
          isError: true
        };
      }
      
      const typeData = await response.json();
      
      // Format the type data
      const damageRelations = typeData.damage_relations;
      const formattedData = {
        id: typeData.id,
        name: typeData.name,
        damageRelations: {
          doubleDamageFrom: damageRelations.double_damage_from.map((t: any) => t.name),
          doubleDamageTo: damageRelations.double_damage_to.map((t: any) => t.name),
          halfDamageFrom: damageRelations.half_damage_from.map((t: any) => t.name),
          halfDamageTo: damageRelations.half_damage_to.map((t: any) => t.name),
          noDamageFrom: damageRelations.no_damage_from.map((t: any) => t.name),
          noDamageTo: damageRelations.no_damage_to.map((t: any) => t.name),
        },
        pokemonCount: typeData.pokemon.length,
        moveCount: typeData.moves.length
      };
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(formattedData, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: `Error fetching type data: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
);

// Search Pokémon by criteria
server.tool(
  "search-pokemon",
  {
    limit: z.number().min(1).max(100).default(10).describe("Maximum number of results to return"),
    offset: z.number().min(0).default(0).describe("Number of results to skip")
  },
  async ({ limit, offset }) => {
    try {
      const response = await fetch(`${POKEMON_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        return {
          content: [{ type: "text", text: `Error searching Pokémon: ${response.statusText}` }],
          isError: true
        };
      }
      
      const data = await response.json();
      
      // Format the search results
      const results = data.results.map((pokemon: any) => {
        // Extract the ID from the URL
        const urlParts = pokemon.url.split('/');
        const id = urlParts[urlParts.length - 2];
        
        return {
          id,
          name: pokemon.name,
          url: pokemon.url
        };
      });
      
      const formattedData = {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results
      };
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(formattedData, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: `Error searching Pokémon: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
);

// Get Pokémon move details
server.tool(
  "get-move",
  {
    nameOrId: z.string().describe("Move name (e.g., 'thunderbolt') or ID")
  },
  async ({ nameOrId }) => {
    try {
      const response = await fetch(`${POKEMON_API_BASE_URL}/move/${nameOrId.toLowerCase()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            content: [{ type: "text", text: `Move '${nameOrId}' not found.` }],
            isError: true
          };
        }
        return {
          content: [{ type: "text", text: `Error fetching move: ${response.statusText}` }],
          isError: true
        };
      }
      
      const move = await response.json();
      
      // Format the move data
      const formattedData = {
        id: move.id,
        name: move.name,
        accuracy: move.accuracy,
        pp: move.pp,
        power: move.power,
        type: move.type.name,
        damageClass: move.damage_class.name,
        effectChance: move.effect_chance,
        effect: move.effect_entries.length > 0 ? 
                move.effect_entries[0].effect : 
                "No effect description available",
        shortEffect: move.effect_entries.length > 0 ? 
                     move.effect_entries[0].short_effect : 
                     "No short effect description available",
      };
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(formattedData, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: `Error fetching move data: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
);

// Get Pokémon ability details
server.tool(
  "get-ability",
  {
    nameOrId: z.string().describe("Ability name (e.g., 'static') or ID")
  },
  async ({ nameOrId }) => {
    try {
      const response = await fetch(`${POKEMON_API_BASE_URL}/ability/${nameOrId.toLowerCase()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            content: [{ type: "text", text: `Ability '${nameOrId}' not found.` }],
            isError: true
          };
        }
        return {
          content: [{ type: "text", text: `Error fetching ability: ${response.statusText}` }],
          isError: true
        };
      }
      
      const ability = await response.json();
      
      // Find English effect entry
      const effectEntry = ability.effect_entries.find(
        (entry: any) => entry.language.name === "en"
      );
      
      // Format the ability data
      const formattedData = {
        id: ability.id,
        name: ability.name,
        generation: ability.generation.name,
        effect: effectEntry ? effectEntry.effect : "No English description available",
        shortEffect: effectEntry ? effectEntry.short_effect : "No English description available",
        pokemonCount: ability.pokemon.length,
        pokemonWithAbility: ability.pokemon.slice(0, 10).map((p: any) => ({
          name: p.pokemon.name,
          isHidden: p.is_hidden
        }))
      };
      
      return {
        content: [{ 
          type: "text", 
          text: JSON.stringify(formattedData, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: `Error fetching ability data: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
);

// Connect the server to the transport
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Pokémon MCP server running on stdio");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

main();
