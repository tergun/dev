/// <reference path="../../../typings/index.d.ts" />

type ResponsibilityType = 'all' | 'partial' | 'none';

Component({
  data: {
    isResponsible: '' as ResponsibilityType | '',
    reason: ''
  },

  methods: {
    selectResponsibility(e: any) {
      const value = e.currentTarget.dataset.value as ResponsibilityType;
      this.setData({
        isResponsible: value,
        reason: value !== 'none' ? '' : this.data.reason
      });
    },

    onReasonInput(e: any) {
      this.setData({
        reason: e.detail.value
      });
    },

    handleConfirm() {
      const { isResponsible, reason } = this.data;
      if (!isResponsible || (isResponsible === 'none' && !reason)) {
        return;
      }

      this.triggerEvent('confirm', {
        isResponsible,
        reason: isResponsible === 'none' ? reason : undefined
      });
    }
  }
});
