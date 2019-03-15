// miniprogram/pages/course/course.js
const CONFIG = require("../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    footer: {
      need_footer: false, //是否需要底部加载更多的提示，默认未不需要
      no_more: false
    }
  },
  biz_data: {
    page_index: 0, //默认加载第一页
    loading_more: false,
  },

  /**
   * 获取课程信息
   */
  getCourses: function () {
    CONFIG.getDB().collection("course")
      .skip(this.biz_data.page_index * CONFIG.PAGE_SIZE)
      .limit(CONFIG.PAGE_SIZE)
      .get()
      .then(res => {
        this.biz_data.loading_more = false;
        if (res.data.length < CONFIG.PAGE_SIZE) {
          this.data.footer.no_more = true;
        } else {
          this.data.footer.need_footer = true;
        }
        if (res.data.length == 0) {
          // 空数组说明无需刷新列表内容，只需刷新footer
          this.setData({
            footer: {
              need_footer: this.data.footer.need_footer,
              no_more: this.data.footer.no_more,
            }
          });
        } else {
          this.setData({
            courses: this.data.courses.concat(res.data),
            footer: {
              need_footer: this.data.footer.need_footer,
              no_more: this.data.footer.no_more
            }
          })
        }
      })
      .catch(err => {
        console.error(err)
      });
  },

  /**
   * 跳转到lesson列表
   */
  goLessons: function (event) {
    let id = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../lesson/lesson?id=' + id + '&name=' + name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourses();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.biz_data.loading_more || this.data.footer.no_more) {
      return;
    } else {
      this.biz_data.loading_more = true;
      this.biz_data.page_index++;
      this.getCourses();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})