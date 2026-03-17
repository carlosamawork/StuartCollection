import {CogIcon} from '@sanity/icons'
import {defineType, defineField} from 'sanity'

const TITLE = 'Settings'
interface ProductOptions {
  title: string
}

export default defineType({
  name: 'settings',
  title: TITLE,
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      default: true,
      name: 'navigation',
      title: 'Navigation',
    },
    {
      name: 'notFoundPage',
      title: '404 page',
    },
    {
      name: 'collection',
      title: 'The Collection page',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Menu
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'menuSettings',
      group: 'navigation',
    }),
    defineField({
      name: 'hours',
      title: 'Opening hours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'hoursItem',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
            }),
            defineField({
              name: 'open',
              title: 'Open',
              type: 'string',
            }),
            defineField({
              name: 'close',
              title: 'Close',
              type: 'string',
            }),
          ],
        },
      ],
      group: 'navigation',
    }),
    defineField({
      name: 'directions',
      title: 'Directions',
      type: 'body.paragraphs',
      group: 'navigation',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
      group: 'navigation',
    }),
    defineField({
      name: 'connect',
      title: 'Connect',
      type: 'body.paragraphs',
      group: 'navigation',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'navigation',
    }),
    defineField({
      name: 'telephone',
      title: 'Telephone',
      type: 'string',
      group: 'navigation',
    }),
    // Footer
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footerSettings',
      group: 'navigation',
    }),
    // The Collection page
    defineField({
      name: 'collection',
      title: 'The Collection page',
      type: 'object',
      group: 'collection',
      fields: [
        defineField({
          name: 'locationsTitle',
          title: 'Locations (title)',
          type: 'string',
        }),
        defineField({
          name: 'locationsText',
          title: 'Locations (text)',
          type: 'body.paragraphs',
        }),
      ],
    }),
    // Not found page
    defineField({
      name: 'notFoundPage',
      title: '404 page',
      type: 'notFoundPage',
      group: 'notFoundPage',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: TITLE,
      }
    },
  },
})
