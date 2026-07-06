import { image } from "../../fragments/image";

export const tileGroupQuery = `
    title,
    layout,
    tiles[_type == 'tile' || defined(artwork->slug.current)]{
      _key,
      _type == 'tile' => {
        image{
          ${image}
        },
        title,
        subtitle,
        link,
        newWindow
      },
      _type == 'tileArtwork' => {
        "title": artwork->title,
        "subtitle": array::join(artwork->artists[]->name, ', '),
        "image": coalesce(artwork->thumbnail, artwork->hero.image){
          ${image}
        },
        "link": '/collection/artwork/' + artwork->slug.current,
        "newWindow": false
      }
    },
    columns
`;
