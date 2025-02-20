import { List, ListItem, Icons, DataSelect } from '@dcloudio/uni-ui'

export function setupUniUI(app) {
  app.component('uni-list', List)
  app.component('uni-list-item', ListItem)
  app.component('uni-icons', Icons)
  app.component('uni-data-select', DataSelect)
}
