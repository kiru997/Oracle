var listcofig = {
    pageSize: 5,
    pageIndex: 1,
    flag: true,
    idedit: null,
    anhchinh: '',
    anhfull: '',
    iddelete: '',
    isadd:true
};

var Membercontroller = {
    init: function () {
        Membercontroller.registerEvent();
        Membercontroller.loadData();

    },
    registerEvent: function () {
        $("[name=btnDelete]").click(function () {
            listcofig.iddelete = $(this).attr('id');
            $("#myModal").modal('show');
        });
        $("[name=btnDetail]").click(function () {
            Membercontroller.resetmodelinput();
            listcofig.idedit = $(this).attr('id');
            listcofig.isadd = false;
            Membercontroller.getdetail($(this).attr('id'));
        
        });
       


    },
    loadData: function () {

        $.ajax({
            url: "/MemberAdmin/Load",
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
                        rows += "<td>" + item.ID + "</td>"
                        rows += "<td style='max-width:110px'><img  width='100' height='100' src='/Container/Image/" + item.ANH + "'" + "title='" + item.ANH + "'/></td>"
                        rows += "<td>" + item.TAIKHOAN + "</td>"
                        rows += "<td>" + item.TEN + "</td>"
                        rows += "<td>" + item.SDT + "</td>"
                        rows += "<td>" + item.EMAIL + "</td>"
                        rows += "<td>" + item.QUYEN + "</td>"
                        if (item.STATUS == 1)
                            rows += "<td><span class='label label-success'>Active</span></td>"
                        else
                            rows += "<td><span class='label label-danger'>Block</span></td>"
                      

                        rows += "<td><button value='" + item.ID + "' name='btnDetail' type='button' id='" + item.ID + "' class='btn btn-default btn-edit'>Edit</button> <button name='btnDelete' type='button' id='" + item.ID + "' class='btn btn-danger btn-delete'>Delete</button></td>"
                        rows += "</tr>";
                        $("#tbldata").html(rows);
                    });
                    Membercontroller.page(rowcount, function () {
                        Membercontroller.loadData();
                    })
                    Membercontroller.registerEvent();
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
    DeleteEmployee: function (id) {
        $("#loaderDiv").show();
        $.ajax({
            url: "/MemberAdmin/Delete",
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
        $("#tenname").val('');
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
        var ten = $("#tenname").val();
        var taikhoan = $("#taikhoan").val();
        var matkhau = $("#matkhau").val();
        
        var email = $("#email").val();
        var sdt = $("#sdt").val();
        var quyen = parseInt($("#quyen").val());
        var status = parseInt($("#status").val());

        $("#anh").val('');
        
        var memberjs =
             {
                 TAIKHOAN: taikhoan,
                 MATKHAU: matkhau,
                 EMAIL: email,
                 SDT: sdt,
                 TEN: ten,
                 QUYEN: quyen,
                 STATUS: status,
                 ANH: '',
             }
        if (flag == true) {
            memberjs.ANH = listcofig.anhchinh;
            
        }
        else {
            if (listcofig.anhchinh != "") {
                memberjs.ANH = listcofig.anhchinh;
               
            }
            
        }
        $.ajax({
            url: "/MemberAdmin/Save",
            type: 'POST',
            data: { data: JSON.stringify(memberjs), id: id, isadd: flag },
            success: function (result) {
                if (result.validate)
                {
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
    getdetail: function (id) {
        $.ajax({
            url: "/MemberAdmin/GetDetail",
            type: 'GET',
            data: { id: id },
            dataType: 'json',
            success: function (result) {
                var data = result.data;
                if (result.status) {
                    alert(1);
                    $("#tenname").val(data.TEN);
                    $("#taikhoan").val(data.TAIKHOAN);
                    $("#email").val(data.EMAIL);
                    $("#sdt").val(data.SDT);
                    $("#status").val(data.STATUS);
                    $("anh").val('');
                    $("#quyen").val(data.QUYEN);
                    
                    if (data.ANH != "") {
                        $('#loadanh').show();
                        $('#loadanh').append("<img id='showchinh' width='113' height='155' src='/Container/Image/" + data.ANH + "'/>");
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
        var files = $("#anh")[0].files;
        

        if (window.FormData !== undefined) {
            // Create FormData object  
            var fileData = new FormData();
            
            // Looping over all files and add it to FormData object  
            for (var i = 0; i < files.length; i++) {
                fileData.append(files[i].name, files[i]);

            };
            


            $.ajax({
                url: '/MemberAdmin/UploadFile',
                type: "POST",
                contentType: false, // Not to set any content header  
                processData: false, // Not to process data  
                data: fileData,
                success: function (result) {

                },
                error: function (err) {

                }
            });
           
        }
        else {
            alert("FormData is not supported.");
        }

    }


}
Membercontroller.init();