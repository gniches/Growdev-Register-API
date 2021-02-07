import api from './api';

class App {
    constructor() {
        //const urlBase = 'https://growdev-test-node.herokuapp.com';

        document.getElementById('login').onclick = () => this.login();
        document.getElementById('register').onclick = () => this.register();
        document.getElementById('logout').onclick = () => this.logout();

        this.token = "";

        this.growdeversList = [];
        this.user_id = "f0e37a13-4650-45d4-a17a-bf99bef9d981";
        document.getElementById('login-page').style.display = "flex";
        document.getElementById('home-page').style.display = "none";
        document.getElementById('adm-growdever').style.display = "none";
        document.getElementById('edit-growdever').style.display = "none";
        document.getElementById('new-growdever').onclick = () => this.addGrowdever();

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
        document.getElementById('adm-growdever').style.display = "none";
        document.getElementById('edit-growdever').style.display = "none";
        document.getElementById('login-page').style.display = "flex";
    };

    searchGrowdevers() {
        api.getAuth('/growdevers', this.token)
            .then(r => {

                let html = "";

                r.data.growdevers.forEach((gd) => {
                    this.growdeversList.push(gd);
                    html += `                
                <div class="tbl-content">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tbody>
                            <tr>
                            <td>${gd.uid}</td>
                            <td>${gd.email}</td>
                            <td>${gd.phone}</td>
                            <td>${gd.program}</td>                                                       
                            <td>
                            <button type="button" class="btn btn-danger btn delete-growdever" data-id="${gd.uid}">Excluir</button>
                            <button type="button" class="btn btn-primary btn edit-growdever" data-id="${gd.uid}">Editar</button>                            
                            </td>                            
                            </tr>        
                        </tbody>
                    </table>
                </div>
                `;
                })
                document.getElementById("show-list").innerHTML = html;

                document.querySelectorAll(".delete-growdever").forEach(el => {
                    el.onclick = (event) => this.deleteGrowdever(event);
                });

                document.querySelectorAll(".edit-growdever").forEach(el => {
                    el.onclick = (event) => this.editGrowdever(event);
                });

            });

    };

    addGrowdever() {

        document.getElementById("show-list").style.display = "none";
        document.getElementById("tbl-header").style.display = "none";
        document.getElementById("adm-growdever").style.display = "block";
        document.getElementById("add-new-growdever").onclick = () => {

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
                .then(r => {
                    document.getElementById("show-list").style.display = "block";
                    document.getElementById("tbl-header").style.display = "block";
                    document.getElementById("adm-growdever").style.display = "none";
                    this.searchGrowdevers();
                    alert("Growdever cadastrado com sucesso!");
                })
                .catch(e => alert(e.response.data.message));

        }

    }

    deleteGrowdever(event) {
        let uid = event.composedPath()[0].dataset.id;

        if (!confirm("Confirma a exclusão?")) {
            return;
        }

        api.deleteAuth(`/growdevers/${uid}`, this.token)
            .then(r => {
                this.searchGrowdevers();
                alert("Growdever deletado com sucesso!");
            })
            .catch(e => alert(e.response.data.message));

    }

    editGrowdever(event) {

        let uid = event.composedPath()[0].dataset.id;

        document.getElementById("show-list").style.display = "none";
        document.getElementById("tbl-header").style.display = "none";
        document.getElementById("adm-growdever").style.display = "none";
        document.getElementById("edit-growdever").style.display = "block";

        this, this.growdeversList.forEach(gd => {
            if (gd.uid === uid) {
                document.getElementById('edit-email-growdever').value = gd.email;
                document.getElementById('edit-phone-growdever').value = gd.phone;
                document.getElementById('edit-program-growdever').value = gd.program;

                document.getElementById("edit-new-growdever").onclick = () => {

                    let email = document.getElementById('edit-email-growdever').value;
                    let phone = document.getElementById('edit-phone-growdever').value;
                    let program = document.getElementById('edit-program-growdever').value;
                    

                    api.putAuth(`/growdevers/${uid}`, {
                        "email": email,
                        "phone": phone,
                        "program": program
                        
                    }, this.token)
                        .then(r => {
                            document.getElementById("show-list").style.display = "block";
                            document.getElementById("tbl-header").style.display = "block";
                            document.getElementById("edit-growdever").style.display = "none";
                            alert("Dados atualizados com sucesso!");
                            this.searchGrowdevers();
                        })
                        .catch(e => alert(e.response.data.message));

                }
            }
        })
    }
}

new App();