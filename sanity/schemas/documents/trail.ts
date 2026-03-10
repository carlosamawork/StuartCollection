import {ActivityIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import {validateSlug} from '../../utils/validateSlug'

export default defineField({
  name: 'trail',
  title: 'Trail',
  type: 'document',
  icon: ActivityIcon,
  groups: [
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
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
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero Cover',
      type: 'hero.general',
      group: 'editorial',
    }),
    // Body
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body.paragraphs',
      group: 'editorial',
    }),
    // Thumbnail
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail image',
      type: 'image',
      options: {hotspot: true},
      group: 'editorial',
    }),
    // Artworks
    defineField({
      name: 'artworks',
      title: 'Artworks',
      description: 'Order the artworks according to trail order',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'artwork'}]}],
      validation: (Rule) => Rule.min(1).error('Add at least 1 item'),
      group: 'editorial',
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
