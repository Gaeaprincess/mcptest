const app = getApp();

Page({
  data: {
    products: []
  },

  onLoad() {
    this.fetchProducts();
  },

  fetchProducts() {
    wx.showLoading({ title: 'Loading...' });
    wx.request({
      url: `${app.globalData.baseUrl}/products`,
      method: 'GET',
      header: {
        'Authorization': app.globalData.token || ''
      },
      success: (res) => {
        if (res.data.success) {
          this.setData({ products: res.data.data });
        } else {
          wx.showToast({ title: 'Failed to load products', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error(err);
        wx.showToast({ title: 'Network Error', icon: 'none' });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  }
});
