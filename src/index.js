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
        this.user_id = "f0e37a13-4650-45d4-a17a-bf99bef9d981";
        document.getElementById('login-page').style.display = "flex";
        document.getElementById('home-page').style.display = "none";
        document.getElementById('adm-growdever').style.display = "none";
        document.getElementById('growdevers-tab').onclick = () => this.admGrowdevers();
        document.getElementById('add-new-growdever').onclick = () => this.addGrowdever();
        document.getElementById('delete-growdever').onclick = () => this.deleteGrowdever();


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
                    this.user_id = r.data.user.uid;
                    //Retornou sucesso no login
                    document.getElementById('login-page').style.display = "none";
                    document.getElementById('home-page').style.display = "flex";
                    this.searchGrowdevers();
                }
            }).catch(e => alert(e.response.data.message));

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

    addGrowdever() {
        
        const email = document.getElementById('email-growdever').value;
        const phone = document.getElementById('phone-growdever').value;
        const program = document.getElementById('program-growdever').value;
        const userUID = this.user_id;

        api.postAuth('/growdevers', {
            "email": email,
            "phone": phone,
            "program": program,
            "user_uid": userUID
        }, this.token)
            .then(r => console.log(r.data))
            .catch(e => alert(e.response.data.message));
            setTimeout(alert("Growdever cadastrado com sucesso!"), 2000); 
    }

    admGrowdevers() {        
        document.getElementById("show-list").style.display = "none";
        document.getElementById("tbl-header").style.display = "none";
        document.getElementById("adm-growdever").style.display = "block";
                
    }

    deleteGrowdever() {
        const uid = r.data.grodever.uid
        api.deleteAuth('/growdevers', uid, this.token)
        .then(r => console.log(r.data))
        .catch(e => alert(e.response.data.message));
        setTimeout(alert("Growdever deletado com sucesso!"), 2000);
    }
}

new App();