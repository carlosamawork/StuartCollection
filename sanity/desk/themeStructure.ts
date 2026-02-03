import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {TagsIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Themes')
    .icon(TagsIcon)
    .schemaType('theme')
    .child(S.documentTypeList('theme')),
)
