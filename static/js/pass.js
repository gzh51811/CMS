$(function () {
  // console.log();
  var data = decodeURI(window.location.search);
  var pass_worn = "";
  data = data.split("?")[1];
  $.ajax({
    type: "GET",
    url: "../../user",
    data: {
      a: "buyer",
      name: data
    },
    async: false,
    success: function (arr) {
      // console.log(arr);
      var data = arr.data[0];
      if (arr.code == 1) {
        $("#L_username").val(data.userName);
        pass_worn = data.password;
      }

    }
  });
  /**
   * @description: 验证密码
   * @param {type}
   * @return:
   */
  var passYz_1 = false;
  var passYz_2 = false;
  let password = () => {
    // console.log(pass_worn)
    if ($("#L_pass").val() == pass_worn) {
      $("#L_pass").css("border-color", "#58bc58");
      passYz_1 = true;
    } else {
      $("#L_pass").css("border-color", "red");
      passYz_1 = false;
    }
  };
  //修改并失去焦点时验证
  $("#L_pass").change(() => {
    password();
  })
  /**
   * @description: 提交新密码
   * @param {type}
   * @return:
   */
  let newPass = () => {
    if ($("#L_pass1").val() === $("#L_repass2").val()) {
      var reg = /[1-9]{6,}/g
      if (reg.test($("#L_pass1").val())) {
        $("#L_pass1,#L_repass2").css("border-color", "#58bc58");
        passYz_2 = true;
      } else {
        $("#L_pass1,#L_repass2").css("border-color", "red");
        passYz_2 = false;
      }

    } else {
      $("#L_pass1,#L_repass2").css("border-color", "red");
      passYz_2 = false;
    }
  }
  $("#L_repass2").change(() => {
    newPass();
  });
  /**
   * @description: 按确定键进行修改密码
   * @param {type}
   * @return:
   */
  $(".layui-btn").click(() => {
    password();
    newPass();
    if (passYz_1 && passYz_2) {
      $.ajax({
        type: "POST",
        url: "../../user",
        data: {
          a: "alterPass",
          name: data, //用户名
          newPass: $("#L_pass1").val() //新密码
        },

        success: function (atr) {
          alert("修改成功")
          var index = parent.layer.getFrameIndex(window.name);
          //关闭当前frame
          parent.layer.close(index);
        }
      });
    } else {
      alert("请输入正确密码")
    }
  });
})
