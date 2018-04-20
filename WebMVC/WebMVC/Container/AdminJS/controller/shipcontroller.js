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
    idsuccess: null
};

var shipcontroller = {
    init: function () {
        shipcontroller.registerEvent();
        shipcontroller.loadship();

    },
    registerEvent: function () {
        $("[name=btnDelete]").click(function () {
            listcofig.iddelete = $(this).attr('id');
            $("#myModal").modal('show');
        });
        $("[name=btnEdit]").click(function () {
            listcofig.idedit = $(this).attr('id');
            shipcontroller.getdetail(listcofig.idedit);
            
           
        });
        



    },
    loadship: function () {
        $.ajax({
            url: "/Shop/LoadShip",
            type: 'GET',
            data: { page: listcofig.pageIndex, pageSize: listcofig.pageSize },
            dataType: 'json',
            success: function (result) {
                if (result.status) {
                    var data = result.takeship;
                    var totalrow = result.totalship;
                    var rows = "";
                    $.each(data, function (i, item) {
                        rows += "<tr>"
                        rows += "<td>" + item.ID + "</td>"
                        rows += "<td>" + item.NAME + "</td>"
                        rows += "<td>" + item.LAST + "</td>"
                        
                        rows += "<td>" + item.PHONE + "</td>"
                        rows += "<td>" + item.ADDRESS + "</td>"
                        rows += "<td>" + item.NOTES + "</td>"
                        rows += "<td><button name='btnEdit' type='button' id='" + item.ID + "' class='btn btn-default'>Edit</button><button name='btnDelete' type='button' id='" + item.ID + "' class='btn btn-danger btn-delete'>Delete</button></td>"
                        rows += "</tr>";
                        $("#tblship").html(rows);
                    });
                    shipcontroller.page(totalrow, function () {
                        shipcontroller.loadship();
                    });
                    shipcontroller.registerEvent();
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
            url: "/Shop/DeleteShip",
            type: 'POST',
            data: { id: id },
            success: function (result) {
                if (result.status) {
                    $("#loaderDiv").hide();
                    $("#myModal").modal("hide");
                    $("#thanhcong").show();
                    shipcontroller.loadship();
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
        $("#name").val('');
        $("#ho").val('');
        $("#diachi").val('');

        $("#sdtt").val('');
      
        $("#ghichu").val('');


    },
    getdetail: function (id) {
        $.ajax({
            url:"/Shop/GetDetail",
            type: "POST",
            data: { id: id },
            success: function (result) {
                if(result.status)
                {
                    var data = result.data;
                   
                    $("#name").val(data.NAME);
                    $("#ho").val(data.LAST);
                    $("#diachi").val(data.ADDRESS);

                    $("#sdtt").val(Number(data.PHONE));

                    $("#ghichu").val(data.NOTES);
                    $("#modal_form").modal('show');
                   
                }
            },
            error:function(err){
                alert(JSON.stringify(err));
            },


        });
    },
    save: function (id) {

        ship = {
            NAME:$("#name").val(),
            LASTNAME:$("#ho").val(),
            ADDRESS:$("#diachi").val(),

            PHONE:$("#sdtt").val(),
      
            NOTES:$("#ghichu").val()
        }
        $.ajax({
            url: "/Shop/Save",
            type: "POST",
            data: { strship: JSON.stringify(ship), id: id },
            dataType: "json",
            success:function(result){
                if(result.status)
                {
                    $("#modal_form").modal('hide');
                    $("#thanhcong").show();
                    shipcontroller.loadship();
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
            error:function(err){
                alert(JSON.stringify(err));
            }
            


        });
    }
    
}
shipcontroller.init();