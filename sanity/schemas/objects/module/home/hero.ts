import { defineField } from 'sanity'

export default defineField({
    name: 'hero.home',
    title: 'Hero',
    type: 'object',
    fields: [
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'body.paragraphs',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'string'
        }),
        defineField({
            name: 'ctaButton',
            title: 'CTA Button',
            type: 'ctaButton',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'image',
        },
        prepare(selection) {
            const { title, media } = selection
            return {
                title: title || 'General Hero',
                media: media,
            }
        }
    },
})