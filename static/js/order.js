/*
 * @writer: 咕鸽仙人
 * @LastEditors: 黄大帅比
 * @Date: 2019-03-05 19:45:09
 * @LastEditTime: 2019-03-07 12:05:02
 * @订单js代码页
 */
$(() => {
  // 所有订单数据
  var totalOrder = null;
  // 下标
  let index_ = 0;
  // 页码
  let pageNum = 0;
  /**
   * @description: ajax访问订单数据库获取订单
   * @param {type}
   * @return:
   */
  $.ajax({
    type: "GET",
    url: "../../order",
    data: {
      a: "total", //查询全部
    },
    async: false,
    success: function (arr) {
      // console.log(arr.data);
      totalOrder = arr.data;
    }
  });
  // 用户总量
  $(".total").html(`
  共有用户：<span style="color:#58bc58;">${totalOrder.length}</span> 位
  `);

  /**
   * @description: 渲染订单表
   * @param {type}
   * @return:
   */
  function order() {
    let page_ = (index_ * 10) - 1;
    if (page_ < 0) {
      page_ = 0;
    }
    let html = "";
    for (let index = page_; index < page_ + 10; index++) {
      html += `
      <tr data-id="${totalOrder[index]._id}">
      <td>${totalOrder[index].cNum}</td>
      <td>${totalOrder[index].buyer}</td>
      <td>${totalOrder[index].total}</td>
      <td class="pay" data-id="${totalOrder[index].pay}">
        <form class="layui-form" action=""><input type="checkbox" name="like[pay]" title="支付">
        <div class="layui-unselect layui-form-checkbox layui-form-checked">
        <span>支付</span>
        <i class="layui-icon layui-icon-ok"></i>
        </div>
        </form>
      </td>
      <td class="send_out" data-id="${totalOrder[index].send_out}">
        <form class="layui-form" action=""><input type="checkbox" name="like[send_out]" title="发货" checked>
        <div class="layui-unselect layui-form-checkbox layui-form-checked">
        <span>发货</span>
        <i class="layui-icon layui-icon-ok"></i>
        </div>
        </form>
      </td>
      <td class="arrive" data-id="${totalOrder[index].arrive}">
        <form class="layui-form" action=""><input type="checkbox" name="like[arrive]" title="签收">
        <div class="layui-unselect layui-form-checkbox layui-form-checked">
        <span>签收</span>
        <i class="layui-icon layui-icon-ok"></i>
        </div>
        </form>
      </td>
      <td>${totalOrder[index].buying_time}</td>
    </tr>
      `;

    }
    $("tbody").html(html);

    state();

  };
  order();


  // 分页
  if (totalOrder.length / 10 % 1 != 0) {
    pageNum = MAth.ceil(totalOrder.length / 10);
  } else {
    pageNum = totalOrder.length / 10
  }
  // console.log(pageNum);
  let pageHtml = "";
  for (let index = 1; index <= pageNum; index++) {
    pageHtml += `
      <a class="num" href="javascript:;">${index}</a>
      `;
  }
  $(".pageNum").html(pageHtml);

  //页码移动
  // 首位渲染
  $(".num").eq(index_).addClass("current");
  /**
   * @description: 根据index_的值进行移动页码
   * @param {type}
   * @return:
   */
  var pageMove = () => {
    if (($(".current").html() * 1) < (pageNum - 1)) {
      $(".pageNum").animate({
        left: "-" + ((index_ - 1) * 41) + "px"
      });
    }

  };
  /**
   * @description: 点击移动
   * @param {type}
   * @return:
   */
  $(".pageNum").on("click", ".num", function () {
    // console.log($(this));
    // 排它
    $(".num").removeClass("current");
    $(this).addClass("current");
    index_ = $(this).html() - 1;
    order();
    pageMove();
  });
  $(".pageNum").on("click", ".num", function () {
    // console.log($(this));
    var this_ = $(this);
    if ($(this).index() == $(".num").size() - 2) {
      var _index = this_.index();
      $(".pageNum").animate({
        left: "-" + (_index - 2) * 41 + "px"
      });
    }
  });
  /**
   * @description: 点击左右加减切换页码
   * @param {type}
   * @return:
   */
  $(".page").on("click", ".prev,.next", function () {
    // 上一页
    if ($(this).hasClass('prev')) {
      if (index_ > 0) {
        $(".num").removeClass("current");
        --index_;
        $(".num").eq(index_).addClass("current");
        order();
        pageMove();
      }
    }
    // 下一页
    if ($(this).hasClass('next')) {
      if (index_ < pageNum - 1) {
        $(".num").removeClass("current");
        ++index_;
        $(".num").eq(index_).addClass("current");
        order();
        pageMove();
      }
    }
  });


  // 确定状态
  function state() {
    $(".layui-unselect").removeClass("layui-form-checked");
    // console.log($(".layui-unselect").length)
    for (let i = 0; i < $(".layui-unselect").length; i++) {
      if ($(".layui-unselect").eq(i).closest("td").attr("data-id") == "1") {
        // console.log(1);
        $(".layui-unselect").eq(i).addClass("layui-form-checked");
      }

    }

  }

  //点击更改状态
  $("tbody").on("click", ".layui-form-checkbox", function () {
    let keyName = $(this).closest("td").attr("class");
    let this_ = $(this);
    $.ajax({
      type: "GET",
      url: "../../order",
      data: {
        a: "Status",
        _id: $(this).closest("tr").attr("data-id"),
        [keyName]: $(this).closest("td").attr("data-id"),
      },
      // async: false,
      success: function (arr) {

      }
    });
    if (this_.hasClass("layui-form-checked")) {
      // console.log(1);
      this_.removeClass("layui-form-checked");
    } else {
      this_.addClass("layui-form-checked");
    }
  });
  /**
   * @description: 查询订单号
   * @param {type}
   * @return:
   */
  $(".layui-btn").click(function () {
    $.ajax({
      type: "GET",
      url: "../../order",
      data: {
        a: "query",
        number: $(".layui-input").val()
      },
      success: function (arr) {
        try {
          let html = `
          <tr data-id="${arr.data[0]._id}">
          <td>${arr.data[0].cNum}</td>
          <td>${arr.data[0].buyer}</td>
          <td>${arr.data[0].total}</td>
          <td class="pay" data-id="${arr.data[0].pay}">
            <form class="layui-form" action=""><input type="checkbox" name="like[pay]" title="支付">
            <div class="layui-unselect layui-form-checkbox layui-form-checked">
            <span>支付</span>
            <i class="layui-icon layui-icon-ok"></i>
            </div>
            </form>
          </td>
          <td class="send_out" data-id="${arr.data[0].send_out}">
            <form class="layui-form" action=""><input type="checkbox" name="like[send_out]" title="发货" checked>
            <div class="layui-unselect layui-form-checkbox layui-form-checked">
            <span>发货</span>
            <i class="layui-icon layui-icon-ok"></i>
            </div>
            </form>
          </td>
          <td class="arrive" data-id="${arr.data[0].arrive}">
            <form class="layui-form" action=""><input type="checkbox" name="like[arrive]" title="签收">
            <div class="layui-unselect layui-form-checkbox layui-form-checked">
            <span>签收</span>
            <i class="layui-icon layui-icon-ok"></i>
            </div>
            </form>
          </td>
          <td>${arr.data[0].buying_time}</td>
        </tr>
          `;
          $("tbody").html(html);
        } catch {
          alert("该订单不存在")
        };

      }
    });
  });
});
