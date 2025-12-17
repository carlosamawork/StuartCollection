import { defineField } from 'sanity'

export default defineField({
  name: 'body.paragraphs',
  title: 'Body paragraphs',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Paragraph (normal)', value: 'normal' },
        { title: 'Paragraph small', value: 'pSmall' },
        { title: 'Paragraph medium', value: 'pMedium' },
        { title: 'Paragraph large', value: 'pLarge' },
        { title: 'Paragraph Xlarge', value: 'pXlarge' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
      ],
      marks: {
        decorators: [
          { title: 'Italic', value: 'em' },
          { title: 'Strong', value: 'strong' },
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
    },
    {
      type: 'module.callout',
    },
    {
      type: 'ctaButton',
    },
  ],
})