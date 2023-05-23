
let cl = console.log;

const liForm = document.getElementById("liForm")


const liInfo =document.getElementById("liInfo")
const addliControl =document.getElementById("addli")


const updateBtn =document.getElementById("updateBtn")
const submitBtn =document.getElementById("submitBtn")

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


let liArray =[
    // {
    //     addli : 'Raj'
    // }
]


// liArray = JSON.parse(localStorage.getItem('liForm')) || [];
liArray = JSON.parse(localStorage.getItem("liForm")) ?? [];
// cl(liArray)

const templating= (arr)=>{
    let result ='';
    liArray.forEach((e,i)=>{
        result+= `
       
            <div class="card m-2 text-white border-2px-solid-#fff" id="${e.id}">
                    <div class="card-body bg-warning text-uppercase">
                        <span>${i+1} . ${e.addli}</span>  
                </div>
                <div class="card-footer text-white bg-secondary">
                    <div class="text-right ">
                        <button type="button" class="btn btn-warning text-white" onclick="onEdit(this)">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="onDelete(this)">Delete</button>
                    </div>
                
                </div>
             </div>
             
                    `;
    })
    liInfo.innerHTML=result;
}

templating(liArray)


const onSubmitBtn = (eve) =>{
        cl('added')
        eve.preventDefault();
        let liObj = {
            addli : addliControl.value,
            id :generateUuid()
        }
        liArray.unshift(liObj);
        eve.target.reset();
        localStorage.setItem('liForm',JSON.stringify(liArray));
        
        templating(liArray);
        // alert('Li added Successfully...!!!')
        // Try me! 
Swal.fire({
  title: 'List item added Successfully...!!!',
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
})
}

const onEdit = (eve) =>{
    cl('edited')
    // cl(eve.closest('.card').getAttribute('id'))
    let editId = eve.closest('.card').id
    localStorage.setItem('editId',editId); 
    let editObj = liArray.find(obj=>obj.id === editId);
    cl(editObj)
    addliControl.value = editObj.addli;
    updateBtn.classList.remove('d-none')
    submitBtn.classList.add('d-none')  
}

const onUpdateBtn = (eve) =>{
    cl('updated')
    let updateID = localStorage.getItem('editId');
    liArray.forEach(e=>{
        if(e.id === updateID){
            e.addli =  addliControl.value
        }
    })
    localStorage.setItem('liForm',JSON.stringify(liArray))
    templating(liArray)
    updateBtn.classList.add('d-none')
    liForm.reset();
    submitBtn.classList.remove('d-none')
    // alert('List Updated Successfully...!!!')
    Swal.fire({
        title: 'List Updated Successfully...!!!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

}

const onDelete = (eve) =>{
    cl('deleted')
    let deleteId = eve.closest('.card').id;
    let deleteIndx = liArray.findIndex(r=>r.id === deleteId)
    liArray.splice(deleteIndx,1)
    localStorage.setItem("liForm",JSON.stringify(liArray));
    templating(liArray)
    Swal.fire({
        title: 'List Deleted Successfully...!!!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
}


liForm.addEventListener("submit",onSubmitBtn)
updateBtn.addEventListener("click",onUpdateBtn)