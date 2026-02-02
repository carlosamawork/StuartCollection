import {DocumentIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import {validateSlug} from '../../utils/validateSlug'

export default defineField({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'details',
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
    // Slug
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug,
      group: 'editorial',
    }),
    // Year
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(new Date().getFullYear()).required(),
      group: 'details',
    }),
    // Visit
    defineField({
      name: 'visitDescription',
      title: 'Visit Description',
      type: 'body.simpleText',
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    // Location
    defineField({
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
      validation: (Rule) => Rule.required(),
      group: 'details',
    }),
    // Themes
    defineField({
      name: 'themes',
      title: 'Themes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'theme'}]}],
      validation: (Rule) => Rule.min(1).error('Add at least 1 item'),
      group: 'details',
    }),
    // Featured Image
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      group: 'editorial',
    }),
    // Body blocks
    defineField({
      name: 'body',
      title: 'Body (modules)',
      type: 'array',
      of: [
        {type: 'module.textParagraphs'},
        {type: 'module.artwork.textAccordeon'},
        {type: 'module.iframe'},
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
