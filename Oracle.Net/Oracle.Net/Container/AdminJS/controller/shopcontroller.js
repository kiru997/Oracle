var listcofig = {
    pageSize: 5,
    pageIndex: 1,
    flag: true,
    anhchinh: '',
    anhfull: '',
    isconfirm: true,
    idedit: null,
    iddelete: null,
    idconfirm: null,
    idsuccess:null
};

var shopcontroller = {
    init: function () {
        shopcontroller.registerEvent();
        shopcontroller.loadData();
        

    },
    registerEvent: function () {
        $("[name=btnDelete]").click(function () {
            listcofig.iddelete = $(this).attr('id');
            $("#myModal").modal('show');
        });
        $("[name=btnConfirm]").click(function () {
            listcofig.idconfirm = $(this).attr('id');
            listcofig.isconfirm = true;
            $("#confirmorpaidmodel").modal('show');
        });
        $("[name=btnSuccess]").click(function () {
            listcofig.idconfirm = $(this).attr('id');
            listcofig.isconfirm = false;
            $("#confirmorpaidmodel").modal('show');

        });



    },
    loadData: function () {

        $.ajax({
            url: "/Shop/Load",
            type: 'GET',
            data: { page: listcofig.pageIndex, pageSize: listcofig.pageSize },
            dataType: 'json',
            success: function (result) {
                if (result.status) {
                    var data = result.full;
                    var rowcount = result.rowcount;
                    var rows = '';
                    $.each(data, function (i, item) {

                        rows += "<tr>"
                        rows += "<td>" + item.id + "</td>"
                        rows += "<td>" + item.iduser + "</td>"
                        rows += "<td>" + item.idsp + "</td>"
                        rows += "<td>" + item.idship + "</td>"
                        rows += "<td>" + item.ngaydat + "</td>"
                        if (item.status == 1) {
                            rows += "<td><span class='label label-success'>Confirmed</span></td>"
                        }
                        else
                            rows += "<td><span class='label label-primary'>Wait</span></td>"
                        if (item.thanhtoan == 1)
                            rows += "<td><span class='label label-success'>Paid</span></td>"
                        else
                            rows += "<td><span class='label label-warning'>UnPaid</span></td>"
                        rows += "<td>" + item.tongtien + "</td>"
                        rows += "<td><button name='btnConfirm' type='button' id='" + item.id + "' class='btn btn-info'>Confirm</button><button name='btnSuccess' type='button' id='" + item.id + "' class='btn btn-success'>Paid</button><button name='btnDelete' type='button' id='" + item.id + "' class='btn btn-danger btn-delete'>Delete</button></td>"
                        rows += "</tr>";
                        $("#tblfull").html(rows);
                    });

                    shopcontroller.page(rowcount, function () {
                        shopcontroller.loadData();
                    });
                    shopcontroller.registerEvent();
                }
            },
            error: function (err) {
                alert(JSON.stringify(err));
            }
        });
    },
    loadship: function () {

        $.ajax({
            url: "/Shop/LoadShip",
            type: 'GET',
            data: { pages: listcofig.pageIndexs, pageSizes: listcofig.pageSizes },
            dataType: 'json',
            success: function (result) {
                if (result.status) {
                    var data = result.takeship;
                    var totalrow = result.totalship;
                    var rows = "";
                    $.each(data, function (i, item) {
                        rows += "<tr>"
                        rows += "<td>" + item.id + "</td>"
                        rows += "<td>" + item.iduser + "</td>"
                        rows += "<td>" + item.idsp + "</td>"
                        rows += "<td>" + item.idship + "</td>"
                        rows += "<td>" + item.ngaydat + "</td>"
                        rows += "<td>" + item.tongtien + "</td>"
                        rows += "<td><button name='btnConfirm' type='button' id='" + item.id + "' class='btn btn-info'>Confirm</button><button name='btnSuccess' type='button' id='" + item.id + "' class='btn btn-success'>Paid</button><button name='btnDelete' type='button' id='" + item.id + "' class='btn btn-danger btn-delete'>Delete</button></td>"
                        rows += "</tr>";
                        $("#tblship").html(rows);
                    });
                    shopcontroller.pageship(totalrow, function () {
                        shopcontroller.loadship();
                    });
                    shopcontroller.registerEvent();
                }
            },
            error: function (err) {
                alert(JSON.stringify(err));
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
                setTimeout(callback, 200);
            }
        });
    },
    pageship: function (totalrow, callback) {
        var totalPage = Math.ceil(totalrow / listcofig.pageSize);
        $('#pagination-demo').twbsPagination({

            totalPages: totalPage,
            visiblePages: 7,
            onPageClick: function (event, page) {
                listcofig.pageIndex = page;
                $('#page-content').text('Page ' + page);
                setTimeout(callback, 200);
            }
        });
    },
    DeleteEmployee: function (id) {
        $("#loaderDiv").show();
        $.ajax({
            url: "/Shop/Delete",
            type: 'POST',
            data: { id: id },
            success: function (result) {
                if (result.status) {
                    $("#loaderDiv").hide();
                    $("#myModal").modal("hide");
                    $("#thanhcong").show();
                    shopcontroller.loadData();
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
    ConfirmOrPaid: function (id, flag) {
        $("#loaderconfirm").show();
        $.ajax({
            url: "/Shop/ConfirmOrPaid",
            type: 'POST',
            data: { id: id, flag: flag },
            success: function (result) {
                if (result.status) {
                    $("#loaderconfirm").hide();
                    $("#confirmorpaidmodel").modal("hide");
                    $("#thanhcong").show();
                    shopcontroller.loadData();
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
        $("#taikhoan").val('');
        $("#matkhau").val('');

        $("#email").val('');
        $("#result_anhsp").html('');
        $("#anh").val('');
        $("#sdt").val('');
        $("#quyen").val(0);
        $("#status").val(1);


    },
    savedata: function (id, flag) {
        $("#addload").show();
        var ten = $("#ten").val();
        var taikhoan = $("#taikhoan").val();
        var matkhau = $("#matkhau").val();

        var email = $("#email").val();
        var sdt = $("#sdt").val();
        var quyen = parseInt($("#quyen").val());
        var status = parseInt($("#status").val());

        $("#anh").val('');

        var memberjs =
             {
                 taikhoan: taikhoan,
                 matkhau: matkhau,
                 email: email,
                 sdt: sdt,
                 ten: ten,
                 quyen: quyen,
                 status: status,
                 anh: '',
             }
        if (flag == true) {
            memberjs.anh = listcofig.anhchinh;

        }
        else {
            if (listcofig.anhchinh != "") {
                memberjs.anh = listcofig.anhchinh;

            }

        }
        $.ajax({
            url: "/MemberAdmin/Save",
            type: 'POST',
            data: { data: JSON.stringify(memberjs), id: id, isadd: flag },
            success: function (result) {
                if (result.validate) {
                    $("#thatbai").show();
                    setTimeout(function () {
                        $("#thatbai").hide("slow");
                        $("#thanhcong").hide("slow");
                    },
                                  5000);
                }
                if (result.status) {
                    $("#addload").hide();
                    $("#modal_form").modal('hide');
                    $("#loadanh").empty();
                    $("#loadanh").hide();
                    $("#showchinh").empty();

                    $("#thanhcong").show();
                    Membercontroller.loadData();
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
}
shopcontroller.init();