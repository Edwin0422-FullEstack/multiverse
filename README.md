# Multiverse Explorer 🛸

Una aplicación premium para explorar el multiverso de Rick and Morty, construida con una arquitectura limpia y moderna.

## 🚀 Cómo correr el proyecto

1.  **Clonar el repositorio** e instalar dependencias:
    ```bash
    pnpm install
    ```
2.  **Iniciar el servidor de desarrollo**:
    ```bash
    pnpm run dev
    ```
3.  **Abrir en el navegador**: `http://localhost:5173`

## 🧠 Decisiones Técnicas

*   **Arquitectura Limpia (Hexagonal Soft)**: El proyecto se divide en:
    *   **Core**: Modelos de datos e interfaces (Entidades).
    *   **Application**: Lógica de negocio, hooks personalizados (`useCharacters`, `useFavorites`).
    *   **Infrastructure**: Implementaciones de red (`apiClient`) y repositorios de datos.
    *   **UI**: Componentes atómicos (Atoms, Molecules, Organisms) y Páginas.
*   **React Query**: Utilizado para la gestión de estado asíncrono, caché inteligente y reintentos automáticos.
*   **Debounce (300-500ms)**: Implementado en los inputs de búsqueda para evitar "spam" a la API mientras el usuario escribe, optimizando el rendimiento y el consumo de datos.
*   **Persistencia Local**: Los favoritos se sincronizan automáticamente con `localStorage` mediante un hook reactivo, permitiendo que la lista persista entre sesiones.
*   **Skeletons Modernos**: Implementación de *Shimmer Skeletons* para mejorar la percepción de velocidad (LCP/FCP) y evitar saltos de layout durante la carga.

## 🛠️ Tecnologías Usadas

*   React + Vite + TypeScript
*   Tailwind CSS (Styling)
*   React Router v6 (Navegación)
*   TanStack Query v5 (Data Fetching)

## 🔮 ¿Qué haría diferente con más tiempo?

1.  **Tests Unitarios y de Integración**: Añadiría Vitest y React Testing Library para asegurar que la lógica de los repositorios y hooks sea robusta.
2.  **Infinite Scroll**: En lugar de paginación tradicional, implementaría un scroll infinito para una experiencia más fluida ("mobile-first").
3.  **Filtros Avanzados**: Añadiría filtros por Género y Origen, además de un sistema de autocompletado para las especies.
4.  **Internacionalización (i18n)**: Implementaría soporte para múltiples idiomas (Inglés/Español).
5.  **PWA**: Convertiría la app en una Progressive Web App para que pueda instalarse y funcionar offline (con los datos cacheados).

## ♿ Accesibilidad (A11y)

*   **Semantic HTML**: Uso de tags como `main`, `article`, `section`, `h1-h3`.
*   **Alt Tags**: Todas las imágenes de personajes tienen descripciones dinámicas.
*   **Labels**: Los inputs y botones tienen etiquetas claras o aria-labels cuando es necesario.
*   **Keyboard Nav**: Navegación funcional mediante la tecla `Tab` y estilos de `focus` visibles.
