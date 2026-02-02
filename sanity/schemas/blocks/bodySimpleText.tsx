import {defineField} from 'sanity'

export default defineField({
  name: 'body.simpleText',
  title: 'Body simple text',
  type: 'array',
  of: [
    {
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          },
        ],
        annotations: [
          // Email
          {
            name: 'annotationLinkEmail',
            type: 'annotationLinkEmail',
          },
          // URL
          {
            name: 'annotationLinkExternal',
            type: 'annotationLinkExternal',
          },
        ],
      },
      // Paragraphs
      type: 'block',
    },
  ],
})
