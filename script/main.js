$( document ).ready(function () {
	hovering();
    //show the feederName when click checkbox
    toggleForm();
});

//animation for table move down
hovering = function () {
	var el = document.querySelectorAll('.form-content');
	anime({
		targets: el,
		translateY: [-150, 50],
		direction: 'alternate',
		duration: 2000,
		loop: false,
		easing: 'easeInOutQuad'
	});
}

//toggle feeder field
function toggleForm(){
   if($('#gridCheck').is(':checked')==true){
        $(".feederfield").show();
   }else{
        $(".feederfield").hide();
   }
  
}
