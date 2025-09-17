# Pokédex Interactiva - React Version

Una aplicación web moderna construida con **React 18** y **Vite** que muestra **todos los tipos de Pokémon** con el diseño de las cartas originales, usando la API oficial de Pokémon.

## 🚀 Tecnologías

- **React 18** - Framework principal
- **Vite** - Build tool y dev server
- **JavaScript ES6+** - Lenguaje principal
- **CSS3** - Estilos y animaciones
- **Pokemon API** - Datos en tiempo real

## 🌟 Características Principales

- ✨ **Diseño dinámico** inspirado en las cartas Pokémon originales
- 🔄 **Efecto de giro** al hacer click en las cartas
- 🔍 **Zoom interactivo** al hacer doble click
- 🎨 **Colores adaptativos** según el tipo de Pokémon
- 🌈 **Fondo dinámico** que cambia con el tipo seleccionado
- 🌄 **Fondos temáticos** para cada sprite de Pokémon según su tipo
- 🔎 **Búsqueda avanzada** por nombre y tipo con API en tiempo real
- 📱 **Diseño totalmente responsivo**
- ⚡ **Todos los 18 tipos** de Pokémon incluidos
- ⌨️ **Atajos de teclado** para mejor UX
- 🎯 **Componentes React** modulares y reutilizables
- 🪝 **React Hooks** para gestión de estado

## 🛠️ Instalación y desarrollo

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
cd pokemon-cards-react

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de la construcción
npm run preview
```

## 🎮 Cómo usar

### Navegación básica
1. Ejecuta `npm run dev` y abre http://localhost:3000
2. **Click simple**: Gira la carta para ver información adicional en el dorso
3. **Doble click**: Activa modo zoom para ver la carta ampliada
4. **Escape**: Cerrar zoom o limpiar búsqueda

### 🔍 Sistema de búsqueda
- **Búsqueda por nombre**: Escribe el nombre del Pokémon (mínimo 2 caracteres)
- **Filtro por tipo**: Selecciona cualquier tipo para cargar Pokémon de ese tipo
- **Búsqueda en tiempo real**: Los resultados se actualizan automáticamente
- **Debounce inteligente**: Espera 500ms antes de buscar para optimizar las llamadas a la API

### 🎨 Fondos temáticos
Cada Pokémon muestra un fondo característico basado en su tipo principal:
- **Fuego**: Gradientes rojizos y naranjas con efectos de llama
- **Agua**: Tonos azules con efectos acuáticos
- **Planta**: Verdes naturales con texturas orgánicas
- **Eléctrico**: Amarillos brillantes con efectos eléctricos
- **Y más**: Cada uno de los 18 tipos tiene su paleta única

### ⌨️ Atajos de teclado
- **Ctrl+F** (Cmd+F en Mac): Enfocar el campo de búsqueda
- **Escape**: Cerrar zoom o limpiar búsqueda
- **Enter**: Forzar búsqueda inmediata

## 🏗️ Arquitectura de componentes

```
src/
├── components/
│   ├── PokemonCard.jsx     # Carta individual con flip, hover y fondos temáticos
│   ├── SearchContainer.jsx # Búsqueda y filtros
│   ├── ZoomOverlay.jsx     # Modal de zoom
│   ├── LoadingSpinner.jsx  # Componente de carga
│   ├── NoResults.jsx       # Estado sin resultados
│   └── ErrorMessage.jsx    # Manejo de errores
├── services/
│   └── PokemonService.js   # API calls, fondos temáticos y utilidades
├── App.jsx                 # Componente principal
├── main.jsx               # Entry point
└── index.css              # Estilos globales y responsive
```

## 🎨 Tipos de Pokémon y colores

La aplicación incluye **todos los 18 tipos oficiales** con colores únicos:

| Tipo | Color | Emoji |
|------|-------|--------|
| Normal | Gris | ⚪ |
| Fuego | Rojo-Naranja | 🔥 |
| Agua | Azul | 💧 |
| Eléctrico | Amarillo | ⚡ |
| Planta | Verde | 🌱 |
| Hielo | Celeste | ❄️ |
| Lucha | Rojo | 👊 |
| Veneno | Morado | ☠️ |
| Tierra | Marrón | 🌍 |
| Volador | Lila | 🌪️ |
| Psíquico | Rosa | 🔮 |
| Bicho | Verde Claro | 🐛 |
| Roca | Amarillo | 🗿 |
| Fantasma | Morado Oscuro | 👻 |
| Dragón | Azul Oscuro | 🐉 |
| Siniestro | Marrón Oscuro | 🌙 |
| Acero | Gris Metálico | ⚙️ |
| Hada | Rosa Claro | 🌸 |

## 🧩 Características técnicas React

### Hooks utilizados
- **useState**: Gestión de estado local
- **useEffect**: Efectos secundarios y lifecycle
- **useCallback**: Optimización de funciones

### Optimizaciones
- **Debounce** en búsquedas para reducir llamadas API
- **Lazy loading** de imágenes
- **Memoización** de funciones con useCallback
- **Event delegation** para interacciones
- **Fondos adaptativos** según el tipo de Pokémon seleccionado

### Gestión de estado
- Estado local con hooks para datos simples
- Context API podría agregarse para estados complejos
- Servicios separados para lógica de negocio
- **PokemonService** centralizado para API y utilidades visuales

## 📱 Responsive Design

- **Desktop**: Grid de 3-4 columnas
- **Tablet**: Grid de 2-3 columnas
- **Mobile**: Grid de 1-2 columnas
- **Breakpoints**: 768px y 480px

## 🔧 Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Preview de la build
- `npm run lint` - Linter ESLint

## 🚀 Despliegue

```bash
# Construir
npm run build

# Los archivos están en /dist
# Subir a tu hosting favorito (Vercel, Netlify, etc.)
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
