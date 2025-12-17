import {DashboardIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.tileGroup',
  title: 'Tile group',
  type: 'object',
  icon: DashboardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
    }),
    defineField({
        name: 'layout',
        title: 'Layout',
        type: 'string',
        initialValue: 'grid',
        options: {
          list: [
            {title: 'Grid', value: 'grid'},
            {title: 'List', value: 'list'},
          ],
        },
    }),
    defineField({
      name: 'tiles',
      title: 'Tiles',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Add at least 1 tile'),
      of: [
        defineField({
          name: 'tile',
          title: 'Tile',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),

            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true, // permite /about
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),

            defineField({
              name: 'newWindow',
              title: 'Open in new window',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
              newWindow: 'newWindow',
            },
            prepare({title, subtitle, media, newWindow}) {
              return {
                title: title || 'Tile',
                subtitle: `${subtitle || '—'}${newWindow ? ' · New window' : ''}`,
                media,
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'columns',
      title: 'Columns (grid)',
      type: 'number',
      initialValue: 3,
      hidden: ({parent}) => parent?.layout !== 'grid',
      validation: (Rule) => Rule.min(2).max(6),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      count: 'tiles.length',
    },
    prepare({title, count}) {
      return {
        title: title || 'Tile group',
        subtitle: `${count || 0} tiles`,
        media: DashboardIcon,
      }
    },
  },
})