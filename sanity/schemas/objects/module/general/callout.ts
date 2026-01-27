import {BulbOutlineIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.callout',
  title: 'Callout',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    // Text
    defineField({
      name: 'text',
      title: 'Text',
      type: 'body.paragraphs',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare(selection) {
      const { text } = selection
            const firstBlock = text?.[0]
            const firstText = firstBlock?.children
                ?.map((child: any) => child.text)
                .join('')
      return {
        subtitle: 'Callout',
        title: firstText || 'No content',
        media: BulbOutlineIcon,
      }
    },
  },
})
