var listcofig = {
    id: null,
    value: '',
    flag: null,
    flagdelete: '',
    iddelete:null
};

var phanloaispadmin = {
    init: function () {
        phanloaispadmin.registerEvent();
        phanloaispadmin.loadData();
        

    },
    registerEvent: function () {
        $("[name=ipmau]").keypress(function (e) {
            if(e.which==13)
            {
                listcofig.id = $(this).attr('id');
                listcofig.value = $(this).val();
                
                listcofig.flag = "mau";
                $("#modelchange").modal('show');
            }
        });
        $("[name=iploai]").keypress(function (e) {
            if (e.which == 13) {
                listcofig.id = $(this).attr('id');
                listcofig.value = $(this).val();

                listcofig.flag = "loai";
                $("#modelchange").modal('show');
            }
        });
        $("[name=iphang]").keypress(function (e) {
            if (e.which == 13) {
                listcofig.id = $(this).attr('id');
                listcofig.value = $(this).val();

                listcofig.flag = "hang";
                $("#modelchange").modal('show');
            }
        });
        $("[name=btnDeletehang]").click(function () {
            listcofig.flagdelete = "hang";
            listcofig.iddelete = $(this).attr('id');
            $("#modeldelete").modal("show");
        });
        $("[name=btnDeletemau]").click(function () {
            listcofig.flagdelete = "mau";
            listcofig.iddelete = $(this).attr('id');
            $("#modeldelete").modal("show");
        });
        $("[name=btnDeleteloai]").click(function () {
            listcofig.flagdelete = "loai";
            listcofig.iddelete = $(this).attr('id');
            $("#modeldelete").modal("show");
        });
       

    },
    loadData: function () {

        $.ajax({
            url: "/PhanLoaiSanPhamAdmin/Load",
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                if (result.status) {

                    var hang = result.hang;
                    var mau = result.mau;
                    var loai = result.loai;
                    var rowhang = '';
                    var rowloai = '';
                    var rowmau = '';
                    $.each(hang, function (i, item) {
                        rowhang += "<tr>"
                        rowhang += "<td>" + item.id + "</td>"
                        rowhang += "<td><input name='iphang' id='" + item.id + "' type='text' value='" + item.hangsx + "'/></td>"
                        rowhang += "<td><button name='btnDeletehang' type='button' id='" + item.id + "' class='btn btn-danger btn-delete'>Delete</button></td>"
                        rowhang += "</tr>";
                        $("#tblhang").html(rowhang);
                    });
                    $.each(mau, function (i, item) {
                        rowmau += "<tr>"
                        rowmau += "<td>" + item.id + "</td>"
                        rowmau += "<td><input name='ipmau' id='"+item.id+"' type='text' value='"+item.mausp+"'/></td>"
                        rowmau += "<td><button name='btnDeletemau' type='button' id='" + item.id + "' class='btn btn-danger btn-delete'>Delete</button></td>"
                        rowmau += "</tr>";
                        $("#tblmau").html(rowmau);
                    });
                    $.each(loai, function (i, item) {
                        rowloai += "<tr>"
                        rowloai += "<td>" + item.id + "</td>"
                        rowloai += "<td><input name='iploai' id='"+item.id+"' type='text' value='"+item.loaisp+"'/></td>"
                        rowloai += "<td><button name='btnDeleteloai' type='button' id='" + item.id + "' class='btn btn-danger btn-delete'>Delete</button></td>"
                        rowloai += "</tr>";
                        $("#tblloai").html(rowloai);
                    });
                    
                    phanloaispadmin.registerEvent();
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
    
    DeleteEmployee: function (id,flag) {
        $("#loaderdelete").show();
        $.ajax({
            url: "/PhanLoaiSanPhamAdmin/Delete",
            type: 'POST',
            data: { id: id,flag:flag },
            success: function (result) {
                if (result.status) {
                    $("#loaderdelete").hide();
                    $("#modeldelete").modal("hide");
                    $("#thanhcong").show();
                    phanloaispadmin.loadData();
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
    save:function(id,flag,value)
    {
        $("#loaderDiv").show();
        $.ajax({
            url: "/PhanLoaiSanPhamAdmin/Save",
            type: 'POST',
            data: { id: id,flag:flag,value:value },
            success: function (result) {
                if (result.status) {
                    $("#loaderDiv").hide();
                    $("#modelchange").modal("hide");
                    $("#thanhcong").show();
                    listcofig.flag = "";
                    listcofig.value ="";
                    listcofig.id = null;
                    phanloaispadmin.loadData();
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
    add:function(flag,value)
    {
        $("#addload").show();
        $.ajax({
            url: "/PhanLoaiSanPhamAdmin/Add",
            type: 'POST',
            data: {flag: flag, value: value },
            success: function (result) {
                if (result.status) {
                    $("#addload").hide();
                    $("#modal_form").modal("hide");
                    $("#thanhcong").show();
                    phanloaispadmin.loadData();
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
    }
    


}
phanloaispadmin.init();