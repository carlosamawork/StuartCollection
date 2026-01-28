import { defineField } from 'sanity'

export default defineField({
    name: 'module.textParagraphs',
    title: 'Module: Text paragraphs',
    type: 'object',
    fields: [
        defineField({
            name: 'width',
            title: 'Width',
            type: 'string',
            initialValue: 'content',
            options: {
                list: [
                    { title: 'Full width', value: 'full' },
                    { title: 'Content', value: 'content' },
                ],
            },
        }),
        // Title
        defineField({
            name: 'body',
            title: 'Body',
            type: 'body.paragraphs',
        }),
    ],
    preview: {
        select: {
            subtitle: 'body',
        },
        prepare(selection) {
            const { subtitle } = selection
            const firstBlock = subtitle?.[0]
            const firstText = firstBlock?.children
                ?.map((child: any) => child.text)
                .join('')
            return {
                title: 'Text Paragraphs Module',
                subtitle: firstText || 'No content',
            }
        }
    },
})