// /sanity/schemas/modules/module.collection.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'module.collection',
  title: 'Collection',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'titleLink',
      title: 'Link del título',
      type: 'object',
      fields: [
        defineField({
          name: 'href',
          title: 'URL',
          type: 'string',
        }),
        defineField({
          name: 'blank',
          title: 'Abrir en nueva pestaña',
          type: 'boolean',
          initialValue: false,
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'body.paragraphs',
    }),

    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'body.paragraphs',
    }),
    defineField({
      name: 'featuredArtwork',
      title: 'Featured Artwork',
      type: 'reference',
      to: [{type: 'artwork'}],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      artworkTitle: 'featuredArtwork.title',
      media: 'featuredArtwork.image', // ajusta si tu artwork usa otro campo (p.ej. mainImage)
    },
    prepare({title, subtitle, artworkTitle, media}) {
      return {
        title: title || 'Collection',
        subtitle: `Featured: ${artworkTitle || '—'}`,
        media,
      }
    },
  },
})