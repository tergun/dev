import UniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue'
import UniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue'
import UniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue'
import UniDataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue'

export function setupUniUI(app) {
  app.component("uni-list", UniList);
  app.component("uni-list-item", UniListItem);
  app.component("uni-icons", UniIcons);
  app.component("uni-data-select", UniDataSelect);
}
