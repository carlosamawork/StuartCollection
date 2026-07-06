# TileGroup: tiles de artwork — Diseño

**Fecha:** 2026-07-06

## Objetivo

Permitir que cada tile del módulo Tile group sea, a elección del editor:

- **Tile libre** — los campos actuales (`image`, `title`, `subtitle`, `link`, `newWindow`), o
- **Tile de artwork** — una referencia a un documento `artwork`, cuyo contenido rellena el tile automáticamente.

Ambos tipos se pueden mezclar y reordenar en el mismo grupo, y se renderizan con la maqueta existente sin cambios visuales.

## Enfoque elegido

Array polimórfico en Sanity + normalización en GROQ (Opción A). Se descartó un selector de "modo" dentro de un único tipo de tile (validaciones condicionales frágiles) y un selector a nivel de módulo (no permite mezclar).

## Cambios

### 1. Schema — `sanity/schemas/objects/module/general/tileGroup.ts`

Se añade un segundo miembro al array `tiles`:

- `tileArtwork` (object) con un único campo `artwork`: `reference` a `artwork`, requerido.
- Preview: título del artwork como título, "Artwork" como subtítulo y su `thumbnail` como media, para distinguirlo del tile libre en el Studio.

Los tiles libres existentes no cambian de forma → **sin migración de contenido**.

### 2. Query — `sanity/queries/modules/general/tileGroup.ts`

Proyección condicional por `_type` que normaliza ambos tipos a la misma forma que ya consume el componente:

- `_type == 'tile'` → campos actuales tal cual.
- `_type == 'tileArtwork'` →
  - `title`: `artwork->title`
  - `subtitle`: nombres de artistas unidos por coma (`array::join(artwork->artists[]->name, ', ')`)
  - `image`: `coalesce(artwork->thumbnail, artwork->hero.image)` con el fragment `image`
  - `link`: `'/collection/artwork/' + artwork->slug.current`
  - `newWindow`: `false`

**Manejo de errores:** el array se filtra con `_type == 'tile' || defined(artwork->slug.current)` para no pintar tiles rotos si el artwork referenciado se borra, se despublica o no tiene slug.

### 3. Componente — `components/PageComponent/TileGroup/index.tsx`

Sin cambios: recibe los tiles ya normalizados. Paginación, layout grid/list y columnas funcionan igual para ambos tipos. (Se añade `_key` a la proyección para que la `key` de React que ya intenta usar `tile._key` funcione.)

## Fuera de alcance

- Sobreescribir título/imagen/subtítulo en un tile de artwork (el editor puede usar un tile libre para eso).
- Cambios visuales en la maqueta.
