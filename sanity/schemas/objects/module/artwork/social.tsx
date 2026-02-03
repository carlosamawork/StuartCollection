import {defineField} from 'sanity'
import {BookmarkIcon} from '@sanity/icons'

export default defineField({
  name: 'module.artwork.social',
  title: 'Section: Social',
  type: 'object',
  icon: BookmarkIcon,
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Social',
    }),
    // Description
    defineField({
      name: 'description',
      title: 'Description (above)',
      type: 'body.simpleText',
    }),
    // Links
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                ],
              },
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'url',
              validation: (Rule) => Rule.uri({allowRelative: true, scheme: ['http', 'https']}),
            }),
          ],
        }),
      ],
    }),
    // Items Grid
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineField({
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'url',
              validation: (Rule) => Rule.uri({allowRelative: true, scheme: ['http', 'https']}),
            }),
            defineField({
              name: 'image',
              title: 'Preview Image',
              type: 'image',
              options: {hotspot: true},
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
      links: 'links',
    },
    prepare({title, items, links}) {
      return {
        title: `Section: ${title || 'Social'}`,
        subtitle: `${Array.isArray(items) ? items.length : 0} items, ${Array.isArray(links) ? links.length : 0} links`,
      }
    },
  },
  validation: (Rule) =>
    Rule.custom((fields) => {
      const hasAtLeastOneLink = Array.isArray(fields?.links) && fields.links.length > 0
      const hasAtLeastOneItem = Array.isArray(fields?.items) && fields.items.length > 0

      if (hasAtLeastOneLink || hasAtLeastOneItem) {
        return true
      }
      return 'At least one link or one item is required'
    }),
})
