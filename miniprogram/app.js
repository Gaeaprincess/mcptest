App({
  onLaunch() {
    // Check if token exists
    const token = wx.getStorageSync('token');
    if (token) {
       this.globalData.token = token;
    }
  },
  globalData: {
    userInfo: null,
    token: null,
    baseUrl: 'http://localhost:3000/api'
  }
})
