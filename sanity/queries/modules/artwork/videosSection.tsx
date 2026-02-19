export const videosSectionQuery = `
    title,
    description,
    items[]
`

export type ArtworkVideosSectionData = {
  title: string
  description: any
  items: {
    title: string
    videoUrl: string
  }[]
}
