import { defineField } from 'sanity'

export default defineField({
    name: 'module.textParagraphs',
    title: 'Module: Text paragraphs',
    type: 'object',
    fields: [
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