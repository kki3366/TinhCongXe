function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

function test() {
  if ($("#KMDauVao").val() == "") {
    $("#ok").text("");
    $("#msg").text("");
    $("#msg").text("Bạn chưa nhập KM đầu vào");
  } else if ($("#KMDauRa").val() == "") {
    $("#ok").text("");
    $("#msg").text("");
    $("#msg").text("Bạn chưa nhập KM đầu ra");
  } else if ($("#TuyenDuong").find(":selected").val() === "0") {
    $("#ok").text("");
    $("#msg").text("");
    $("#msg").text("Bạn chưa chọn tuyến đường");
  }else if(parseFloat($("#TienXang").val()) < "10000"){
    $("#ok").text("");
    $("#msg").text("");
    $("#msg").text("Tiền xăng tối thiểu là 10.000");
  } else if ($("#TienXang").val() == "") {
    $("#ok").text("");
    $("#msg").text("");
    $("#msg").text("Bạn chưa nhập tiền xăng");
  } else {
    var now = new Date();
    var nowD = convertDate(now);
    fetch("https://sheetdb.io/api/v1/h3v2amsaj5yad/search?Ngay=" + nowD + "")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Object.keys(data).length === 1) {
          $("#ok").text("");
          $("#msg").text("");
          $("#msg").text("Bạn đã ghi rồi, vui lòng ghi tiếp vào ngày mai");
        } else {
    
          var body = {
            KMDauVao: $("#KMDauVao").val(),
            KMDauRa: $("#KMDauRa").val(),
            TienXang: $("#TienXang").val(),
            TuyenDuong: $("#TuyenDuong").find(":selected").val(),
            QuangDuongDiDuoc:  $("#KMDauRa").val() - $("#KMDauVao").val(),
            Ngay: nowD,
          };
          fetch("	https://sheetdb.io/api/v1/h3v2amsaj5yad", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          })
            .then((response) => response.json())
            .then((data) => console.log(data));
            $("#msg").text("");
            $("#ok").text("Bạn đã ghi thành công");
        }
      });
  }
}

var d = new Date();
var preday = d.setDate(d.getDate() - 1);
var dayParam = convertDate(preday);
fetch("https://sheetdb.io/api/v1/h3v2amsaj5yad/search?Ngay=" + dayParam + "")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (Object.keys(data).length === 1) {
      $("#KMDauVao").val(data[0].KMDauRa);
      $("#KMDauVao").attr("disabled", "disabled");
    } else {
      $("#KMDauVao").removeAttr("disabled");
    }
  });
