let citydist = 0;
let cpuOn = false;
let angy = false;
//bad moves
function badmove(thatunit, xdest, ydest){
	var score = 0;
	if(xdest == thatunit.posx && ydest == thatunit.posy){
		score += -15;
	}
	var team = thatunit.team;
	var type = thatunit.type;
	var reloading = thatunit.reloading;
	currentselection = xdest+"/"+ydest;
	var ismovable = canmove(eval(selchar).reloading, eval(selchar).id, eval(selchar).type, eval(selchar).range, eval(selchar).posx, eval(selchar).posy, eval(selchar).speed, eval(selchar).team, currentselection, eval(selchar).skin, eval(selchar).villager, false, true);
	if(ismovable == false){
		return -9999
	}

	//make the sum of efficiency scores by comparing units position
	for(x=0; x < unit.length; x++){
		if(unit[x].id != thatunit.id){
			var dist = getDist(xdest, unit[x].posx, ydest, unit[x].posy);
			score += outcome(thatunit, unit[x], dist, Math.abs(unit[x].posx-xdest), Math.abs(unit[x].posy-ydest));
		}
	}

	if(citydist){
		var closestaftermove = getclosestcity(thatunit);
		var closestdistx = Math.abs(closestaftermove.posx-xdest);
		var closestdisty = Math.abs(closestaftermove.posy-ydest);
		var closestdist = Math.abs(closestdistx+closestdisty);
		var diff = citydist-closestdist;
		if(closestdist == 0){
			score += 35;
		}else if(diff > 0){
			score += diff*5;
			if(angy){score += diff*5;}
		}else{
		score += diff*5
		if(angy){score += diff*5;}
		}
	}
	return score;
}

//return distance between two units 
function getDist(posx1, posx2, posy1, posy2){
	var xdist = getxDist(posx1, posx2);
	var ydist = getyDist(posy1, posy2);
	var totDist = Number(xdist+ydist);
	return totDist
}

function getxDist(posx1, posx2){
	var xdist = Math.abs(posx1 - posx2);
	return xdist
}

function getyDist(posy1, posy2){
	var ydist = Math.abs(posy1 - posy2);
	return ydist
}

function outcome(thatunit, otherunit, dist, distx, disty){
	//returns an efficieny score based on the dist between two given units
	var type = thatunit.type;
	var team = thatunit.team;
	var othertype = otherunit.type;
	var otherteam = otherunit.team;
	var score = 0;
	switch(type){

		case'fts':

			if(othertype == "fts"){
				//ennemy team
				if(otherteam != team){
					if(dist <= 3 && dist != 0){
						// at fts ennemy's range
						if(!angy){score += -15;}
					}else if(dist == 0){
						// kills fts ennemy
						score += 20;
					}
				}else{
					//same team
					if(dist >= 3 && dist > 0){
						// in fts ally's range
						if(!angy){score += 10;}

					}else if(dist == 0){
						// kills fts ally
						score += -100;
					}
				}
			}

			if(othertype == "gunner"){
				if(otherteam != team){
					if(dist == 2 || dist == 3){
						// at gunner ennemy's range
						if(!angy){score += -15;}
					}else if(dist == 0){
						// kills gunner ennemy
						score += 25;
					}
				}
			}

			if(othertype == "shield"){
				if(otherteam != team){
					if(dist == 2 || dist == 1){
						// at shield ennemy's range
						if(!angy){score += -15;}
					}else if(dist == 0){
						// kills shield ennemy
						score += 25;
					}
				}
			}

			if(othertype == "builder"){
				if(otherteam != team){
					if(dist == 0){
						// kills builder ennemy
						score += 25;
					}
				}
			}

			if(othertype == "radio"){
				if(otherteam != team){
					if(distx == 5 || distx == 6 || disty == 5 || disty == 6){
						// at radio ennemy's range
						if(!angy){score += -30;}
					}else if(dist == 0){
						// kills radio ennemy
						score += 25;
					}
				}
			}

			if(othertype == "tank"){
				if(otherteam != team){
					if(dist == 1 || dist == 3 || dist == 4 || dist == 5){
						// at tank ennemy's range
						if(!angy){score += -20;}
					}else if(dist == 0){
						// kills tank ennemy
						score += 40;
					}
				}
			}

			if(othertype == "seg"){
				if(otherteam != team){
					if(dist == 0){
						// kills seg ennemy
						score += 20;
					}
				}
			}

			if(othertype == "ninja"){
				if(otherteam != team){
					if(dist == 2 || dist == 1){
						// at ninja ennemy's range
						if(!angy){score += -30;}
					}else if(dist == 0){
						// kills ninja ennemy
						score += 25;
					}
				}
			}

			if(othertype == "vtb"){
				if(otherteam != team){
					if(dist == 2 || dist == 1){
						// at vtb ennemy's range
						if(!angy){score += -15;}
					}else if(dist == 0){
						// kills vtb ennemy
						score += 15;
					}
				}
			}

			if(othertype == "tower"){
				if(otherteam != team){
					if(dist == 2 || dist == 1){
						// at tower ennemy's range
						if(!angy){score += -60;}
					}else if(dist == 0){
						// kills tower ennemy
						score += -999;
					}
				}
			}
		break

		default:
		console.log("error in func_outcome() : unit type not found");
	}
	return score
}

function ftsplay(thatunit){
	var outcome = [];
	var closestcity = getclosestcity(thatunit);
	selchar = thatunit;
	citydist = getDist(thatunit.posx, closestcity.posx, thatunit.posy, closestcity.posy);
	//no move
	outcome[0]= badmove(thatunit, Number(thatunit.posx)+0, Number(thatunit.posy)+0);
	//move right 1x 
	outcome[1]= badmove(thatunit, Number(thatunit.posx)+1, Number(thatunit.posy)+0);
	//move right 2x 
	outcome[2]= badmove(thatunit, Number(thatunit.posx)+2, Number(thatunit.posy)+0);
	//move right 3x 
	outcome[3]= badmove(thatunit, Number(thatunit.posx)+3, Number(thatunit.posy)+0);
	//move left 1x 
	outcome[4]= badmove(thatunit, Number(thatunit.posx)-1, Number(thatunit.posy)+0);
	//move left 2x 
	outcome[5]= badmove(thatunit, Number(thatunit.posx)-2, Number(thatunit.posy)+0);
	//move left 3x 
	outcome[6]= badmove(thatunit, Number(thatunit.posx)-3, Number(thatunit.posy)+0);
	//move top 1x 
	outcome[7]= badmove(thatunit, Number(thatunit.posx), Number(thatunit.posy)-1);
	//move top 2x 
	outcome[8]= badmove(thatunit, Number(thatunit.posx), Number(thatunit.posy)-2);
	//move top 3x 
	outcome[9] = badmove(thatunit, Number(thatunit.posx), Number(thatunit.posy)-3);
	//move down 1x 
	outcome[10] = badmove(thatunit, Number(thatunit.posx), Number(thatunit.posy)+1);
	//move down 2x 
	outcome[11] = badmove(thatunit, Number(thatunit.posx), Number(thatunit.posy)+2);
	//move down 3x 
	outcome[12] = badmove(thatunit, Number(thatunit.posx), Number(thatunit.posy)+3);
	
	//move right 1x top 1x 
	outcome[13] = badmove(thatunit, Number(thatunit.posx)+1, Number(thatunit.posy)-1);
	//move right 1x top 2x 
	outcome[14] = badmove(thatunit, Number(thatunit.posx)+1, Number(thatunit.posy)-2);
	//move right 2x top 1x 
	outcome[15] = badmove(thatunit, Number(thatunit.posx)+2, Number(thatunit.posy)-1);
	//move right 1x down 1x 
	outcome[16] = badmove(thatunit, Number(thatunit.posx)+1, Number(thatunit.posy)+1);
	//move right 1x down 2x 
	outcome[17] = badmove(thatunit, Number(thatunit.posx)+1, Number(thatunit.posy)+2);
	//move right 2x down 1x 
	outcome[18] = badmove(thatunit, Number(thatunit.posx)+2, Number(thatunit.posy)+1);

	//move left 1x top 1x 
	outcome[19] = badmove(thatunit, Number(thatunit.posx)-1, Number(thatunit.posy)-1);
	//move left 1x top 2x 
	outcome[20] = badmove(thatunit, Number(thatunit.posx)-1, Number(thatunit.posy)-2);
	//move left 2x top 1x 
	outcome[21] = badmove(thatunit, Number(thatunit.posx)-2, Number(thatunit.posy)-1);
	//move left 1x down 1x 
	outcome[22] = badmove(thatunit, Number(thatunit.posx)-1, Number(thatunit.posy)+1);
	//move left 1x down 2x 
	outcome[23] = badmove(thatunit, Number(thatunit.posx)-1, Number(thatunit.posy)+2);
	//move left 2x down 1x 
	outcome[24] = badmove(thatunit, Number(thatunit.posx)-2, Number(thatunit.posy)+1);


	var topmove = bestmoves(outcome);
	var n = 0;
	switch(topmove[n]){
		case 0:
		currentselection = Number(Number(thatunit.posx)+0)+"/"+Number(thatunit.posy);
		break

		case 1:
		currentselection = Number(Number(thatunit.posx)+1)+"/"+Number(thatunit.posy);
		break

		case 2:
		currentselection = Number(Number(thatunit.posx)+2)+"/"+Number(thatunit.posy);
		break

		case 3:
		currentselection = Number(Number(thatunit.posx)+3)+"/"+Number(thatunit.posy);
		break

		case 4:
		currentselection = Number(Number(thatunit.posx)-1)+"/"+Number(thatunit.posy);
		break

		case 5:
		currentselection = Number(Number(thatunit.posx)-2)+"/"+Number(thatunit.posy);
		break

		case 6:
		currentselection = Number(Number(thatunit.posx)-3)+"/"+Number(thatunit.posy);
		break

		case 7:
		currentselection = Number(thatunit.posx)+"/"+Number(Number(thatunit.posy)-1);
		break

		case 8:
		currentselection = Number(thatunit.posx)+"/"+Number(Number(thatunit.posy)-2);
		break

		case 9:
		currentselection = Number(thatunit.posx)+"/"+Number(Number(thatunit.posy)-3);
		break

		case 10:
		currentselection = Number(thatunit.posx)+"/"+Number(Number(thatunit.posy)+1);
		break

		case 11:
		currentselection = Number(thatunit.posx)+"/"+Number(Number(thatunit.posy)+2);
		break

		case 12:
		currentselection = Number(thatunit.posx)+"/"+Number(Number(thatunit.posy)+3);
		break

		case 13:
		currentselection = Number(Number(thatunit.posx)+1)+"/"+Number(Number(thatunit.posy)-1);
		break

		case 14:
		currentselection = Number(Number(thatunit.posx)+1)+"/"+Number(Number(thatunit.posy)-2);
		break

		case 15:
		currentselection = Number(Number(thatunit.posx)+2)+"/"+Number(Number(thatunit.posy)-1);
		break

		case 16:
		currentselection = Number(Number(thatunit.posx)+1)+"/"+Number(Number(thatunit.posy)+1);
		break

		case 17:
		currentselection = Number(Number(thatunit.posx)+1)+"/"+Number(Number(thatunit.posy)+2);
		break

		case 18:
		currentselection = Number(Number(thatunit.posx)+2)+"/"+Number(Number(thatunit.posy)+1);
		break

		case 19:
		currentselection = Number(Number(thatunit.posx)-1)+"/"+Number(Number(thatunit.posy)-1);
		break

		case 20:
		currentselection = Number(Number(thatunit.posx)-1)+"/"+Number(Number(thatunit.posy)-2);
		break

		case 21:
		currentselection = Number(Number(thatunit.posx)-2)+"/"+Number(Number(thatunit.posy)-1);
		break

		case 22:
		currentselection = Number(Number(thatunit.posx)-1)+"/"+Number(Number(thatunit.posy)+1);
		break

		case 23:
		currentselection = Number(Number(thatunit.posx)-1)+"/"+Number(Number(thatunit.posy)+2);
		break

		case 24:
		currentselection = Number(Number(thatunit.posx)-2)+"/"+Number(Number(thatunit.posy)+1);
		break
	}
	canmove(eval(selchar).reloading, eval(selchar).id, eval(selchar).type, eval(selchar).range, eval(selchar).posx, eval(selchar).posy, eval(selchar).speed, eval(selchar).team, currentselection, eval(selchar).skin, eval(selchar).villager, true, false);
	var x = currentselection.substr(0, currentselection.indexOf('/') );
	var y = currentselection.substr(currentselection.indexOf('/')+1, currentselection.length);
	mvchar(eval(selchar), x, y);
}

function getclosestcity(thatunit){
	var closestcity = "";
	var distold = 100;
	var distnew = 100;
	for(i=0; i < cities.length ;i++){
		if(cities[i].team != thatunit.team){
			distnew = getDist(thatunit.posx, cities[i].posx, thatunit.posy, cities[i].posy);
			if(distnew < distold){
				distold = distnew;
				closestcity = cities[i];
			}
		}
	}
	return closestcity
}

function bestmoves(outcome){
	var topaction = [];
	var left = 5;
	while(left){
		var bestvalue = -999;
		var newvalue = -999;
		var id = 0;
		var i = 0;
		for(i; i < outcome.length; i++){
			newvalue = outcome[i];
			if(bestvalue < newvalue){
				if(istop(topaction,i) == false){
					bestvalue = newvalue;
					id = i+0;
				}
			}
		}
		topaction.push(id);
		left--;
	}
	return topaction
}

function istop(topaction, tocheck){
	for(i=0; i < topaction.length; i++){
		if(topaction[i] == tocheck){
			return true
		}
	}
	return false
}

function cpu(){
	cpuOn = true;
}

async function playCpu(){
	var infection = Math.floor(Math.random()*100)+1;
	if(infection >= 90){
		alert("vague d'infections !");
		angy = true;
		//play units
		var score = 0;
		var i = 0;
		for(i;i < unit.length; i++){
			if(unit[i].team == 2){
				await sleep(500);
					switch(unit[i].type){
					case "fts":
						 ftsplay(unit[i]);
					break
				}
			}
		}

		//choose spawn city
		var spawncity = [];
		for(i=0; i < cities.length; i++){
			if(cities[i].team == 2){
				num = i;
				spawncity.push(i);
			}
		}
		var loop = 10;
		while(spawncity[0] != undefined){
			var num = spawncity[Math.floor(Math.random()*spawncity.length)];

			//spawn units
			var cantrain = true;
			for(i = 0 ; i < unit.length; i++){
    		  	if(unit[i] != undefined){
    		  		if(cities[num].posx+"/"+cities[num].posy == getcharpos(unit[i])){
    		  			cantrain = false;
    		  		}
    		  	}
    		  }
    		  if(cantrain == true){
    		  	train(num,1,true);
    		  	balanceteam2++;
    		  }
    		 loop--;
    		 if(loop == 0){
    		 	break
    		 }
     	}
	}

	//play units
	var score = 0;
	var i = 0;
	for(i;i < unit.length; i++){
		if(unit[i].team == 2){
			await sleep(500);
			switch(unit[i].type){
				case "fts":
					 ftsplay(unit[i]);
				break
			}
		}
	}
	//try disabling angy after playing turn
	var trynum = Math.floor(Math.random()*2)+1
	if(trynum == 2){
		angy = false;
	}

	//choose spawn city
	var spawncity = [];
	for(i=0; i < cities.length; i++){
		if(cities[i].team == 2){
			num = i;
			spawncity.push(i);
		}
	}
	var loop = 10;
	while(spawncity[0] != undefined){
		var num = spawncity[Math.floor(Math.random()*spawncity.length)];
		//spawn units
		var cantrain = true;
		if(true){
			for(i = 0 ; i < unit.length; i++){
    	  		if(unit[i] != undefined){
    	  			if(cities[num].posx+"/"+cities[num].posy == getcharpos(unit[i])){
    	  				cantrain = false;
    	  			}
    	  		}
    	  	}
    	  	if(cantrain == true){
    	  		train(num,1,true);
    	  		balanceteam2++;
    	  	}
    	 }
    	 loop--;
    	 if(loop == 0){
    	 	break
    	 }
     }
     endturn();
}

function endturn(){
	//end turn
	toxtiles = [];
    toxtilesblue = [];
    toxtilespurple = [];
    nextturn();
    windupdate();
}