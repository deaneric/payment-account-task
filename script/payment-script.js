$(document).ready(function(){
	let currentTab = 0 ;
	showTab(currentTab);
	let elementObject = {};
	sessionStorage.setItem('storedElements',undefined);	
	let bankObj = [
				  {bank : "sbi" , bankName : "State Bank Of India"},
				  {bank : "bob" , bankName : "Bank Of Baroda"},
				  {bank : "hdfc" , bankName : "HDFC"},
				  {bank : "central" , bankName : "Central Bank"},
				  {bank : "boi" , bankName : "Bank Of India"},
				  {bank : "icici" , bankName : "ICICI"}
				  ];
				  
	let bankOptions = "<option disabled='disabled' selected='selected' val='none'>Select Your Bank</option>";        
	for (let i = 0; i < bankObj.length; i++){
		bankOptions += "<option value='"+bankObj[i].bank+"'>"+bankObj[i].bankName+"</option>";				      
    }
	document.getElementById("bank_name").innerHTML = bankOptions;				  
	
	function showTab(n){
		let getTab = $('.tab');
		getTab[n].style.display = "block";
		
		(n == 0) ? $('#btn_prev').css({"display":"none"})
		: $('#btn_prev').css({"display":"inline"});
		
		(n == (getTab.length-1)) ? $('#btn_next').text("Submit")
		: $('#btn_next').text("Next");		
		
		changeIconColor(n)
	}
	
	
	
	$('input,select').blur(function(ev){
		let el = ev.currentTarget;
	    elementObject[el.name] = el.value;
		//let activeElement = document.activeElement;
		//console.log("activeElement:",activeElement)
	    //let formElements = document.getElementById("form").elements;
		//console.log(formElements);
		sessionStorage.setItem('storedElements',JSON.stringify(elementObject));	
	});
	
	$('#btn_next').click(function(ev){
		ev.preventDefault();
		checkBtn(1);
	});
	$('#btn_prev').click(function(ev){
		ev.preventDefault();
		checkBtn(-1);
	});
	
	function checkBtn(arg){
		let x = $('.tab');
			
	    if (arg == 1 && !validateForm()){
			console.log("valid:",validateForm())
			return false;
		}
		
		let valObj = sessionStorage.getItem('storedElements');
		x[currentTab].style.display = "none";
		currentTab = currentTab + arg;
	    		
		if(currentTab >= x.length){
			alert("Success");
			alert("Obj:"+valObj);
			$('#form').submit();
			return false;
		}
		showTab(currentTab);
	}
	
	function validateForm(){		
		let valid = true;
		let selElement,x;		
		x = document.getElementsByClassName("tab");        
		selElement = x[currentTab].querySelectorAll("input,select");
		selElement.forEach((arr)=>{
			//console.log("Arr:",arr);
			console.log('selElement:',arr.type);
			switch(arr.type){
				case "radio" :
	     		    if($("#debit_card").prop("checked") == false && $("#credit_card").prop("checked") == false){	
					    valid = false;						
				    }
				    break;				  
				case "password" :
				    if(arr.value == ""){
					    arr.className +=" "+"invalid";
					    valid =false;
				    } 
				    else {
					   // console.log(arr.id);
					    if(arr.id == $("#usr_con_password").attr("id") && 
						$("#usr_password").val() != $("#usr_con_password").val()){		
                        //    console.log("USER-PWD:",$("#usr_password").val());						
                        //    console.log("USER-CON-PWD:",$("#usr_con_password").val());						
						    //arr.className +=" "+"invalid";
						    valid = false;
						//	console.log("VALID:",valid)
					        alert("Passwords are not matching.");
					    }					
				    }
				    break;				
				case "select-one" :			
				    if(arr.value == "Select Your Bank"){
					    arr.className +=" "+"invalid";
					    valid =false;
				    }
                    break;							
                default :
                    if(arr.value == ""){
					    arr.className +=" "+"invalid";						
					    valid =false;
				    }					
			}			
		});
		
		valid ? $(".icons")[currentTab].className +=" finish" : null;
		return valid;		
	}
	
	function changeIconColor(n){
		let i;
		let imageIcons = $(".icons");
		for(i = 0; i < imageIcons.length; i++){			
		  imageIcons[i].className = imageIcons[i].className.replace(" active"," ");
		}		
	    imageIcons[n].className = imageIcons[n].className.replace(" finish"," ");	
		imageIcons[n].className +=" active";
		
		switch(n){
			case 0:
			$("#line-color,#loading-bar").animate({
			    width : "19%"
			},"fast","linear");
			break;
			case 1:
			$("#line-color,#loading-bar").animate({
			    width : "43%"
			},"fast","linear");
			break;			
			case 2:
			$("#line-color,#loading-bar").animate({
			    width : "66%"
			});
			break;			
			case 3:
			$("#line-color,#loading-bar").animate({
			    width : "100%"
			});
			break;			
			default:
		    alert("Opps something has not worked!");
		}		
	}

    $("#mob_no").blur(function(){
		let mobileNumber = $("#mob_no").val(); 
		if (mobileNumber.length != 10){ 
		    $("#mob_no").attr("class"," invalid") ;
		    alert("Mobile number should have 10 digits") ;
		}		
	});	
	
	$("#card_number").blur(function(){
		let cardNumber = $("#card_number").val(); 
		if (cardNumber.length != 16){ 
		    $("#card_number").attr("class"," invalid") ;
		    alert("Card number should have 16 digits") ;
		}		
	});
	
	$("#email").blur(function(){
		let emailValue = $("#email").val();
		let filter = /^[\w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/ ;
		let value = filter.test(emailValue) ? true : false ;
		if(!value){
			$("#email").attr("class"," invalid") ;
		    alert("Enter valid email address.") ;
		}
	});
	
});