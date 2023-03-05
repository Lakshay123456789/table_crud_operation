$(document).ready(function(){
      if(localStorage.getItem("userData")==null){
        storeData();  
      }
      else{
       showData();
      }
});
function storeData(){
    $.ajax({
     type:"GET",
     url:"./local.json",
     datatype:"JSON",
     success:successFn,
     error:errorFn
    });
}
function successFn(data){
   const myData=JSON.stringify(data);
   localStorage.clear();
   localStorage.setItem("userData",myData);
    showData();
}
function errorFn(error){
     console.log(error);
}
function localSetData(jsonData){
    const myData=JSON.stringify(jsonData);
    localStorage.clear();
    localStorage.setItem("userData",myData);
    showData();
}
function localGetData(){
    const data=localStorage.getItem("userData");
    const parsData=JSON.parse(data);
    return parsData;
}
function showData(){
      $(".cards").empty();
      let parseData=localGetData();
      console.log(parseData);
      let container=$("#card-container");
       for(let i=0;i<parseData.length;i++){
        let card=$("<div class='col-sm-4 shadow g-3 '></div>").addClass("cards");
        let imgTag=$('<img>');
        imgTag.attr({
           class:"img-fluid",
           src:`${parseData[i].url}`,
           alt:"image",
        });
        let cardData=$('<div></div>');
        let heading=$('<h4></h4>').text(`${parseData[i].name}`);
        let title=$('<p></p>').text(`${parseData[i].title}`);
        let readButton=("<button class='btn btn-primary m-4'>Read</button>");
        let deleteButton=("<button class='btn btn-danger'>delete</button>");
        cardData.append(heading);
        cardData.append(title);
        cardData.append(readButton);
        cardData.append(deleteButton);
        card.append(imgTag);
        card.append(cardData);
        container.append(card);
       }

}
$("#submitbtn1").click(function(){
    $("#staticBackdrop").modal('hide');
      let parsData=localGetData();
       let userId=Number(parsData[parsData.length-1].id);
       let imageset=$("#selectbutton").val();
       let image;

       if(imageset=="1"){
        image="./1.jpg";
       }
       else if(imageset=="2"){
        image="./2.jpg";
       }
       else{
        image="./3.jpg";
       }
       console.log(imageset) 
      const obj={
        id:`${userId+1}`,
        name:$("#exampleFormControlInput1").val(),
        title:$("#exampleFormControlInput2").val(),
        url:`${image}`
      }
      parsData.push(obj);
      localSetData(parsData);
});