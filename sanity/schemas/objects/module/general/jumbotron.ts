import {RocketIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.jumbotron',
  title: 'Jumbotron',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'body.paragraphs',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      initialValue: 'boxed',
      options: {
        layout: 'radio',
        list: [
          {title: 'Boxed', value: 'boxed'},
          {title: 'XL', value: 'xl'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      initialValue: 'cream',
      options: {
        layout: 'radio',
        list: [
          {title: 'Blue', value: 'blue'},
          {title: 'Dark blue', value: 'darkBlue'},
          {title: 'Yellow', value: 'yellow'},
          {title: 'Cream', value: 'cream'},
          {title: 'Black', value: 'black'},
          {title: 'White', value: 'white'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      size: 'size',
      color: 'color',
    },
    prepare({title, size, color}) {
      return {
        title: title || 'Jumbotron',
        subtitle: `${size || 'boxed'} · ${color || 'cream'}`,
        media: RocketIcon,
      }
    },
  },
})