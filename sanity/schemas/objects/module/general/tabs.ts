import {VersionsIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.tabs',
  title: 'Tabs',
  type: 'object',
  icon: VersionsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (optional)',
      type: 'string',
    }),

    defineField({
      name: 'tabs',
      title: 'Tabs',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('Add at least 1 tab'),
      of: [
        defineField({
          name: 'tab',
          title: 'Tab',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Tab label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'content',
              title: 'Tab content (modules)',
              type: 'array',
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
                {type: 'module.textTitles'},
                {type: 'module.textParagraphs'},
                {type: 'module.callout'},
                {type: 'module.iframe'},
                // 👇 aquí metes TODOS los módulos que quieras permitir dentro de un tab
                // IMPORTANTE: normalmente NO incluir 'module.tabs' aquí para evitar tabs dentro de tabs (recursión)
              ],
              validation: (Rule) => Rule.min(1).error('Add at least 1 module in this tab'),
            }),
            defineField({
              name: 'imageTab',
              title: 'Tab image (optional)',
              type: 'image',
              options: {hotspot: true},
            })
          ],
          preview: {
            select: {
              title: 'label',
              count: 'content',
            },
            prepare({title, count}) {
              const moduleCount = count.length || 0
              return {
                title: title || 'Tab',
                subtitle: `${moduleCount} modules`,
              }
            },
          },
        }),
      ],
    }),
    // defineField({
    //   name: 'variant',
    //   title: 'Variant',
    //   type: 'string',
    //   initialValue: 'default',
    //   options: {
    //     layout: 'radio',
    //     list: [
    //       {title: 'Default', value: 'default'},
    //       {title: 'Pills', value: 'pills'},
    //       {title: 'Underline', value: 'underline'},
    //     ],
    //   },
    // }),
  ],

  preview: {
    select: {
      title: 'title',
      count: 'tabs',
    },
    prepare({title, count}) {
      const tabCount = count.length || 0
      return {
        title: title || 'Tabs',
        subtitle: `${tabCount} tabs`,
        media: VersionsIcon,
      }
    },
  },
})