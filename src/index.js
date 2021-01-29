import api from './api';

class App {
    constructor() {
        //const urlBase = 'https://growdev-test-node.herokuapp.com';

        document.getElementById('login').onclick = () => this.login();
        document.getElementById('register').onclick = () => this.register();
        this.token = "";
        document.getElementById('login-page').style.display = "flex";
        document.getElementById('home-page').style.display = "none";
    }
    
    login() {
        const username  = document.getElementById('userLogin').value;
        const password  = document.getElementById('passLogin').value;        

        api.post('/login', {
            "username": username,
            "password": password
        })        
            .then(r =>                
                console.log(r.data))
                document.getElementById('login-page').style.display = "none"
                document.getElementById('home-page').style.display = "block"
            .catch(e => alert(e.response.data.message));
    }

    register() {
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('pass').value;
        const type = document.getElementById('type').value;

        api.post('/users', {
            "name": name,
            "username": username,
            "password": password,
            "type": type
        })
            .then(r => console.log(r.data))
            .catch(e => alert(e.response.data.message));


    }


}

new App();