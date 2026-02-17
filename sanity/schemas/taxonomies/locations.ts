import {defineField, defineType} from 'sanity'
import {validateSlug} from '../../utils/validateSlug'

// Install lucide.dev icons with "npm install lucide-react"
import {PinIcon} from '@sanity/icons'

export default defineType({
  name: 'location',
  title: 'Locations',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug,
    }),
    defineField({
      name: 'href',
      title: 'Google Maps Link',
      type: 'url',
      validation: (Rule) => Rule.uri({allowRelative: false, scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'iframe',
      title: 'Map Iframe',
      type: 'module.iframe',
    }),
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({title}) => ({
      title,
    }),
  },
})
