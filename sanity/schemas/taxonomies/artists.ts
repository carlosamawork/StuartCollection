import {defineField, defineType} from 'sanity'

// Install lucide.dev icons with "npm install lucide-react"
import {PinIcon} from '@sanity/icons'

export default defineType({
  name: 'artist',
  title: 'Artists',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      name: 'name',
    },
    prepare: ({name}) => ({
      title: name,
    }),
  },
})
