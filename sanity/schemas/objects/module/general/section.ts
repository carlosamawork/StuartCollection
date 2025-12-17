import {FolderIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.section',
  title: 'Section',
  type: 'object',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'id',
        title: 'ID',
        type: 'string',
        validation: Rule =>
            Rule.regex(/^[a-z0-9-_]+$/, {
            name: 'safe-id',
            }).error('Only letters, numbers, hyphens, and underscores are allowed. No spaces.'),
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'normal',
      options: {
        layout: 'radio',
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Collapse', value: 'collapse'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'defaultOpen',
      title: 'Open by default',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.variant !== 'collapse',
    }),

    defineField({
      name: 'content',
      title: 'Content (modules)',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Add at least 1 module'),
      of: [
        {type: 'module.jumbotron'},
        {type: 'module.image'},
        {type: 'module.video'},
        {type: 'module.slider'},
        {type: 'module.separator'},
        {type: 'module.twoColumns'},
        {type: 'module.tileGroup'},
        {type: 'module.mediaList'},
        {type: 'module.tabs'},
        {type: 'module.accordion'},
        {type: 'body.titles'},
        {type: 'body.paragraphs'},
        // añade aquí el resto de tus módulos “permitidos”
        // (si quieres literalmente “todos”, mete la lista completa de tu builder)
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      variant: 'variant',
      count: 'content.length',
    },
    prepare({title, variant, count}) {
      return {
        title: title || 'Section',
        subtitle: `${variant || 'normal'} · ${count || 0} modules`,
        media: FolderIcon,
      }
    },
  },
})