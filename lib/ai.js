//AI functions
	let directionai = 0;
	let repeatmove = 0;

	function AI_start(){
		is_ai_on = true;
	}

	function playAI(){
		var destx = 0;
		var desty = 0;
		for(la=0; la < unit.length; la++){
			if(unit[la].team == 3){
				startx = unit[la].posx;
				starty = unit[la].posy;
				repeatmove = 0;
				aimove(startx, starty, la);
			}
		}
		spawnunit();
		selchar = 'none';
	}

	function aimove(startx, starty, l){
		if(repeatmove != 10){
			directionai = Math.floor(Math.random()*4)+1;
			var destx;
			var desty;
			switch(directionai){
				case 1:
				destx = startx+1;
				desty = starty;
				if(destx == xtiles){
					aimove(startx, starty, l)
					return
				}
				break

				case 2:
				destx = startx-1;
				desty = starty;
				if(destx == -1){
					aimove(startx, starty, l)
					return
				}
				break

				case 3:
				destx = startx;
				desty = starty+1;
				if(desty == ytiles){
				aimove(startx, starty, l)
					return
				}
				break

				case 4:
				destx = startx;
				desty = starty-1;
				if(desty == -1){
					aimove(startx, starty, l)
					return
				}
				break
			}
			if(aicanmove(unit[la], destx+'/'+desty)){
      			mvchar(unit[la], destx, desty);
			}else{
				repeatmove++;
				aimove(startx, starty, l);
			}
		}
	}

	function spawnunit(){
		var samelocation = false;
		for(b=0; b < villages.length; b++){
			samelocation = false;
			if(villages[b].slimeleft != 0){
				for(x=0; x < unit.length; x++){
					if(unit[x].posx == villages[b].posx && unit[x].posy == villages[b].posy){
						samelocation = true;
					}
				}
				if(samelocation == false){
					create('villager', 3, villages[b].posx, villages[b].posy, b);
					villages[b].slimeleft--;
				}
			}
		}
	}

	function aicanmove(thisunit, dest){
		//destination montagne ?
		var kill = true;
		var found = false;
		var agree = true;
		selchar = thisunit;
		var destx = dest.substr(0, dest.indexOf('/'));
      	var desty = dest.substr(dest.indexOf('/')+1, dest.length);

		//if destination is a mountain, can't move
      	for(x=0; x < mountains.length; x++){
      		subm = mountains[x].posx+"/"+mountains[x].posy;
      		if(subm == dest){
      			agree = false;
      		}
      	}

      	//if destination is a water, can't move
      	for(x=0; x < waters.length; x++){
      		subm = waters[x].posx+"/"+waters[x].posy;
      		if(subm == dest){
      			agree = false;
      		}
      	}

      	for(x=0; x < unit.length; x++){
      		//check coords of each existing char
      		if(dest == getcharpos(eval(charlist[x])) ){
				agree = false;
      		}
      	}

      	if(iscity(dest)){
      		agree = false;
      	}

      	if(isvillage(dest)){
      		agree = false;
      	}

      	if(iscannon(dest)){
      		agree = false;
      	}

      	return agree
	}