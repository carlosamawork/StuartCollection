import {defineField, defineType} from 'sanity'
import {validateSlug} from '../../utils/validateSlug'

// Install lucide.dev icons with "npm install lucide-react"
import {TagIcon} from '@sanity/icons'

export default defineType({
  name: 'theme',
  title: 'Themes',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'title', type: 'string'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug,
    }),
  ],
  // Customize the preview so parents are visualized in the studio
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title,
    }),
  },
})
