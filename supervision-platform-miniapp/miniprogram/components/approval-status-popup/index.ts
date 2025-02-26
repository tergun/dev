/// <reference path="../../../../typings/index.d.ts" />

// Component definition for approval status popup
Component({
  properties: {
    tableData: {
      type: Array,
      value: []
    }
  },
  
  methods: {
    getStatusClass(value: string): string {
      if (value === '是') {
        return 'status-yes';
      } else if (value === '否') {
        return 'status-no';
      }
      return '';
    },
    
    closePopup() {
      this.triggerEvent('close');
    }
  }
});
