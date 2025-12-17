import { defineField } from 'sanity'

export default defineField({
    name: 'hero.general',
    title: 'General hero',
    type: 'object',
    fields: [
        // Title
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        })
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
                media: media || 'https://via.placeholder.com/150',
            }
        }
    },
})