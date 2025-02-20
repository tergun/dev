import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
import uniIcons from '@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue';
import uniDataSelect from '@dcloudio/uni-ui/lib/uni-data-select/uni-data-select.vue';

export function setupUniUI(app) {
  app.component('uni-list', uniList);
  app.component('uni-list-item', uniListItem);
  app.component('uni-icons', uniIcons);
  app.component('uni-data-select', uniDataSelect);
}
