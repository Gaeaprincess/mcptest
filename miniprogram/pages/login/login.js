const app = getApp();

Page({
  data: {
    username: '',
    password: ''
  },

  handleLogin() {
    const { username, password } = this.data;
    if (!username || !password) {
      wx.showToast({ title: 'Please fill all fields', icon: 'none' });
      return;
    }

    wx.request({
      url: `${app.globalData.baseUrl}/login`,
      method: 'POST',
      data: { username, password },
      success: (res) => {
        if (res.data.success) {
          app.globalData.token = res.data.token;
          app.globalData.userInfo = res.data.userInfo;
          wx.setStorageSync('token', res.data.token);
          
          wx.showToast({ title: 'Login Success' });
          setTimeout(() => {
            wx.navigateTo({ url: '/pages/products/products' });
          }, 1500);
        } else {
          wx.showToast({ title: res.data.message || 'Login Failed', icon: 'none' });
        }
      },
      fail: (err) => {
        console.error(err);
        wx.showToast({ title: 'Network Error', icon: 'none' });
      }
    });
  }
});
