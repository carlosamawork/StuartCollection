# The Collection: ocultar pestaña Trails si no hay trails — Diseño

**Fecha:** 2026-07-06

## Objetivo

Que la pestaña "Trails" del menú de la página The Collection no aparezca cuando no existe ningún documento `trail` publicado. En cuanto se publique el primer trail, la pestaña reaparece automáticamente, sin intervención del editor.

## Enfoque elegido

Automático, en el cliente: `getCollection()` ya devuelve `trails`, así que `CollectionComponent` decide con `trails.length`. Se descartó un toggle manual en Settings (más mantenimiento editorial y el dato ya está disponible).

## Cambios

Solo `components/CollectionComponent/index.tsx`:

1. La pestaña Trails se incluye en el array de `tabs` de `TabsLayout` únicamente si hay trails.
2. El array `sections` (usado para el breadcrumb por hash) se filtra igual, de modo que `/collection#trails` sin trails no muestre "Trails" en el breadcrumb; `TabsLayout` cae a la primera pestaña.

Sin cambios en query, schema ni Studio.
