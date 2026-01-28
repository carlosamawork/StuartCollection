import {BulbOutlineIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.iframe',
  title: 'Embedded Iframe',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    // Text
    defineField({
      name: 'iframe',
      title: 'Embedded Iframe',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Iframe',
        media: BulbOutlineIcon,
      }
    },
  },
})
