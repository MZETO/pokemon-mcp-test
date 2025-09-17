# 🎮 Pokémon MCP + React App

Un proyecto que demuestra cómo usar un **MCP (Model Context Protocol)** para construir una aplicación React completa. Este ejemplo incluye un servidor MCP de Pokémon que alimenta una Pokédex interactiva construida en React.

## 🎯 ¿Qué es este proyecto?

Este proyecto demuestra la **potencia de los MCP servers** para crear aplicaciones web completas:

- **Servidor MCP de Pokémon**: Proporciona acceso estructurado a datos de Pokémon
- **Aplicación React Pokédex**: Interfaz moderna que consume el MCP server
- **Desarrollo con IA**: Todo construido mediante un agente de IA (GitHub Copilot)

## 🚀 ¿Cómo funciona?

1. **MCP Server**: Servidor TypeScript que expone funciones para buscar Pokémon, habilidades, movimientos y tipos
2. **React App**: Aplicación moderna con búsqueda en tiempo real, filtros y cartas interactivas
3. **Integración**: El MCP server actúa como puente entre la aplicación y los datos de Pokémon

## ✨ Características principales

- � **Cartas interactivas** con efectos flip y zoom
- 🔍 **Búsqueda inteligente** con filtros por tipo
- 🌈 **UI dinámica** que cambia según el tipo seleccionado
- 📱 **Totalmente responsive** para móvil y desktop
- ⚡ **Datos en tiempo real** mediante PokéAPI

## 🛠️ Instalación rápida

### Aplicación React
```bash
cd pokemon-cards-react
npm install
npm run dev
```

### Servidor MCP
```bash
npm install
npm run build
npm start
```

## 🤖 Construido por IA

**Este proyecto fue desarrollado completamente por un agente de IA** (GitHub Copilot) en colaboración con un usuario humano.

### Proceso de desarrollo:
- ⚡ **~500 líneas de código** generadas automáticamente
- 🔄 **Iteraciones guiadas** con feedback del usuario
- 🎯 **2 horas** de desarrollo colaborativo total
- 🧠 **Demostración práctica** del potencial de la programación asistida por IA

## 📁 Estructura del proyecto

```
├── pokemon-server.ts          # MCP Server (TypeScript)
├── pokemon-cards-react/       # Aplicación React
│   ├── src/components/        # Componentes React
│   └── src/services/          # Servicios y API calls
└── build/                     # Servidor compilado
```

## 📄 Créditos y Licencia

Este proyecto es un fork y una adaptación de [pokemon-mcp-server](https://github.com/indroneelray/pokemon-mcp-server) de @indroneelray, utilizado bajo los términos de la Licencia MIT.

El trabajo original está licenciado bajo la Licencia MIT. Copyright (c) 2023 Indroneel Ray.

---

**💡 Este proyecto sirve como ejemplo de cómo los MCP servers pueden simplificar la creación de aplicaciones web modernas, especialmente cuando se combinan con el desarrollo asistido por IA.**