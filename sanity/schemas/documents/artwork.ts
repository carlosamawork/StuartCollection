import {GroqIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import {validateSlug} from '../../utils/validateSlug'

export default defineField({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: GroqIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'specs',
      title: 'Details',
    },
    {
      name: 'sections',
      title: 'Sections',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
    // Artist(s)
    defineField({
      name: 'artists',
      title: 'Artist(s)',
      type: 'array',
      of: [
        {
          name: 'artist',
          title: 'Artist',
          type: 'reference',
          to: [{type: 'artist'}],
        },
      ],
      validation: (Rule) => Rule.min(1).error('Add at least 1 artist'),
      group: 'editorial',
    }),
    // Slug
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug,
      group: 'editorial',
    }),
    // Summary
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'Short description used in Locations map',
      type: 'body.simpleText',
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
    // Year
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(new Date().getFullYear()).required(),
      group: 'specs',
    }),
    // Visit
    defineField({
      name: 'visitDescription',
      title: 'Visit Description',
      type: 'body.simpleText',
      group: 'specs',
    }),
    // Visit Signup Link
    defineField({
      name: 'signupLink',
      title: 'Visit Signup Link',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: true, scheme: ['http', 'https']}),
      group: 'specs',
    }),
    // Location
    defineField({
      name: 'locations',
      title: 'Location(s)',
      description: 'Order the locations in the suggested visiting order',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'location'}]}],
      validation: (Rule) => Rule.min(1).error('Add at least 1 item'),
      group: 'specs',
    }),
    // Themes
    defineField({
      name: 'themes',
      title: 'Themes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'theme'}]}],
      validation: (Rule) => Rule.min(1).error('Add at least 1 item'),
      group: 'specs',
    }),
    // Thumbnail
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail image',
      type: 'image',
      options: {hotspot: true},
      group: 'editorial',
    }),
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero Cover',
      type: 'hero.general',
      group: 'editorial',
    }),
    // Body blocks
    defineField({
      name: 'body',
      title: 'Body (modules)',
      type: 'array',
      of: [
        {
          type: 'module.textParagraphs',
        },
        {
          type: 'module.accordion',
        },
        {
          type: 'module.iframe',
        },
      ],
      validation: (Rule) => Rule.min(1).error('Add at least 1 item'),
      group: 'editorial',
    }),
    // Sections
    defineField({
      name: 'sections',
      title: 'Sections (modules)',
      type: 'array',
      of: [
        {type: 'module.artwork.images'},
        {type: 'module.artwork.artist'},
        {type: 'module.artwork.visit'},
        {type: 'module.artwork.videos'},
        {type: 'module.artwork.social'},
      ],
      group: 'sections',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.page',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      active: 'active',
      seoImage: 'seo.image',
      title: 'title',
    },
    prepare(selection) {
      const {seoImage, title} = selection

      return {
        media: seoImage,
        title,
      }
    },
  },
})
