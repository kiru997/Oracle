var listcofig = {
    pageSize: 5,
    pageIndex: 1,
    flag: true,
    idedit: null,
    anhchinh: '',
    anhfull: '',
    idbook:'',
};

var listsanphamcontroller = {
    init: function () {
        listsanphamcontroller.registerEvent();
        listsanphamcontroller.loadData();
        listsanphamcontroller.loadhangloaimau();
        //listsanphamcontroller.load();

    },
    registerEvent: function () {

        $(".btn-delete").click(function () {

            $("#myModal").modal('show');
        });
        $("[name=btnDetail]").click(function () {
            listcofig.idedit = $(this).attr('id');
            listcofig.flag = false;
            listsanphamcontroller.getdetail(listcofig.idedit);
            $("#modal_form").modal('show');


        });
        $("[name=btnBook]").click(function () {
            listcofig.idbook = $(this).attr('id');
            
            $("#modal_book").modal('show');
            


        });


    },
    loadData: function () {
        $.ajax({
            url: "/SanPhamAdmin/Load",
            type: 'GET',
            data: { page: listcofig.pageIndex, pageSize: listcofig.pageSize },
            dataType: 'json',
            success: function (result) {
                if (result.status) {
                    
                    var data = result.data;
                    var rowcount = result.rowcount;
                    var rows = '';
                    $.each(data, function (i, item) {

                        rows += "<tr>"
                        rows += "<td>" + item.TENSP + "</td>"
                        rows += "<td><img width='100' height='100' src='/Container/Image/" + item.ANHBIA + "'/></td>"
                        rows += "<td>" + item.THONGTIN + "</td>"
                        rows += "<td>" + item.THONGSO + "</td>"
                        rows += "<td>" + item.DUNGLUONG + "</td>"
                        rows += "<td>" + item.GIA + "</td>"
                        rows += "<td>" + item.SOLUONG + "</td>"
                        rows += "<td>" + item.SALE + "</td>"
                        rows += "<td>" + item.TINHTRANG + "</td>"
                        if (item.ANHIEN == 1)
                            rows += "<td><span class='label label-success'>Hiện</span></td>"
                        else
                            rows += "<td><span class='label label-danger'>Ẩn</span></td>"
                       
                        rows += "<td><button name='btnBook' type='button' id='" + item.ID + "' class='btn btn-info btn-edit'>Book</button><button value='" + item.ID + "' name='btnDetail' type='button' id='" + item.ID + "' class='btn btn-default btn-edit'>Edit</button> <button name='btnDelete' type='button' id='" + item.ID + "' class='btn btn-danger btn-delete'>Delete</button></td>"
                        rows += "</tr>";
                        $("#tbldata").html(rows);
                    });
                    listsanphamcontroller.page(rowcount, function () {
                        listsanphamcontroller.loadData();
                    });
                    listsanphamcontroller.registerEvent();
                }
            },
            error: function (err) {
                alert(err);
            }
        });
    },
  
    loadhangloaimau: function () {
        $.ajax({
            url: "/SanPhamAdmin/LoadHangLoaiMau",
            type: 'GET',
            dataType: 'json',
            success: function (result) {

                if (result.status) {

                    var hang = "";
                    var loai = "";
                    var mau = "";
                    $.each(result.hang, function (i, item) {
                        hang += "<option value='" + item.ID + "'>" + item.HANGSX + "</option>\n"
                        $("#hang").html(hang);
                    });
                    $.each(result.loai, function (i, item) {
                        loai += "<option value='" + item.ID + "'>" + item.LOAISP + "</option>\n"
                        $("#loai").html(loai);
                    });
                    $.each(result.mau, function (i, item) {
                        mau += "<option value='" + item.ID + "'>" + item.MAUSP + "</option>\n"
                        $("#mau").html(mau);
                    });
                }

            }
        });
    },
    page: function (totalrow, callback) {
        var totalPage = Math.ceil(totalrow / listcofig.pageSize);
        $('#pagination-demo').twbsPagination({

            totalPages: totalPage,
            visiblePages: 7,
            onPageClick: function (event, page) {
                listcofig.pageIndex = page;
                $('#page-content').text('Page ' + page);
                setTimeout(callback,200);
            }
        });
    },
    DeleteEmployee: function (id) {
        $("#loaderDiv").show();
        $.ajax({
            url: "/SanPhamAdmin/Delete",
            type: 'POST',
            data: { id: id },
            success: function (result) {
                if (result.status) {
                    $("#loaderDiv").hide();
                    $("#myModal").modal("hide");
                    $("#thanhcong").show();
                    listsanphamcontroller.loadData();
                    setTimeout(function () {
                        $("#thatbai").hide("slow");
                        $("#thanhcong").hide("slow");
                    },
                                  5000);
                }
                else {
                    $("#thatbai").show();
                }


            }
        });
    },
    resetmodelinput: function () {
        $("#ten").val('');
        $("#tinhtrang").val('');
        $("#soluong").val(0);
        $("#thongtin").val('');
        $("#thongso").val('');
        $("#result_anhsp").html('');
        $("#result_anhsp2").html('');
        $("#anhchinh").val('');
        $("#anhfull").val('');
        $("#dungluong").val(8);
        $("#sale").val(0);
        $("#gia").val(0);
        $("#loadchinh").empty();
        $("#loadchinh").hide();
        $("#showchinh").remove();
        $("#showfull").remove();
        $("#loadfull").hide();


    },
    savedata: function (id, flag) {
        var ten = $("#ten").val();
        var tinhtrang = $("#tinhtrang").val();
        var soluong = parseInt($("#soluong").val());
        var thongtin = $("#thongtin").val();
        var dungluong = parseInt($("#dungluong").val());
        var sale = parseInt($("#sale").val());
        var thongso = $("#thongso").val();
        var hang = $("#hang").val();
        var loai = $("#loai").val();
        var mau = $("#mau").val();
        var gia = parseFloat($("#gia").val())
        var anhien = $("#anhien").val();

        $("#anhchinh").val('');
        $("#anhfull").val('');
        var sanphamjs =
             {
                 TENSP: ten,
                 TINHTRANG: tinhtrang,
                 SOLUONG: soluong,
                 THONGSO: thongso,
                 THONGTIN: thongtin,
                 DUNGLUONG: dungluong,
                 SALE: sale,
                 HANGSX: hang,
                 MAUSP: mau,
                 LOAISP: loai,
                 GIA: gia,
                 ANHIEN: anhien,
                 ANHBIA: '',
                 ANHFULL: '',

             }
        if (flag == true) {
            sanphamjs.ANHBIA = listcofig.anhchinh;
            sanphamjs.ANHFULL = listcofig.anhfull;
        }
        else {
            if (listcofig.anhchinh != "") {
                sanphamjs.ANHBIA = listcofig.anhchinh;

            }
            if (listcofig.anhfull != "") {
                sanphamjs.ANHFULL = listcofig.anhfull;
            }
        }
        $.ajax({
            url: "/SanPhamAdmin/Save",
            type: 'POST',
            data: { sanpham: JSON.stringify(sanphamjs), id: id, isadd: flag },
            success: function (result) {

                if (result.status) {
                    $("#addload").hide();
                    $("#modal_form").modal('hide');
                    $("#loadchinh").empty();
                    $("#loadchinh").hide();
                    $("#loadfull").empty();
                    $("#showchinh").remove();
                    $("#showfull").remove();
                    $("#loadfull").hide();
                    $("#thanhcong").show();
                    listsanphamcontroller.loadData();
                    setTimeout(function () {
                        $("#thatbai").hide("slow");
                        $("#thanhcong").hide("slow");
                    },
                                  5000);
                }
                else {
                    $("#thatbai").show();
                }


            },
            error: function (err) {
                alert(err);
            }
        });

    },
    getdetail: function (id) {
        $.ajax({
            url: "/SanPhamAdmin/GetDetail",
            type: 'GET',
            data: { id: id },
            dataType: 'json',
            success: function (result) {

                var data = result.data;
                if (result.status) {
                    $("#ten").val(data.TENSP);
                    $("#tinhtrang").val(data.TINHTRANG);
                    $("#soluong").val(data.SOLUONG);
                    $("#thongtin").val(data.THONGTIN);
                    $("#thongso").val(data.THONGSO);
                    $("#anhchinh").val('');
                    $("#anhfull").val('');
                    $("#dungluong").val(data.DUNGLUONG);
                    $("#sale").val(data.SALE);
                    $("#gia").val(data.GIA);
                    $("#hang").val(data.HANG);
                    $("#mau").val(data.MAU);
                    $("#loai").val(data.LOAI);
                    $("#anhien").val(data.ANHIEN);
                    if (data.ANHBIA != "") {
                        $('#loadchinh').show();
                        $('#loadchinh').append("<img id='showchinh' width='113' height='155' src='/Container/Image/" + data.ANHBIA + "'/>");
                    }
                    if (data.ANHFULL != "" || data.ANHFULL !=null) {
                        $('#loadfull').show();
                        var arr = data.ANHFULL.split(",");

                        for (var i = 0; i < arr.length; ++i) {
                            $('#loadfull').append("<img id='showfull'  width='113' height='155' src='/Container/Image/" + arr[i] + "'/>");
                        }
                    }


                    $("#modal_form").modal('show');


                }
                else {

                }


            },
            error: function (err) {
                alert(err);
            }
        });

    },

    postimage: function () {
        var files = $("#anhchinh")[0].files;
        var filesfull = $("#anhfull")[0].files;

        if (window.FormData !== undefined) {
            // Create FormData object  
            var fileData = new FormData();
            var fileDatafull = new FormData();

            // Looping over all files and add it to FormData object  
            for (var i = 0; i < files.length; i++) {
                fileData.append(files[i].name, files[i]);

            };
            for (var i = 0; i < filesfull.length; i++) {
                fileDatafull.append(filesfull[i].name, filesfull[i]);

            };


            $.ajax({
                url: '/SanPhamAdmin/UploadFile',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: fileData,
                success: function (result) {

                },
                error: function (err) {

                }
            });
            $.ajax({
                url: '/SanPhamAdmin/UploadFileFull',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: fileDatafull,
                success: function (result) {

                },
                error: function (err) {

                }
            });
        }
        else {
            alert("FormData is not supported.");
        }

    },
    resetbook:function(){
        $("#tenbook").val('');
        $("#hobook").val('');
        $("#diachibook").val('');
        $("#sdtbook").val('');
        $("#ghichubook").val('');
    },
    addbook: function (id) {
        var ship= {
            NAME:$("#tenbook").val(),
            LASTNAME:$("#hobook").val(),
            ADDRESS:$("#diachibook").val(),
            PHONE:$("#sdtbook").val(),
            NOTES:$("#ghichubook").val(),
        };
        var soluong = $("#soluongdat").val();
        $.ajax({
            url:"/Shop/Book",
            type: "POST",
            data:{id:id,soluong:soluong,ship:JSON.stringify(ship)},
            dataType: "json",
            success: function (result) {
                if(result.status)
                {
                    $("#modal_book").modal('hide');
                    $("#thanhcong").show();

                    setTimeout(function () {
                        $("#thatbai").hide("slow");
                        $("#thanhcong").hide("slow");
                    },
                                  5000);
                    listsanphamcontroller.loadData();
                }
                else
                {
                    $("#thatbai").show();
                }
            },
            error: function (err) {
                alert(JSON.stringify(err));
            }


        });
    }


}
listsanphamcontroller.init();