import {defineField} from 'sanity'

export default defineField({
  name: 'body.titles',
  title: 'Body titles',
  type: 'array',
  of: [
    {
      styles: [
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
      ],
      marks: {
        decorators: [
          {
            title: 'Italic',
            value: 'em',
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
            type: 'annotationLinkExternal'
          },
        ],
      },
      // Paragraphs
      type: 'block',
    },
  ],
})
