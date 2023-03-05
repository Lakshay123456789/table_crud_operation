// var userId = 0;  // for unique id  
// var  parsedData=[];  // for parseig

$(document).ready(function () {
    if (localStorage.getItem('userData') == null) {
        storeData();
    }
    else {
        showData();
    }
    $("#frm").validate({
        rules:{
            name:{
                required:true,
                minlength:2,
                maxlength:30
            },
            Email:{
                    required:true,
                    email:true,
            },
            contact:{
                required:true,
                digits:true,
                minlength:10,
                maxlength:10
            }
        },
        heighlight: function(element){
             $(element).addClass("applyRed");
        },
        unheighlight:function(element){
            $(element).removeClass("applyRed");
        },
        messages:{
            name:{
                required:"please enter name",
                minlength:"please enter valid name",
                maxlength:"please enter valid name"
             
            },
            Email:{
                 required:"please enter email",
                 email:"please enter valid name"
            },
            contact:{
                required:"please enter contact me",
                minlength:"please enter valid name",
                maxlength:"please enter valid name"
            }

        }
        
    });
    $("#myTable").DataTable();
   
    });

   
    

function storeData() {
    $.ajax({
        type: "GET",
        url: './localfile.json',
        datatype: "JSON",
        success: successMethod,
        error: errorMethod,
    });
}

function successMethod(data) {
    const myData = JSON.stringify(data);
    localStorage.clear();
    localStorage.setItem('userData', myData);
    showData();
}
function errorMethod(error) {
    console.log(error);
}


// get the data from local storage (into table form)

function showData() {
    $("#tbody").empty();
    let parsedData = localGetData();  // get return array
    for (let i of parsedData) {
        let rowBody = $("<tr></tr>");
       
        for (let j in i) {
            let tableData = $("<td></td>").text(`${i[j]}`);
            rowBody.append(tableData);
        }
        let editButton = $("<td><button id='editbutton'  class='btn btn-success' data-bs-toggle='modal' data-bs-target='#staticBackdrop2' >edit</button></td>");
        rowBody.append(editButton);
       let deleteButton = $(`<td><button class='deletebutton btn btn-danger' onclick='deleteButton(${i.id})'>Delete</button></td>`);
      //let deleteButton = $("<td><button class='deletebutton btn btn-danger'>Delete</button></td>");
     
        rowBody.append(deleteButton);
        $("#tbody").append(rowBody);
    }
}

function localGetData() {
    let getData = localStorage.getItem('userData');
    let parsedData = JSON.parse(getData);
    return parsedData;
}


function localSetData(jsonData) {
    const myData = JSON.stringify(jsonData);
    localStorage.clear();
    localStorage.setItem('userData', myData);

}

$("#sumbitbtn").click(function () {
   
    $("#staticBackdrop").modal('hide');
    let parsedData = localGetData();
    let NewUserId = "";
    let lastObject = parsedData[parsedData.length - 1];
    
    NewUserId += Number((lastObject.id)) + 1;
    let userObject = {
        id: `${NewUserId}`,
        name: $("#exampleInputName").val(),
        email: $("#exampleInputEmail").val(),
        contact_no: $("#exampleInputContact").val(),
    };

    parsedData.push(userObject);
    localSetData(parsedData);
    showData();
});

  

 // delete button

//   $("body").on("click", ".deletebutton", function () {
//     let text = "Are are ready to delete";
//     if (confirm(text) == true) {
//         let parent1 = $(this).parent().parent();
//         let userid = parent1.children().html();

//        // $(parent1).remove();
//         let parsedData = localGetData();

//         for (let i = 0; i < parsedData.length; i++) {
//             if (parsedData[i].id == userid) {
//                 parsedData.splice(i, 1);
//                 break;
//             }
//         }
//          if(parsedData.length==0){
//          localStorage.clear();
//          }else{
//                localSetData(parsedData);
//                showData();
//          }
         
//     } else {
//         console.log("data is not found");
//     }
// });

        function deleteButton(id){
//    $("body").on("click",".deletebutton", function(){
   // console.log(id);
    let text = "Are are ready to delete";
    let parent1 = $(this).parent().parent();
        if (confirm(text) == true) {
            let parsedData = localGetData();
            for (let i = 0; i < parsedData.length; i++) {
                            if (parsedData[i].id == id) {
                                parsedData.splice(i, 1);
                                $(parent1).remove();
                                break;
                            }
                        }
                         if(parsedData.length==0){
                         localStorage.clear();
                         }else{
                               localSetData(parsedData);
                              location.reload(true);
                               showData();
                         }
   }  
//    });
}
// function deleteButton(id){
//     console.log(id);
// }
//   edit button
$("body").on("click", "#editbutton", function () {


    let rowParent = $(this).parent().parent();
    let childrenChlid = $(rowParent).children();

    let userId = $(childrenChlid).html();
 
    let userName = ($(childrenChlid).next()).html();
    
    let userEmail = ($(childrenChlid).next().next()).html();
 
    let userContact = ($(childrenChlid).next().next().next()).html();
  
    $("#exampleInputName1").val(userName);
    $("#exampleInputEmail1").val(userEmail);
    $("#exampleInputContact1").val(userContact);

    $("#sumbitbtn2").click(function () {
        $("#staticBackdrop2").modal('hide');
        let userNewName = $("#exampleInputName1").val();
        let userNewEmail = $("#exampleInputEmail1").val();
        let userNewContact = $("#exampleInputContact1").val();
        let parsedData = localGetData();
        for (let i = 0; i < parsedData.length; i++) {
            if (parsedData[i].id == userId) {
                parsedData[i].name = userNewName;
                parsedData[i].email = userNewEmail;
                parsedData[i].contact_no = userNewContact;
                break;
            }
        }
        localSetData(parsedData);
        location.reload(true);
        showData();
    });
});
