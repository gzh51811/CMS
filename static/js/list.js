$(() => {
  /**
   * @description: 渲染用户列表
   * @param {type}
   * @return:
   */
  let index_ = 0;
  let show = () => {
    $.ajax({
      type: "Get",
      url: "../../user",
      data: {
        a: "show",
        page: index_,
        row: 10
      },

      success: function(arr) {
        // console.log(arr);
        let html = "";
        let data_ = arr.data;
        for (let index = 0; index < data_.length; index++) {
          html += `
          <tr data-id="${data_[index]._id}">
					<td>
						<div class="layui-unselect layui-form-checkbox" lay-skin="primary" data-id="1"><i class="layui-icon">&#xe605;</i></div>
					</td>
					<td>${index + 1}</td>
					<td class="userName">${data_[index].userName}</td>
					<td>${data_[index].gender}</td>
					<td>${data_[index].Mobile}</td>
					<td>${data_[index].E_mail}</td>
					<td>${data_[index].site}</td>
					<td>${new Date(data_[index].regDate).toLocaleString()}</td>
					<td class="td-manage">
						<a " title="修改密码" href="javascript:;">
							<i class="layui-icon">&#xe631;</i>
						</a>
					</td>
				</tr>
          `;
        }

        $("tbody").html(html);
      }
    });
  };
  show();
  /**
   * @description:  查询用户总数
   * @param {type}
   * @return: 无
   */
  var num = 0;
  let total = () => {
    $.ajax({
      type: "GET",
      url: "../../user",
      data: {
        a: "total"
      },
      async: false,
      success: function(arr) {
        if (arr.code) {
          num = arr.data.length;
          $(".total").html(`
          共有用户：<span style="color:#58bc58;">${num}</span> 位
          `);
        }
      }
    });
  };
  total();
  /**
   * @description: 渲染页码
   * @param {type}
   * @return:
   */
  // 页数
  var page = 0;
  let page_num = () => {
    if ((num / 10) % 1 != 0) {
      page = Math.ceil(num / 10);
    } else {
      page = num / 10;
    }
    // console.log(page);
    let pageHtml = "";
    for (let index = 1; index <= page; index++) {
      pageHtml += `
      <a class="num" href="javascript:;">${index}</a>
      `;
    }
    $(".pageNum").html(pageHtml);
  };
  page_num();
  // 首位渲染
  $(".num")
    .eq(index_)
    .addClass("current");

  /**
   * @description: 根据index_的值进行移动页码
   * @param {type}
   * @return:
   */
  var pageMove = () => {
    if ($(".current").html() * 1 < page - 1) {
      $(".pageNum").animate({
        left: "-" + (index_ - 1) * 41 + "px"
      });
    }
  };
  $(".pageNum").on("click", ".num", function() {
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
   * @description: 点击移动
   * @param {type}
   * @return:
   */
  $(".pageNum").on("click", ".num", function() {
    // console.log($(this));
    // 排它
    $(".num").removeClass("current");
    $(this).addClass("current");
    index_ = $(this).html() - 1;
    show();
    pageMove();
  });
  /**
   * @description: 点击左右加减切换页码
   * @param {type}
   * @return:
   */
  $(".page").on("click", ".prev,.next", function() {
    // 上一页
    if ($(this).hasClass("prev")) {
      if (index_ > 0) {
        $(".num").removeClass("current");
        --index_;
        $(".num")
          .eq(index_)
          .addClass("current");
        show();
        pageMove();
      }
    }
    // 下一页
    if ($(this).hasClass("next")) {
      if (index_ < page - 1) {
        $(".num").removeClass("current");
        ++index_;
        $(".num")
          .eq(index_)
          .addClass("current");
        show();
        pageMove();
      }
    }
  });
  //查询用户
  $(".but_an").click(function() {
    let val = $(".tex_content").val();
    $.ajax({
      type: "GET",
      url: "../../user",
      data: {
        a: "buyer",
        name: val
      },

      success: function(arr) {
        if (arr.code) {
          try {
            let data_ = arr.data[0];
            $("tbody").html(
              `
           <tr data-id="${data_._id}">
					<td>
						<div class="layui-unselect layui-form-checkbox layui-form-checked" lay-skin="primary" data-id="1"><i class="layui-icon">&#xe605;</i></div>
					</td>
					<td>${1}</td>
					<td class="userName">${data_.userName}</td>
					<td>${data_.gender}</td>
					<td>${data_.Mobile}</td>
					<td>${data_.E_mail}</td>
					<td>${data_.site}</td>
					<td>${new Date(data_.regDate).toLocaleString()}</td>
					<td class="td-manage">
						<a title="修改密码" href="javascript:;">
							<i class="layui-icon">&#xe631;</i>
						</a>
					</td>
				</tr>

            `
            );
          } catch {
            alert("该用户不存在");
          }
        }
      }
    });
  });
  // 修改密码
  $("tbody").on("click", ".td-manage a", function() {
    // console.log($(this))
    let name = $(this)
      .closest(".td-manage")
      .prevAll(".userName")
      .html();
    // console.log(name)
    // window.open('../../pages/member/password.html')
    WeAdminShow("添加用户", `./password.html?${name}`, 600, 400);
  });
});
