import {defineField, defineType} from 'sanity'

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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'geopoint',
      title: 'Geopoint',
      type: 'geopoint',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isExterior',
      title: 'Is Location Exterior?',
      type: 'boolean',
      validation: (Rule) => Rule.required(),
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
