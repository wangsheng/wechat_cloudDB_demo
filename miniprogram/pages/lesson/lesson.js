// miniprogram/pages/lesson/lesson.js
const CONFIG = require("../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lessons: [],
    footer: {
      need_footer: false, //是否需要底部加载更多的提示，默认未不需要
      no_more: false
    }
  },
  biz_data: {
    page_index: 0, //默认加载第一页
    loading_more: false,
    course_id: "",
    course_name: "",
  },

  /**
   * 获取课件信息
   */
  getLessons: function () {
    CONFIG.getDB().collection("lesson").where({course_id: this.biz_data.course_id})
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
            lessons: this.data.lessons.concat(res.data),
            footer: {
              need_footer: this.data.footer.need_footer,
              no_more: this.data.footer.no_more
            }
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.biz_data.loading_more = false;
      });
  },

  /**
   * 跳转到课件详情页
   */
  goDetail: function (event) {
    let lesson = event.currentTarget.dataset.lesson;
    if (lesson.type == 1) {
      // 视频
      wx.navigateTo({
        url: '../video/video?id=' + lesson._id + '&name=' + lesson.name + '&url=' + lesson.url,
      })
    } else {
      wx.showToast({
        title: '暂不支持除视频外的其他格式',
        icon: 'none',
        duration: 2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.biz_data.course_id = options.id;
    this.biz_data.course_name = options.name;
    this.getLessons();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.biz_data.course_name,
    })
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
      this.getLessons();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})