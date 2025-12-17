import {defineField} from 'sanity'

export default defineField({
  name: 'body.captions',
  title: 'Body captions',
  type: 'array',
  of: [
    {
      styles: [
        { title: 'Paragraph', value: 'p' },
      ],
      marks: {
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          }
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
            type: 'annotationLinkExternal'
          },
        ],
      },
      // Paragraphs
      type: 'block',
    },
  ],
})
