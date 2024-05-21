let bookmarkName = document.getElementById("bookmarkName");
let bookmarkURL = document.getElementById("bookmarkURL");
let tableContent = document.getElementById("tableContent");
let visitBtn = document.getElementById("visit");
let deleteBtn = document.getElementById("delete");
let update = document.getElementById("update");
let submitBtn = document.getElementById("submitBtn");
let updateBtn = document.getElementById("updateBtn");
let search = document.getElementById("search");
let DeleteAll = document.getElementById("DeleteAll");
let deleteIndex = document.getElementById("deleteIndex");

let nameValid;
let urlValid;

let datalist = [];
let box = '';
let index ;

if(localStorage.list != null){
    datalist = JSON.parse(localStorage.list)
}else{
    datalist=[]
}
displayData(datalist)
function createData(){
    if(validationUrl() === true && validationName() === true){
        let data = {
        siteName: bookmarkName.value ,
        siteUrl: bookmarkURL.value
    }
    datalist.push(data)
    localStorage.setItem("list" , JSON.stringify(datalist))
    displayData(datalist)
    clearData()
    }else{
        Swal.fire({
            title: "Invalid Inputs",
            text: `   ${validationName() === true?"":"Invaild Name"} ${validationUrl()=== true? "":" Invalid URL"}`,
            icon: "error"
        });
    }
}
function displayData(arr , trem){
    box = ''
    for(i=0 ; i<arr.length ; i++){
        box += `
            <tr>
                <td>${i+1}</td>
                <td>${trem?arr[i].siteName.replace(trem , `<span class="bg-danger text-white fs-5">${trem}</span>`):arr[i].siteName}</td>              
                <td>
                <a target="_blank" href="${arr[i].siteUrl}" class="btn btn-info text-white"><i class="fa-regular fa-eye pe-3"></i>Visit</a>
                </td>
                <td>
                    <button onclick='getUpdateData(${i})' id="delete" class="btn btn-warning text-white pe-2">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    Update
                    </button>
                </td>
                <td>
                    <button onclick='deleteData(${i})' id="delete" class="btn btn-danger text-white pe-2">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                    </button>
                </td>
            </tr>
        `
        deleteIndex.innerHTML= `(${i+1})`
        tableContent.innerHTML = box;
    }
}
function deleteData(i){
    datalist.splice(i , 1)
    localStorage.setItem("list" , JSON.stringify(datalist))
    displayData(datalist)
}
function deleteAllData(){
    localStorage.clear()
    tableContent.innerHTML=''
    deleteIndex.innerHTML= ''
    datalist.splice(0)
    displayData(datalist)
}
function getUpdateData(i){
    bookmarkName.value = datalist[i].siteName
    bookmarkURL.value = datalist[i].siteUrl
    index = i
    submitBtn.classList.replace("d-block" , "d-none")
    updateBtn.classList.replace("d-none" , "d-block")
}
function updateData(){
    let newData = {
        siteName: bookmarkName.value,
        siteUrl: bookmarkURL.value 
    }
    datalist.splice(index , 1 , newData)
    localStorage.setItem("list" , JSON.stringify(datalist))
    displayData(datalist)
    clearData()
    updateBtn.classList.replace("d-block" , "d-none")
    submitBtn.classList.replace("d-none" , "d-block")
}
function clearData(){
    bookmarkName.value = ''
    bookmarkURL.value = ''
    bookmarkURL.classList.remove("is-valid")
    bookmarkName.classList.remove("is-valid")
}
function searchData(value){
    let trem = value
    let newdataList = []
    for(i=0 ; i<datalist.length ; i++){
        if(datalist[i].siteName.toLowerCase().includes(trem.toLowerCase())){
            data = {
                siteName:datalist[i].siteName,
                siteUrl:datalist[i].siteUrl
            }
            newdataList.push(data)
        }
    }
    displayData(newdataList , trem)
}
function validationUrl(){
    let pattern = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/g
    return pattern.test(bookmarkURL.value)
}
function validationName(){
    let pattern = /^\w{3,}(\s+\w+)*$/g
    return pattern.test(bookmarkName.value)
}

bookmarkName.addEventListener("input",function(){
    if(validationName()){
        bookmarkName.classList.add("is-valid")
        bookmarkName.classList.remove("is-invalid")
    }else{
        bookmarkName.classList.remove("is-valid")
        bookmarkName.classList.add("is-invalid")
    }
})
bookmarkURL.addEventListener("input",function(){
    if(validationUrl()){
        bookmarkURL.classList.add("is-valid")
        bookmarkURL.classList.remove("is-invalid")
    }else{
        bookmarkURL.classList.remove("is-valid")
        bookmarkURL.classList.add("is-invalid")
    }
})
submitBtn.addEventListener("click",createData)




























































































// if(localStorage.list != null){
//     datalist = JSON.parse(localStorage.list);
// }else {
//     datalist =[];
// }


// submitBtn.addEventListener("click" , function(){
//     if(urlValid === "valid"){
//         if(submitBtn.innerHTML == "Submit"){
//         createData();
//     }else{
//         updateData();
//     }
    
//     }else {
//         submitBtn.classList.add("disabled")
//     }
    
//     displayData();
//     saveData()
//     clearData();
// })


// function createData(){
//     let data = {
//         siteName : bookmarkName.value , 
//         siteUrl : bookmarkURL.value
//     }
//     datalist.push(data);
// }

// function displayData(){
//     box =''
//     for( i = 0 ; i<datalist.length ; i++ ){
//         box += `
//         <tr>
//                 <td>${i+1}</td>
//                 <td>${datalist[i].siteName}</td>              
//                 <td>
//                   <button onclick='visitUrl(${i})'  id="visit" class="btn btn-visit">
//                     <i class="fa-solid fa-eye pe-2"></i>Visit
//                   </button>
//                 </td>
//                 <td>
//                   <button onclick='deletedata(${i})' id="delete" class="btn btn-delete pe-2">
//                     <i class="fa-solid fa-trash-can"></i>
//                     Delete
//                   </button>
//                   <button onclick="setUpdateData(${i})" id="update" class="btn btn-update pe-2">
//                     <i class="fa-solid fa-pen-to-square"></i>
//                     Update
//                   </button>
//                 </td>
//             </tr>
//         `
//     }
//     tableContent.innerHTML = box;
// }
// displayData();

// function deletedata(i){
//     datalist.splice(i , 1);
//     saveData();
//     displayData();
// }
// function clearData(){
//     bookmarkName.value ='';
//     bookmarkURL.value = '';
//     bookmarkURL.classList.remove("is-valid");
//     bookmarkURL.classList.remove("is-invalid");
// }

// function saveData(){
//     localStorage.setItem("list" , JSON.stringify(datalist));
// }


// function visitUrl(i){
//     window.open(datalist[i].siteUrl, '_blank')
// }


// function setUpdateData(i){
//     index = i
//     bookmarkName.value = datalist[i].siteName;
//     bookmarkURL.value = datalist[i].siteUrl;
//     scroll({
//         top:0 , 
//         behavior:"smooth"
//     })
//     submitBtn.innerHTML = "Update";
// }

// function updateData(){
//     datalist[index].siteName = bookmarkName.value;
//     datalist[index].siteUrl = bookmarkURL.value;
//     submitBtn.innerHTML = "Submit";
// }




// bookmarkURL.addEventListener("input" , function(e){
//     const pattern =/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
//     if(bookmarkURL.value != null){
//             if(pattern.test(bookmarkURL.value)){
//                 e.target.classList.add("is-valid")
//                 e.target.classList.remove("is-invalid")
//                 submitBtn.classList.remove("disabled")
//                 urlValid = "valid"
//             }else{
//                 e.target.classList.add("is-invalid")
//                 e.target.classList.remove("is-valid")
//                 urlValid = "invalid"
//             }
//     }else{
//         bookmarkURL.classList.remove("is-valid");
//         bookmarkURL.classList.remove("is-invalid");
//     }
// })
