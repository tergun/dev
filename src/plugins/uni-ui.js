import List from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue'
import ListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue'
import Icons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import DataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue'

export function setupUniUI(app) {
  app.component('uni-list', List)
  app.component('uni-list-item', ListItem)
  app.component('uni-icons', Icons)
  app.component('uni-data-select', DataSelect)
}
