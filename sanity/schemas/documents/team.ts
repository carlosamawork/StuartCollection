import {DocumentIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import {validateSlug} from '../../utils/validateSlug'

export default defineField({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'theme',
      title: 'Theme',
    },
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
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'editorial',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'editorial',
    }),
    defineField({
        name: 'featuredImage',
        title: 'Featured Image',
        type: 'image',
        options: {hotspot: true},
        group: 'editorial',
    }),
    // Slug
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug,
      group: 'editorial',
    }),
    // Body
    defineField({
      name: 'body',
      title: 'Body',
      type: 'body.paragraphs',
      group: 'editorial',
    }),
  ],
  preview: {
    select: {
      active: 'active',
      featuredImage: 'featuredImage',
      title: 'name',
    },
    prepare(selection) {
      const {featuredImage, title} = selection

      return {
        media: featuredImage,
        title,
      }
    },
  },
})
