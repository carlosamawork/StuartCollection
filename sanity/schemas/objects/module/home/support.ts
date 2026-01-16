import { HeartIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'module.support',
    title: 'Support',
    type: 'object',
    icon: HeartIcon,
    fields: [
        // HERO
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'Support',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'body.paragraphs',
        }),
        defineField({
            name: 'cta',
            title: 'CTA (button)',
            type: 'ctaButton',
        }),
        defineField({
            name: 'image',
            title: 'Background image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),

        // FOOTER CARDS (2)
        defineField({
            name: 'cards',
            title: 'Bottom cards',
            type: 'array',
            validation: (Rule) => Rule.length(2).error('Add exactly 2 cards (Follow / Get Updates)'),
            of: [
                defineField({
                    name: 'supportCard',
                    title: 'Card',
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
                        defineField({ name: 'description', title: 'Description', type: 'body.paragraphs' }),
                        defineField({
                            name: 'link',
                            title: 'Link',
                            type: 'object',
                            fields: [
                                defineField({ name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() }),
                                defineField({
                                    name: 'href',
                                    title: 'Link',
                                    type: 'string',
                                    validation: (R) => R.required(),
                                }),
                                defineField({ name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: true }),
                            ],
                        }),
                    ],
                    preview: {
                        select: { title: 'title', subtitle: 'link.label' },
                    },
                }),
            ],
        }),
    ],

    preview: {
        select: { title: 'title', media: 'image' },
        prepare({ title, media }) {
            return {
                title: title || 'Support',
                subtitle: 'Hero + 2 cards',
                media,
            }
        },
    },
})