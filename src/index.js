import api from './api';

class App {
    constructor() {
        //const urlBase = 'https://growdev-test-node.herokuapp.com';

        document.getElementById('login').onclick = () => this.login();
        document.getElementById('register').onclick = () => this.register();
        document.getElementById('logout').onclick = () => this.logout();
        this.token = "";
        //this.searchUsers();
        this.data = [];
        document.getElementById('login-page').style.display = "flex";
        document.getElementById('home-page').style.display = "none";

    }

    login() {
        const username = document.getElementById('userLogin').value;
        const password = document.getElementById('passLogin').value;

        api.post('/login', {
            "username": username,
            "password": password
        })
            .then(r => {
                const { success, token } = r.data;

                if (success) {
                    this.token = token;
                    //Retornou sucesso no login
                    document.getElementById('login-page').style.display = "none";
                    document.getElementById('home-page').style.display = "flex";
                    this.searchGrowdevers();
                }
            }).catch(e => alert(e));        

    };

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

    };

    logout() {
        alert("Deseja sair do sistema?");
        document.getElementById('home-page').style.display = "none";
        document.getElementById('login-page').style.display = "flex";
    };

    searchGrowdevers() {
        api.getAuth('/growdevers', this.token)
            .then(r => {
                let html = "";
                console.log(r.data);
                r.data.growdevers.forEach((gd) => {
                    //alert(gd.email);
                    //this.showData(); //Como fazer dessa forma?                    
                    html += `                
                <div class="tbl-content">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            <tr>
                            <td>${gd.user.uid}</td>
                            <td>${gd.user.name}</td>
                            <td>${gd.user.type}</td>
                            <td>${gd.user.password_hash}</td>
                            <td>${gd.user.username}</td>
                            </tr>        
                        </tbody>
                    </table>
                </div>
                `;
                })
                document.getElementById("show-list").innerHTML = html;
            });
            
    };

    /*showData(data) {
        let html = "";
        data.forEach(gd => {
            html += `
            <div class="tbl-header">
            <table cellpadding="0" cellspacing="0" border="0">
            <thead>
                <tr>
                <th>UID</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Password_hash</th>
                <th>Nome de Usuário</th>
                </tr>
            </thead>
            </table>
        </div>
        <div class="tbl-content">
            <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
                <tr>
                <td>${gd.user.uid}</td>
                <td>${gd.user.name}</td>
                <td>${gd.user.type}</td>
                <td>${gd.user.password_hash}</td>
                <td>${gd.user.username}</td>
                </tr>        
            </tbody>
            </table>
        </div>        
            `;
        });

        document.getElementById("show-list").innerHTML = html;
        //document.getElementById('show-list').style.display = "block";
    };*/



}

new App();