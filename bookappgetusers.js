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
    axios.post('https://crudcrud.com/api/17bccf73c31d405d939ea24c5847c0f5/appointmentApp',obj)
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

            axios.get('https://crudcrud.com/api/17bccf73c31d405d939ea24c5847c0f5/appointmentApp')
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
        const createNewUserHtml = `<li id='${user.email}'>${user.name} - ${user.email} - ${user.phonenumber} - ${user.age}
                                        <button onclick=deleteUser('${user.email}')>Delete</button>
                                        <button onclick=editUser('${user.email}')>Edit</button>
                                    </li>
                                    `
        console.log(createNewUserHtml)
        parentNode.innerHTML +=  createNewUserHtml;
        console.log(parentNode.innerHTML)
    }

    function deleteUser(email) {
        localStorage.removeItem(email)
        removeItemFromScreen(email)
    }

    function removeItemFromScreen(email){
        const parentNode = document.getElementById('listOfitems');
        const elem = document.getElementById(email)
        parentNode.removeChild(elem);

    }
