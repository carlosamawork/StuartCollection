import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {UserIcon} from '@sanity/icons'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Artists')
    .icon(UserIcon)
    .schemaType('artist')
    .child(S.documentTypeList('artist')),
)
