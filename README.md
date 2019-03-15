# wechat_cloudDB_demo

这是[微信小程序·云数据库](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html)开发的demo，其中包含三个页面：

- pages/course/course：课程列表，支持分页加载
  ![](http://img.iaquam.com/image/png/wechat_cloudDB_demo_course.PNG)
- pages/lesson/lesson：课件列表，支持分页加载
  ![](http://img.iaquam.com/image/png/wechat_cloudDB_demo_lesson.PNG)
- pages/video/video：用来播放视频课件的页面
  ![](http://img.iaquam.com/image/png/wechat_cloudDB_demo_player.PNG)

借助于提供的云数据库，可以实现非API方式来动态加载内容。后续只需要直接云端数据库的数据，就能动态查看不同的课程以及课件。

![](http://img.iaquam.com/image/png/wechat_cloudDB_demo_db-course.png)
![](http://img.iaquam.com/image/png/wechat_cloudDB_demo_db-lesson.png)

~~~Javascript
/**
   * 获取课程信息
   */
  getCourses: function () {
    wx.cloud.database().collection("course")
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
  }
~~~

## 注意事项

- 创建项目时，后端服务选择『小程序·云开发』
  ![](http://img.iaquam.com/image/png/wechat_cloudDB_demo_create.png)
- 更换config.js里云环境的值为你自己的
  ~~~Javascript
  function getCloudEnv () {
    if (getEnv() == "pro") {
      return "pro-xxx";
    } else {
      return "pro-yyy";
    }
  }
  ~~~
- 如果遇到以下报错信息，请将基础库调整为2.3.0及以上版本

  > -401002 api parameter error | errMsg: parameter offset of function skip must be provided

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [云数据库开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html)