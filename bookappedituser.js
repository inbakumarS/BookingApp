function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
    const age=event.target.age.value;
    // localStorage.setItem('name', name);
    // localStorage.setItem('email', email);
    // localStorage.setItem('phonenumber', phonenumber)
    const obj = {
        name,
        email,
        phonenumber,
        age
    }
    //localStorage.setItem(obj.email, JSON.stringify(obj))
    //showNewUserOnScreen(obj);
    axios.post('https://crudcrud.com/api/8297077557514ea681fe0c27b124d66b/appointmentApp',obj)
      .then(response =>
        {
            showListofRegisteredUser(response.data);
            console.log(response)
        })
      .catch(err =>
        {
            document.body.innerHTML=document.body.innerHTML+'<h3>something went wrong</h3>'
            console.error(err)
        })
    }


    window.addEventListener('DOMContentLoaded', () => {

            axios.get('https://crudcrud.com/api/8297077557514ea681fe0c27b124d66b/appointmentApp')
            .then(response=>
                 {
                for (let i=0;i<response.data.length;i++){
                    showListofRegisteredUser(response.data[i]);
                    console.log(response);
                }
                
            })
             .catch(err =>
                {console.error(err)
                })
          })
    

    function showListofRegisteredUser(user){
        const parentNode = document.getElementById('listOfusers');
        const childHtml = `<li id='${user._id}'>${user.name}-${user.email}-${user.phonenumber}-${user.age}
                                        <button onclick=deleteUser('${user._id}')>Delete</button>
                                        <button onclick=editUser('${user.email}','${user.name}','${user.phonenumber}','${user.age}','${user._id}')>Edit</button>
                                    </li>
                                    `
        //console.log(createNewUserHtml)
        parentNode.innerHTML +=  childHtml;
        //console.log(parentNode.innerHTML)
    }

    function editUser(emailId,name,phonenumber,age,userId){
        
        document.getElementById('email').value=emailId;
        document.getElementById('username').value=name;
        document.getElementById('phonenumber').value=phonenumber;
        document.getElementById('age').value=age;
        deleteUser(userId);
        
    }

    function deleteUser(userId) {
        axios.delete(`https://crudcrud.com/api/8297077557514ea681fe0c27b124d66b/appointmentApp/${userId}`)
        .then(response =>
            {
                    removeItemFromScreen(userId);
                    //console.log(response);
                })
            
  .catch(err =>console.error(err));
  }
        //localStorage.removeItem(email)
        //removeItemFromScreen(email)
    

    function removeItemFromScreen(userId){
        const parentNode = document.getElementById('listOfusers');
        const childNodeToBeDeleted = document.getElementById(userId)
        if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
        }
    }

  