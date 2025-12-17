import {SplitHorizontalIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.twoColumns',
  title: 'Two columns',
  type: 'object',
  icon: SplitHorizontalIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'imageSide',
      title: 'Image side',
      type: 'string',
      initialValue: 'left',
      options: {
        layout: 'radio',
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'textAlignY',
      title: 'Text vertical position',
      type: 'string',
      initialValue: 'center',
      options: {
        layout: 'radio',
        list: [
          {title: 'Top', value: 'top'},
          {title: 'Center', value: 'center'},
          {title: 'Bottom', value: 'bottom'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'body',
      title: 'Text',
      type: 'body.paragraphs',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      imageSide: 'imageSide',
      textAlignY: 'textAlignY',
      media: 'image',
    },
    prepare({title, imageSide, textAlignY, media}) {
      const side = imageSide === 'right' ? 'Img right' : 'Img left'
      return {
        title: title || 'Two columns',
        subtitle: `${side} · Text ${textAlignY}`,
        media,
      }
    },
  },
})