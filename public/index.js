
const addTemplateBtn = document.querySelector(".add_btn")
const templateName_main = document.querySelector(".add_input")
const discription_main = document.querySelector(".add_discription")
const todo_container = document.querySelector(".todo_container")
const user_profile = document.querySelector(".user_profile")
const login = document.querySelector(".login")
console.log(todo_container);
let fieldName;
let index
let userId = null;
if (window.location.search) {
    const params = new URLSearchParams(window.location.search)
    userId = params.get("q")
}
if (todo_container.children.length !== 0) {
    initializer()
} 
function createUserStatus(){
    const {status,userName}=getCookie("user")
    if(status){
        login.remove()
        user_profile.style.visibility="visible"
    }else{
        user_profile.remove()
        login.style.visibility="visible"
    }

}
createUserStatus()
function initializer() {
    const todo = document.querySelectorAll(".todo")
    const remove_todo = document.querySelectorAll(".remove_todo")
    const dis_edit_btn = document.querySelectorAll(".dis_edit_btn")
    const name_edit_btn = document.querySelectorAll(".name_edit_btn")
    const cancel_editor = document.querySelectorAll(".cancel_editor")
    const save_editor = document.querySelectorAll(".save_editor")
    const edit_input = document.querySelectorAll(".edit_input")
    remove_todo.forEach((element) => {
        element.addEventListener("click", (event) => {
            index = Array.prototype.indexOf.call(remove_todo, event.target)
            const todoId = todo[index].getAttribute("id")
            console.log(index, todoId);
            removeTemplate(todoId, index, todo)

        })
    })
    name_edit_btn.forEach((element) => {
        element.addEventListener("click", (event) => {
            index = Array.prototype.indexOf.call(name_edit_btn, event.target)
            fieldName = "templateName"
            const todo_heading = document.querySelectorAll(".todo_heading")
            edit_input[index].value = todo_heading[index].innerHTML
            todo[index].classList.add("editor_active")
        })
    }, { once: true })
    dis_edit_btn.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.stopPropagation()
            index = Array.prototype.indexOf.call(dis_edit_btn, event.target)
            fieldName = "discription"
            const discription = document.querySelectorAll(".todo_dicription");
            edit_input[index].value = discription[index].innerHTML
            todo[index].classList.add("editor_active")
        })
    }, { once: true })
    save_editor.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.stopPropagation()
            index = Array.prototype.indexOf.call(save_editor, event.target)
            const editValue = edit_input[index].value
            saveTodo(editValue, todo)
            edit_input[index].value = ""
        })
    }, { once: true })
    cancel_editor.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.stopPropagation()
            index = Array.prototype.indexOf.call(cancel_editor, event.target)
            todo[index].classList.remove("editor_active")
            edit_input[index].value = ""
        })
    }, { once: true })
}
eventHandler(true)
const removeTemplate = async (todoId, index, todo) => {
    console.log(todoId, index);
    try {
        const res = await fetch(`/updateTemplate?q=${userId}&&todoId=${todoId}`, { method: "DELETE" })
        console.log(res);
        if (res) {
            todo[index].remove()
            window.location.reload()
        }
    } catch (error) {
        console.log("error in removeTemplate");
    }
}
async function addTemplate() {
    eventHandler(false)
    const garbegeDate= new Date()
    const date = String(garbegeDate.getDate()).padStart(2,"0")
    const month = String(garbegeDate.getMonth()+1).padStart(2,"0")
    const year = String(garbegeDate.getFullYear()).padStart(2,"0")
    const taskTime =`${date}-${month}-${year}`
    const index = document.querySelector(".todo_container").children.length
    const todoId = `@user:todo:id:${index}`
    console.log(todoId);
    const method = "POST"
    const json = {
        templateName: templateName_main.value,
        discription: discription_main.value,
        taskTime: taskTime
    }

    upLoadTemplate(todoId, json, method).then(function ({ pushRes }) {
        if (pushRes.modifiedCount === 1) {
            let list = `<div class="todo" id="${todoId}">
                 
                <div class="content">
                    <div class="task_name">
                        <h1 class="templateName">${templateName_main.value}</h1>
                        <div class="edit_btn_wrapper">
                            <button name="templateName" class="name_todo btn">Edit</button>
                        </div>
                    </div>
                    <div class="task_discription">
                        <p class="todo_paragragh discription">${discription_main.value}</p>
                         <div class="edit_btn_wrapper">
                            <button name="discription" class="dis_todo btn">Edit</button>
                        </div>
                    </div>
                </div>
                <div class="todo_btns">
                    <button class="remove_todo btn">Delete</button>
                    <span class="task_time">${taskTime}</span>
                </div>
                <div class="editor_toast">
                    <div class="editor_input">
                        <input class="edit_input" type="text">
                    </div>
                    <div class="editor_btns">
                        <button class="cancel_editor">Cancel</button>
                        <button class="save_editor">Save</button>
                    </div>
                </div>
            </div>`
            todo_container.innerHTML += list

            window.location.reload()
        }
    }).catch(function (error) {
        console.log(error);
    })

}
function eventHandler(eventFlag) {
    console.log(eventFlag);
    if (eventFlag) {
        console.log(eventFlag);
        addTemplateBtn.addEventListener("click", addTemplate)
    }
    else {
        console.log(eventFlag);
        addTemplateBtn.removeEventListener("click", addTemplate)
    }

}
eventHandler(true)
async function upLoadTemplate(todoId, json, method) {
    try {
        const options = {
            method: method,
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json"
            }
        }
        const res = await fetch(`/updateTemplate?q=${userId}&&todoId=${todoId}`, options)
        console.log("upLoadTemplate");
        if (res) {
            return await res.json()
        }

    } catch (error) {
        console.log("error in uploadTemplate");
    }
}


function saveTodo(editValue, todo) {
    const method = "PATCH"
    const json = {
        value: editValue,
        fieldName: fieldName
    }
    const todoId = todo[index].getAttribute("id")
    upLoadTemplate(todoId, json, method).then(function ({ ress }) {

        if (ress.modifiedCount === 1 && fieldName === "discription") {
            const discription = document.querySelectorAll(".todo_dicription");
            discription[index].innerHTML = editValue
        }
        if (ress.modifiedCount === 1 && fieldName === "templateName") {
            const todo_heading = document.querySelectorAll(".todo_heading")
            todo_heading[index].innerHTML = editValue
        }
        todo[index].classList.remove("editor_active")
    }).catch(function (error) {
        console.log(error);
    })

}

function getCookie(key) {
    const encodedCookies = document.cookie;
    const cookies = encodedCookies.split(";")
    for (let i = 0; i < cookies.length; i++) {
        const Akey = cookies[i].split("=")[0].trim();
        console.log(key);
        if (key === Akey) {
            return JSON.parse(decodeURIComponent(cookies[i].split("=")[1]).split("j:")[1] || decodeURIComponent(cookies[i].split("=")[1]))??{status:false,userName:null}
        }
    }
}


