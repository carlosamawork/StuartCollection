import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {GroqIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Artworks')
    .icon(GroqIcon)
    .schemaType('artwork')
    .child(S.documentTypeList('artwork')),
)
