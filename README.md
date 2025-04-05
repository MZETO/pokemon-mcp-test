# Pokémon MCP Server

This is a Model Context Protocol (MCP) server that provides tools for fetching Pokémon data from the [PokéAPI](https://pokeapi.co/).

## Features

The server provides the following tools:

- **get-pokemon**: Fetch detailed information about a specific Pokémon by name or ID
- **get-type**: Get information about a Pokémon type and its damage relations
- **search-pokemon**: Search for Pokémon with pagination support
- **get-move**: Get details about a specific Pokémon move
- **get-ability**: Get information about a Pokémon ability

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pokemon-mcp-server.git
cd pokemon-mcp-server

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Running the Server

```bash
npm start
```

### Using with Claude for Desktop

To use this server with Claude for Desktop, add it to your Claude for Desktop configuration file:

For macOS:
```json
{
  "mcpServers": {
    "pokemon": {
      "command": "node",
      "args": ["/path/to/pokemon-mcp-server/build/pokemon-server.js"]
    }
  }
}
```

For Windows:
```json
{
  "mcpServers": {
    "pokemon": {
      "command": "node",
      "args": ["C:\\path\\to\\pokemon-mcp-server\\build\\pokemon-server.js"]
    }
  }
}
```

### Testing with MCP Inspector

You can test the server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node build/pokemon-server.js
```

## Example Tool Usage

### Fetching a Pokémon

```
Tool: get-pokemon
Parameters: {"nameOrId": "pikachu"}
```

### Getting Type Information

```
Tool: get-type
Parameters: {"type": "electric"}
```

### Searching for Pokémon

```
Tool: search-pokemon
Parameters: {"limit": 5, "offset": 0}
```

### Getting Move Information

```
Tool: get-move
Parameters: {"nameOrId": "thunderbolt"}
```

### Getting Ability Information

```
Tool: get-ability
Parameters: {"nameOrId": "static"}
```

## API Limitations

This server uses the public PokéAPI, which has rate limiting. Please be respectful of the API's usage limits.

## License

MIT
