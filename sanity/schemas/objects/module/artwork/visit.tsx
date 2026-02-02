import {defineField} from 'sanity'
import {MarkerIcon} from '@sanity/icons'

export default defineField({
  name: 'module.artwork.visit',
  title: 'Section: Visit',
  icon: MarkerIcon,
  type: 'object',
  fields: [
    {
      name: 'enabled',
      type: 'boolean',
      title: 'Data taken from details tab',
      initialValue: true,
      validation: (rule) =>
        rule.custom((value) => (value === true ? true : 'This field must be checked')),
    },
  ],

  preview: {
    prepare() {
      return {
        title: 'Section: Visit',
      }
    },
  },
})
