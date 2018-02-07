class WheelOfFortune {
	constructor(){
		this.phrases = [{phrase: "Chill Digger", hint: 'C'}, {phrase:"Country Roads Take Me Home", hint:'C'}, {phrase:"Championship Match", hint: 'C'}, {phrase: "Mythological Hero Achilles", hint: 'M'}];
		this.prizes = [1500, 150, 180, 450, 230, 180, 145, 430, 310, 385, 230, 430, 310, 180, 310, 375, 610, 310, 530, 230, 385];
		this.multiplier = 0;
		this.currentPhraseIndex = 0;
		var points = Cookies.get('points');
		this.points = points ? JSON.parse(points) : 0;
	}
	randonPhraseGenerator(){
		//**********************************************
		// this.phrase = Math.floor(Math.random()*2);
		// for (var i = 0; i < this.phrases.length; i++) {
		// 	$('.random-phrase').append()
		// }
		// return this.phrases[{this.currentPhrase}]
	}
	rotateWheel(){
		var $wheel = $('#wheel'), degree = 0;
		this.multiplier = Math.floor(Math.random() * this.prizes.length);
		let degree_value = (this.multiplier * 15);
		$wheel.css('transform', 'rotate(' + degree_value + 'deg)');
	}
	//you can only spin once before selecting a letter

	updatePoints(){
		this.points += this.prizes[this.multiplier];
		console.log(this.points);
		Cookies.set('points', this.points);
		$('#points_').text(this.points);

	}
	showGameBoard(){ 
		var phrase = this.phrases[this.currentPhraseIndex].phrase;
		// for (var i = 0; i < this.phrases.length; i++) {
		// this.phrases[this.currentPhraseIndex].phrase;
		//}
		//Getting the code to display the next phrase.

		for (var i = 0; i < phrase.length; i++) {
			$('.phrase').append(`<div class="word-letter col border text-center" data-letter="${phrase[i].toLowerCase()}">&nbsp;</div>`);
		}
		this.displayPoints();
		this.multipleRounds();
	}

	letterPress(letter){
		var phrase = this.phrases[this.currentPhraseIndex].phrase;
		console.log(phrase);
		if (phrase.toLowerCase().indexOf(letter) >= 0) {
			this.updatePoints();
			//toLowerCase();*********
			$('.word-letter').each(function(){
				if ($(this).data('letter') === letter) {
					$(this).text(letter);
				}
			});
		}
	}

	inputBox(){
		var letter = $(this).text().toLowerCase();
		var phrase = this.phrases[this.currentPhraseIndex].phrase;
		if ($('#word-guess').val() === phrase) {
			$('.alert.alert-success').css("display", "inline-block");
			this.points = 0;
			this.displayPoints();	
			this.phrases[this.currentPhraseIndex[+1]];
		}else{
			$('.alert.alert-fail').css("display", "inline-block");
			this.points = 0;
			this.displayPoints();	
		}
	}
	displayPoints() {
		$('#points_').text(this.points);
	}
	multipleRounds() {
		// var letter = $(this).text().toLowerCase();
		var phrase = this.phrases[this.currentPhraseIndex].phrase;
		if ($('.phrase') === phrase) {
			$('.alert.alert-success').css("display", "inline-block");
			this.points = 0;
			this.displayPoints();	
			for (var i = 0; i < phrase.length; i++) {
					var	phrase = this.phrases[this.currentPhraseIndex[i]].phrase;
					}		
		}
		this.letterPress();
	}
}


var wheelOfFortune = new WheelOfFortune();
// var elements = [];
// elements.push('.letter');
// elements.push(`#A`, `#B`, `#C`, `#D`, `#E`, `#F`, `#G`, `#H`, `#I`, `#J`, `#K`, `#L`, `#M`, `#N`, `#O`, `#P`, `#Q`, `#R`, `#S`, `#T`, `#U`, `#V`, `#W`, `#X`, `#Y`, `#Z`);
// elements.each(function(){
// 	$(this).on('click', function(){
// 		console.log(wheelOfFortune.letterPress(letter))
// 	});
// });
// var letter = $(`#A`, `#B`, `#C`, `#D`, `#E`, `#F`, `#G`, `#H`, `#I`, `#J`, `#K`, `#L`, `#M`, `#N`, `#O`, `#P`, `#Q`, `#R`, `#S`, `#T`, `#U`, `#V`, `#W`, `#X`, `#Y`, `#Z`);

$(document).on('click', '#spin:not(.disabled)',function(){
	if (!$('#spin').hasClass('disabled')) {
		//allow one spin before pressing a letter. after letter submission-- allow spin to be reactivated
		wheelOfFortune.rotateWheel();
		$(this).addClass('disabled');
		$('.letters-wrapper').removeClass('disabled');
	}	
});

wheelOfFortune.showGameBoard();

$(document).on('click','.letter:not(.disabled)', function(){
		if (!$(this).hasClass('.disabled') && !$('.letters-wrapper').hasClass('disabled')){ 
			var letter = $(this).text().toLowerCase();
			$(this).addClass('disabled');
			wheelOfFortune.letterPress(letter);
			$('#spin').removeClass('disabled');
			$('.letters-wrapper').addClass('disabled');
		}
});

$('#button').click(function(){
	wheelOfFortune.inputBox();
});

wheelOfFortune.multipleRounds();
// $('.points').update(function(e){
// 	e.preventDefault();
// 	wheelOfFortune.pointsBoard();

// })
// $('#spin').click(function(e){
// 		e.preventDefault();
// 		var points = wheelOfFortune.pointsBoard();
// 		Cookies.set('points', points);
// 	if (Cookies.get('points') !== undefined){
// 		$('.points').text('Score: ' + Cookies.get('points'));
// 	}
// 	console.log(wheelOfFortune.pointsBoard());	
// });





