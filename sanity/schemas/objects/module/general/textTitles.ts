import { defineField } from 'sanity'

export default defineField({
    name: 'module.textTitles',
    title: 'Module: Text titles',
    type: 'object',
    fields: [
        // Title
        defineField({
            name: 'body',
            title: 'Body',
            type: 'body.titles',
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
                title: 'Text Titles Module',
                subtitle: firstText || 'No content',
            }
        }
    },
})