import {defineField, defineType} from 'sanity'
import {validateSlug} from '../../utils/validateSlug'

// Install lucide.dev icons with "npm install lucide-react"
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'artist',
  title: 'Artists',
  type: 'document',
  icon: UserIcon,
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
      options: {hotspot: true},
    }),
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      media: 'image',
      title: 'name',
    },
  },
})
