var listcofig = {
    pageSize: 5,
    pageIndex: 1,
    flag: true,
    idedit: 0,
    anhchinh: '',
    anhfull: '',
    iddelete: '',
    isadd:true,
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
                        rows += "<td>" + item.id + "</td>"
                        rows += "<td style='max-width:110px'><img  width='100' height='100' src='/Container/Image/" + item.anh + "'" + "title='" + item.anh + "'/></td>"
                        rows += "<td>" + item.taikhoan + "</td>"
                        rows += "<td>" + item.ten + "</td>"
                        rows += "<td>" + item.sdt + "</td>"
                        rows += "<td>" + item.email + "</td>"
                        rows += "<td>" + item.quyen + "</td>"
                        if (item.status == 1)
                            rows += "<td><span class='label label-success'>Active</span></td>"
                        else
                            rows += "<td><span class='label label-danger'>Block</span></td>"
                      

                        rows += "<td><button value='" + item.id + "' name='btnDetail' type='button' id='" + item.id + "' class='btn btn-default btn-edit'>Edit</button> <button name='btnDelete' type='button' id='" + item.id + "' class='btn btn-danger btn-delete'>Delete</button></td>"
                        rows += "</tr>";
                        $("#tbldata").html(rows);
                    });
                    Membercontroller.page(rowcount, function () {
                        Membercontroller.loadData();
                    })
                    Membercontroller.registerEvent();
                }
                else
                {
                    $("#tuchoi").show();
                    setTimeout(function () {
                        $("#tuchoi").hide("slow");
                        
                    },
                                  5000);
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
        alert(1);
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
                alert(JSON.stringify(err));
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
                   
                    $("#tenname").val(data.ten);
                    $("#taikhoan").val(data.taikhoan);
                    $("#email").val(data.email);
                    $("#sdt").val(data.sdt);
                    $("#status").val(data.status);
                    $("anh").val('');
                    $("#quyen").val(data.quyen);
                    
                    if (data.anh != "") {
                        $('#loadanh').show();
                        $('#loadanh').append("<img id='showchinh' width='113' height='155' src='/Container/Image/" + data.anh + "'/>");
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