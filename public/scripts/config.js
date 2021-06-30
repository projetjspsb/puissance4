class Plateau {
	constructor(selection){
		this.lines = 7;
		this.column = 6;
		this.goal = 4;
		this.joueurs = [
			{id : 1, pseudo: "Joueur 1", couleur: '#FF0000'},
			{id : 2, pseudo: "Joueur 2", couleur: '#FFFF00'},
	];
	this.joueur = this.joueurs[0];
	this.couleur = "#0000FF";
	this.selection = selection;
	this.FormationPlateau();
	this.ecoute();
	}
	
	FormationPlateau(empty = false) {
		const plateau = $(this.selection);
		if(empty){
			plateau.empty();
		}
		plateau.css('backgroundColor' , this.couleur);
		let lines = 0;
		while(lines < this.lines){
			const lineDiv = $('<div>').addClass('lines');
			let column = 0;
			while(column < this.column){
				const columnDiv = $('<div>')
				.addClass('column')
				.addClass('empty')
				.attr('data-column', column)
				.attr('data-line', lines);
				lineDiv.append(columnDiv);
				column ++;
			}
 			plateau.append(lineDiv);
			lines ++;
		}
	}

	ecoute(){
		const plateau = $(this.selection);
		const that = this;

		function DerniereCase(column){
			const cells = $('.column[data-column=' + column + ']');
			let counter = cells.length -1;
			while(counter >=0){
				var cell = $(cells[counter]);
				if(cell.hasClass("empty"))
				{
					return cell;
				}
				counter--;
			}
			return null;
		}
		plateau.on('mouseenter', ".column.empty", function(){
			var caseJouer = DerniereCase($(this).data('column'));
			if(caseJouer != null){
				caseJouer.css('background-color' , that.joueur.couleur);
 			}
		});
		plateau.on('mouseleave', ".column", function(){
			var caseJouer = DerniereCase($(this).data('column'));
			if(caseJouer != null){
				caseJouer.css('background-color' , '');
			}
		});
		plateau.on('click', ".column.empty", function(){
			var caseJouer = DerniereCase($(this).data('column'));
			if(caseJouer != null){
				caseJouer.css('background-color' , that.joueur.couleur)
				.removeClass('empty')
				.addClass('Joueur' + that.joueur.id)
				.data('joueur', that.joueur.id);
			}

			var gagnant = that.checkWin(caseJouer.data('line'), caseJouer.data('column'));
			console.log("gagnant" + gagnant);
			if(gagnant != null){
				$('#winner').text(gagnant);
				$("#ScoreModal").modal();
			}

			const turnText = " viens de jouer à toi "
			$('#TurnInfo').text(that.joueur === that.joueurs[0] ? that.joueurs[0].pseudo + turnText + that.joueurs[1].pseudo  : that.joueurs[1].pseudo + turnText + that.joueurs[0].pseudo)
			
			that.joueur = that.joueur === that.joueurs[0] ? that.joueurs[1] : that.joueurs[0];
		});
	}

	changeConfig(nbr_colonne, nbr_ligne, nbr_to_win, plateau_couleur, joueur1, joueur2){
		const plateau = document.getElementById('plateau');
		if(plateau_couleur != this.couleur){
			plateau.style.backgroundColor = plateau_couleur;
		}

		if(this.lines != nbr_ligne || this.column != nbr_colonne){
			this.lines = nbr_ligne;
			this.column = nbr_colonne;
			this.FormationPlateau(true);
		}
		
		this.joueurs[1].pseudo = joueur2.pseudo;
		this.joueurs[1].couleur = joueur2.couleur;

		this.joueurs[0].pseudo = joueur1.pseudo;
		this.joueurs[0].couleur = joueur1.couleur;
		this.goal = parseInt(nbr_to_win);
		this.couleur = plateau_couleur;

		plateau.style.backgroundColor = plateau_couleur;
		$('.column.Joueur2').css('background-color', joueur2.couleur);
		$('.column.Joueur1').css('background-color', joueur1.couleur);
        $('input[name="Color1"]').val(joueur1.couleur);
        $('input[name="Color2"]').val(joueur2.couleur);
        $('input[name="Pseudo1"]').val(joueur1.pseudo);
        $('input[name="Pseudo2"]').val(joueur2.pseudo);
        $('#ColonneInput').val(this.column);
        $('#LigneInput').val(this.lines);
        $('#GoalInput').val(this.goal);
        $('#CouleurPlateauInput').val(this.couleur);
	}	





	checkWin(line, column){
		const that = this;
		function RecupCellule(i,j){
			return $('.column[data-line=' + i + '][data-column='+j +']');
		}

		function IsInBOund(i,j)
		{
			return j >= 0 && i >= 0 && j < that.column && i < that.lines;
		}

		function checkDirection(vecteur_directeur) {
			var count = 1;
			var i = line + vecteur_directeur.i;
			var j = column + vecteur_directeur.j;
			var prochain = RecupCellule(i,j);
			while(IsInBOund(i,j) && prochain.data('joueur') === that.joueur.id) {
				count ++;
				i += vecteur_directeur.i;
				j += vecteur_directeur.j;
				prochain = RecupCellule(i,j);
			}

			i = line - vecteur_directeur.i;
			j = column - vecteur_directeur.j;
			prochain = RecupCellule(i,j);
			while(IsInBOund(i,j) && prochain.data('joueur') === that.joueur.id) {
				count ++;
				i -= vecteur_directeur.i;
				j -= vecteur_directeur.j;
				prochain = RecupCellule(i,j);
			}
			console.log("goal "  +that.goal);
			console.log("count " + count);
			if(count >= that.goal) {
				console.log("count");
				return that.joueur.pseudo ? that.joueur.pseudo : "Joueur " + that.joueur.id;
			} else {
				return null;
			}
		}

		return checkDirection({i:0, j:1}) 
		|| checkDirection({i:1, j:0})
		|| checkDirection({i:1, j:1})
		|| checkDirection({i:1, j:-1});
	}
}
