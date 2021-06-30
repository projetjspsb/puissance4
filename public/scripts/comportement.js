$('#plateau').ready(function(){

        const Puissance4 = new Plateau("#plateau");
        console.log(sessionStorage.getItem('user'))
        var user = JSON.parse(sessionStorage.getItem('user'));
        console.log(user)
        if(user === null){
                document.getElementById('ToggleBtn').style.display = "block";
                document.getElementById('DeconnectionBtn').style.display = "none";
        } else{
                document.getElementById('ToggleBtn').style.display = "none";
                document.getElementById('DeconnectionBtn').style.display = "block";
                Puissance4.changeConfig(user.column, user.lines, user.goal, 
                        user.couleur, user.joueurs[0], user.joueurs[1]);
         }

        $('#PersoBtn').click(function(){
                        var user = JSON.parse(sessionStorage.getItem('user'));
                        const url = $('#PersoForm').attr("action");
                        const nbr_colonne = $('#ColonneInput').val();
                        const nbr_ligne = $('#LigneInput').val();
                        const nbr_to_win = $('#GoalInput').val();
                        const plateau_couleur = $('#CouleurPlateauInput').val();
        
                        const joueur1 = {pseudo: $('input[name="Pseudo1"').val(), 
                                        couleur: $('input[name="Color1"]').val()};
                        const joueur2 = {pseudo: $('input[name="Pseudo2"').val(), 
                                        couleur: $('input[name="Color2"]').val()}
                       
                        if(user != null){
                                $.ajax({
                                        url: url,
                                        type: 'PATCH',
                                        data: {
                                            email: user.email,
                                            phone: user.phone,
                                            column : nbr_colonne,
                                            lines : nbr_ligne,
                                            goal : nbr_to_win,
                                            couleur: plateau_couleur,
                                            joueur1Couleur : joueur1['couleur'],
                                            joueur2Couleur : joueur2['couleur'],
                                            joueur1Pseudo : joueur1['pseudo'],
                                            joueur2Pseudo : joueur2['pseudo'],
                                                status: '200'
                                        },
                                        success: function (res) {     
                                                sessionStorage.setItem('user', JSON.stringify(res.user));                                   
                                        }
                                    });
                        }
                      
                        Puissance4.changeConfig(nbr_colonne, nbr_ligne, nbr_to_win, plateau_couleur, joueur1, joueur2);
                       
                        $("#PersonnaliserModal").modal('toggle');
        }); 
        
        $('#LoginForm').submit(function(e){
                e.preventDefault();
                const username = $('#LoginForm').find('input[name="username"]').val();
                const password = $('#LoginForm').find('input[name="password"]').val();
                const url = $('#LoginForm').attr("action");
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: {
                            username : username,
                            password : password,
                            status: '200'
                        },
                        success: function (res) {
                                console.log(res);
                                sessionStorage.setItem('user', JSON.stringify(res.user));
                                Puissance4.changeConfig(res.user.column, res.user.lines, res.user.goal, 
                                        res.user.couleur, res.user.joueurs[0], res.user.joueurs[1]);
                                ToggleLogin(document.getElementById('ToggleBtn'));
                                document.getElementById('ToggleBtn').style.display = "none";
                                document.getElementById('DeconnectionBtn').style.display = "block";
                         }
                    });
        });

        $('#RegisterForm').submit(function(e){
                e.preventDefault();
                const form = $('#RegisterForm');
                const name = form.find('input[name="name"]').val();
                const email = form.find('input[name="email"]').val();
                const phone = form.find('input[name="phone"]').val();
                const password = form.find('input[name="password"]').val();
                const url = form.attr("action");
                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: {
                            name : name,
                            email : email,
                            phone : phone,
                            password : password,
                            status: '200'
                        },
                        success: function (res) {
                                sessionStorage.setItem('user', JSON.stringify(res.user));
                                ToggleLogin(document.getElementById('ToggleBtn'));
                                document.getElementById('ToggleBtn').style.display = "none";
                                document.getElementById('DeconnectionBtn').style.display = "block";
                        }
                    });
        });

        $('#recommencer').click(function(){
                Puissance4.FormationPlateau(true);
        });

});
 
function Deconnect(){
        document.getElementById('ToggleBtn').style.display = "block";
        document.getElementById('DeconnectionBtn').style.display = "none";
        sessionStorage.removeItem('user');
}

function ToggleLogin(btn) {   
        var PersoPart = document.getElementById("PersoPart");
        var PersoBtn = document.getElementById("PersoBtn");
        
        var LoginPart = document.getElementById("LoginPart");
         
        if (PersoPart.style.display === "none") {
                PersoPart.style.display = "block";
                LoginPart.style.display = "none";
                PersoBtn.style.display = "block";
                btn.firstChild.data = 'Se connecter';
        } else {
                PersoPart.style.display = "none";
                LoginPart.style.display = "block";
                PersoBtn.style.display = "none";
 
                btn.firstChild.data = 'Personaliser';
        }
} 