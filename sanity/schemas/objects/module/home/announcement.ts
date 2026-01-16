import { defineField } from 'sanity'

export default defineField({
  name: 'module.announcement',
  title: 'Announcement',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'body.paragraphs',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare({ title, subtitle }) {

      // Obtener primer párrafo
      const firstBlock = subtitle?.[0]
      const firstText = firstBlock?.children
        ?.map((child: any) => child.text)
        .join('')

      return {
        title: title || 'Announcement',
        subtitle: firstText || 'No subtitle'
      }
    }
  },
})