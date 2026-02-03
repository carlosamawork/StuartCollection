import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {ActivityIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Trails')
    .icon(ActivityIcon)
    .schemaType('trail')
    .child(S.documentTypeList('trail')),
)
