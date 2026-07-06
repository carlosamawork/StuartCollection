# TileGroup: tiles sin imagen (lista de links) — Diseño

**Fecha:** 2026-07-06

## Objetivo

Permitir que un tile del módulo Tile group no tenga imagen y se imprima como fila de lista de links: la misma fila del layout "List" (título, subtítulo, chevron, bordes) pero sin el hueco del thumbnail, ocupando el texto todo el ancho. En el layout "Grid", un tile sin imagen muestra solo el bloque de texto.

## Cambios

### 1. Schema — `sanity/schemas/objects/module/general/tileGroup.ts`

El campo `image` del tile libre deja de ser obligatorio (se elimina `Rule.required()`). Sin más cambios en el Studio ni migración de contenido.

### 2. Componente — `components/PageComponent/TileGroup/index.tsx`

Ya renderiza la imagen condicionalmente. Solo se añade la clase modificadora `noImage` al `tileItem` cuando el tile no tiene imagen.

### 3. Estilos — `components/PageComponent/TileGroup/TileGroup.module.scss`

En `.tileList`, `.tileContent` reserva el hueco del thumbnail con `width: calc(100% - 96px)`; con el modificador `noImage` pasa a `width: 100%`. En `.tileGrid` no hace falta nada: al no existir la imagen, el texto ya ocupa el ancho.

## Alcance

- Aplica igual a los tiles de artwork: si un artwork no tiene `thumbnail` ni `hero.image`, su fila se pinta como link de texto en vez de romperse.
- La query GROQ no cambia.
