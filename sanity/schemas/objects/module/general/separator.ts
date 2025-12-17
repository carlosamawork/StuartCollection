import { BlockElementIcon } from '@sanity/icons'
import { defineField } from 'sanity'

export default defineField({
  name: 'module.separator',
  title: 'Separator',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      initialValue: 'line',
      options: {
        layout: 'radio',
        list: [
          { title: 'Line', value: 'line' },
          { title: 'Space', value: 'space' },
          { title: 'Line + Space', value: 'lineSpace' },
        ],
      },
    }), 

    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      initialValue: 'full',
      hidden: ({ parent }) => parent?.variant === 'space',
      options: {
        layout: 'radio',
        list: [
          { title: 'Full', value: 'full' },
          { title: 'Content', value: 'content' }, // ancho del contenedor
          { title: 'Custom', value: 'custom' },
        ],
      },
    }),

    defineField({
      name: 'customWidth',
      title: 'Custom width (px)',
      type: 'number',
      hidden: ({ parent }) => parent?.variant === 'space' || parent?.width !== 'custom',
      validation: (Rule) => Rule.min(20).max(2000),
    }),

    defineField({
      name: 'anchorId',
      title: 'Anchor ID (optional)',
      type: 'string',
      description: 'If set, allows linking to this separator (#id).',
    }),
  ],

  preview: {
    select: {
      variant: 'variant',
      size: 'size',
      style: 'style',
    },
    prepare({ variant, size, style }) {
      const v = variant || 'line'
      const s = size || 'md'
      const ls = style || 'solid'

      const variantLabel =
        v === 'line' ? 'Line' : v === 'space' ? 'Space' : 'Line + Space'

      return {
        title: 'Separator',
        subtitle: `${variantLabel} · ${s}${v !== 'space' ? ` · ${ls}` : ''}`,
        media: BlockElementIcon,
      }
    },
  },
})