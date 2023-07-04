// global variance to calculate abuse
var abuse_pcs = 0;


// add class function
function addClass(elName,className) {
  var element = document.getElementById(elName);
  element.classList.add(className);
}

// remove class function
function removeClass(elName,className) {
  var element = document.getElementById(elName);
  element.classList.remove(className);
}

//add text to HTML element
function addText(id,str) {
  var div = document.getElementById(id);
  div.innerHTML = str;
}


// function to calculate chicken varaince (actual vs pcs)
function calculate_chicken() {
  // get number of cooked heads and convert to int number
  var chickenAmountHeads = document.getElementById("chicken-cooked").value;
  var chickenAmountPieces = 0;
  if (chickenAmountHeads == "") {
    chickenAmountHeads = 0;
  }
  chickenAmountHeads = parseInt(chickenAmountHeads,10);
  //calculate number of chicken pieces based on number of heads
  //1 head = 9 pieces
  chickenAmountPieces = chickenAmountHeads * 9;



// get number of sold pieces and convert to int number
  var chickenSold = document.getElementById("chicken-sold").value;
  if (chickenSold == "") {
    chickenSold = 0;
  }
  chickenSold = parseInt(chickenSold,10);

// get number of physicaly wasted pieces and convert to int number
    var chickenWasted = document.getElementById("chicken-waste").value;
    if (chickenWasted == "") {
      chickenWasted = 0;
    }
    chickenWasted = parseInt(chickenWasted,10);

// get total number of pieces accounted for (sold + waste) and convert to int number
  var chickenAccFor  = (chickenSold + chickenWasted);
  chickenAccFor = parseInt(chickenAccFor,10);

// calculate variance between physical waste and epcs waste
  var varaincePieces = (chickenAmountPieces - chickenAccFor);
  var diff = (varaincePieces/chickenAccFor) * 100;
  diff = parseFloat(diff);
  diff = diff.toFixed(2);


// if var greater that 10% add danger class, otherwise add success class
   if(diff > -10 && diff < 10) {
     removeClass("chicken-var-proc", "bg-danger");
     addClass("chicken-var-proc", "bg-success");
   } else if(diff <= -10 || diff >= 10){
     removeClass("chicken-var-proc", "bg-sucess");
     addClass("chicken-var-proc", "bg-danger");
     abuse_pcs = abuse_pcs + 1;
   } else {
     removeClass("chicken-var-proc", "bg-danger");
     removeClass("chicken-var-proc", "bg-sucess");
     addClass("chicken-var-proc", "bg-secondary");
   }

   // alert(chickenAmount + " " + chickenSold  + " " + chickenAccFor  + " " + chickenWasted);
   // alert(diff);
   addText("pcs_chicken_pc",chickenAmountPieces);
   document.getElementById("chicken-acc-for").value = (chickenAccFor);
   document.getElementById("chicken-var-pc").value = (varaincePieces);
   document.getElementById("chicken-var-proc").value = (diff + "%");

}


// function to calculate fillet varaince (actual vs epcs)
function calculate_fillet() {
  // get number of cooked pieces and convert to int number
  var filletAmount = document.getElementById("fillet-cooked").value;
  if (filletAmount == "") {
    filletAmount = 0;
  }
  filletAmount = parseInt(filletAmount,10);

// get number of sold pieces and convert to int number
  var filletSold = document.getElementById("fillet-sold").value;
  if (filletSold == "") {
    filletSold = 0;
  }
  filletSold = parseInt(filletSold,10);

// get number of physicaly wasted pieces and convert to int number
    var filletWasted = document.getElementById("fillet-waste").value;
    if (filletWasted == "") {
      filletWasted = 0;
    }
    filletWasted = parseInt(filletWasted,10);

// get number of pieces accounted for (sold + waste) and convert to int number
  var filletAccFor = 0;
  filletAccFor = (filletSold + filletWasted);
  filletAccFor = parseInt(filletAccFor,10);

// calculate variance between physical waste and epcs waste
  var varaincePieces = (filletAmount - filletAccFor);
  var diff = (varaincePieces/filletAccFor) * 100;
  diff = parseFloat(diff);
  diff = diff.toFixed(2);


// if var greater that 10% add danger class, otherwise add success class
  if(diff > -10 && diff < 10) {
    removeClass("fillet-var-proc", "bg-danger");
    addClass("fillet-var-proc", "bg-success");
  } else if(diff <= -10 || diff >= 10){
    removeClass("fillet-var-proc", "bg-sucess");
    addClass("fillet-var-proc", "bg-danger");
    abuse_pcs = abuse_pcs + 1;
  } else {
    removeClass("fillet-var-proc", "bg-danger");
    removeClass("fillet-var-proc", "bg-sucess");
    addClass("fillet-var-proc", "bg-secondary");
  }

   // alert(filletAmount + " " + filletSold  + " " + filletAccFor  + " " + filletWasted);
   // alert(diff);
   document.getElementById("fillet-acc-for").value = (filletAccFor);
   document.getElementById("fillet-var-pc").value = (varaincePieces);
   document.getElementById("fillet-var-proc").value = (diff + "%");

}

// function to calculate mini fillet varaince (actual vs epcs)
function calculate_mf() {
  // get number of cooked pieces and convert to int number
  var mfAmount = document.getElementById("mf-cooked").value;
  if (mfAmount == "") {
    mfAmount = 0;
  }
  mfAmount = parseInt(mfAmount,10);

// get number pieces sold and convert to int number
  var mfSold = document.getElementById("mf-sold").value;
  if (mfSold == "") {
    mfSold = 0;
  }
  mfSold = parseInt(mfSold,10);

// get number of physicaly wasted pieces and convert to int number
    var mfWasted = document.getElementById("mf-waste").value;
    if (mfWasted == "") {
      mfWasted = 0;
    }
    mfWasted = parseInt(mfWasted,10);

// get number of pieces accounted for (sold + waste) and convert to int number
  var mfAccFor = 0;
  mfAccFor = mfSold + mfWasted;
  mfAccFor = parseInt(mfAccFor,10);

// calculate variance between physical waste and epcs waste
  var varaincePieces = (mfAmount - mfAccFor);
  var diff = (varaincePieces/mfAccFor) * 100;
  diff = parseFloat(diff);
  diff = diff.toFixed(2);


// if var greater that 10% add danger class, otherwise add success class
  if(diff > -10 && diff < 10) {
    removeClass("mf-var-proc", "bg-danger");
    addClass("mf-var-proc", "bg-success");
  } else if(diff <= -10 || diff >= 10){
    removeClass("mf-var-proc", "bg-sucess");
    addClass("mf-var-proc", "bg-danger");
    abuse_pcs = abuse_pcs + 1;
  } else {
    removeClass("mf-var-proc", "bg-danger");
    removeClass("mf-var-proc", "bg-sucess");
    addClass("mf-var-proc", "bg-secondary");
  }

   // alert(mfAmount + " " + mfSold  + " " + mfAccFor  + " " + mfWasted);
   // alert(diff);
   document.getElementById("mf-acc-for").value = (mfAccFor);
   document.getElementById("mf-var-pc").value = (varaincePieces);
   document.getElementById("mf-var-proc").value = (diff + "%");

}

// function to calculate Zinger varaince (actual vs epcs)
function calculate_zinger() {
  // get number of cooked pieces and convert to int number
  var zingerAmount = document.getElementById("zinger-cooked").value;
  if (zingerAmount == "") {
    zingerAmount = 0;
  }
  zingerAmount = parseInt(zingerAmount,10);

// get number pieces sold and convert to int number
  var zingerSold = document.getElementById("zinger-sold").value;
  if (zingerSold == "") {
    zingerSold = 0;
  }
  zingerSold = parseInt(zingerSold,10);

// get number of physicaly wasted pieces and convert to int number
    var zingerWasted = document.getElementById("zinger-waste").value;
    if (zingerWasted == "") {
      zingerWasted = 0;
    }
    zingerWasted = parseInt(zingerWasted,10);

// get number of pieces accounted for (sold + waste) and convert to int number
  var zingerAccFor = 0;
  zingerAccFor = zingerSold + zingerWasted;
  zingerAccFor = parseInt(zingerAccFor,10);

// calculate variance between physical waste and epcs waste
  var varaincePieces = (zingerAmount - zingerAccFor);
  var diff = (varaincePieces/zingerAccFor) * 100;
  diff = parseFloat(diff);
  diff = diff.toFixed(2);


// if var greater that 10% add danger class, otherwise add success class
  if(diff > -10 && diff < 10) {
    removeClass("zinger-var-proc", "bg-danger");
    addClass("zinger-var-proc", "bg-success");
  } else if(diff <= -10 || diff >= 10){
    removeClass("zinger-var-proc", "bg-sucess");
    addClass("zinger-var-proc", "bg-danger");
    abuse_pcs = abuse_pcs + 1;
  } else {
    removeClass("zinger-var-proc", "bg-danger");
    removeClass("zinger-var-proc", "bg-sucess");
    addClass("zinger-var-proc", "bg-secondary");
  }

   // alert(zingerAmount + " " + zingerSold  + " " + zingerAccFor  + " " + zingerWasted);
   // alert(diff);
   document.getElementById("zinger-acc-for").value = (zingerAccFor);
   document.getElementById("zinger-var-pc").value = (varaincePieces);
   document.getElementById("zinger-var-proc").value = (diff + "%");

}

// function to calculate Hot Wings varaince (actual vs pcs)
function calculate_hw() {
  // get number of cooked pieces and convert to int number
  var hwAmount = document.getElementById("hw-cooked").value;
  if (hwAmount == "") {
    hwAmount = 0;
  }
  hwAmount = parseInt(hwAmount,10);

// get number pieces sold and convert to int number
  var hwSold = document.getElementById("hw-sold").value;
  if (hwSold == "") {
    hwSold = 0;
  }
  hwSold = parseInt(hwSold,10);

// get number of physicaly wasted pieces and convert to int number
    var hwWasted = document.getElementById("hw-waste").value;
    if (hwWasted == "") {
      hwWasted = 0;
    }
    hwWasted = parseInt(hwWasted,10);

// get number of pieces accounted for (sold + waste) and convert to int number
  var hwAccFor = 0;
  hwAccFor = hwSold + hwWasted;
  hwAccFor = parseInt(hwAccFor,10);


// calculate variance between physical waste and epcs waste
  var varaincePieces = (hwAmount - hwAccFor);
  var diff = (varaincePieces/hwAccFor) * 100;
  diff = parseFloat(diff);
  diff = diff.toFixed(2);


// if var greater that 10% add danger class, otherwise add success class
  if(diff > -10 && diff < 10) {
    removeClass("hw-var-proc", "bg-danger");
    addClass("hw-var-proc", "bg-success");
  } else if(diff <= -10 || diff >= 10){
    removeClass("hw-var-proc", "bg-sucess");
    addClass("hw-var-proc", "bg-danger");
    abuse_pcs = abuse_pcs + 1;
  } else {
    removeClass("hw-var-proc", "bg-danger");
    removeClass("hw-var-proc", "bg-sucess");
    addClass("hw-var-proc", "bg-secondary");
  }

   // alert(hwAmount + " " + hwSold  + " " + hwAccFor  + " " + hwWasted);
   // alert(diff);
   document.getElementById("hw-acc-for").value = (hwAccFor);
   document.getElementById("hw-var-pc").value = (varaincePieces);
   document.getElementById("hw-var-proc").value = (diff + "%");

}

// function to calculate OTHER product varaince (actual vs pcs)
function calculate_other() {
  // get number of cooked pieces and convert to int number
  var otherAmount = document.getElementById("other-cooked").value;
  if (otherAmount == "") {
    otherAmount = 0;
  }
  otherAmount = parseInt(otherAmount,10);

// get number pieces sold and convert to int number
  var otherSold = document.getElementById("other-sold").value;
  if (otherSold == "") {
    otherSold = 0;
  }
  otherSold = parseInt(otherSold,10);

// get number of physicaly wasted pieces and convert to int number
    var otherWasted = document.getElementById("other-waste").value;
    if (otherWasted == "") {
      otherWasted = 0;
    }
    otherWasted = parseInt(otherWasted,10);

// get number of pieces accounted for (sold + waste) and convert to int number
  var otherAccFor = 0;
  otherAccFor = otherSold + otherWasted;
  otherAccFor = parseInt(otherAccFor,10);


// calculate variance between physical waste and epcs waste
  var varaincePieces = (otherAmount - otherAccFor);
  var diff = (varaincePieces/otherAccFor) * 100;
  diff = parseFloat(diff);
  diff = diff.toFixed(2);


// if var greater that 10% add danger class, otherwise add success class
  if(diff > -10 && diff < 10) {
    removeClass("other-var-proc", "bg-danger");
    addClass("other-var-proc", "bg-success");
  } else if(diff <= -10 || diff >= 10){
    removeClass("other-var-proc", "bg-sucess");
    addClass("other-var-proc", "bg-danger");
    abuse_pcs = abuse_pcs + 1;
  } else {
    removeClass("other-var-proc", "bg-danger");
    removeClass("other-var-proc", "bg-sucess");
    addClass("other-var-proc", "bg-secondary");
  }

   // alert(otherAmount + " " + otherSold  + " " + otherAccFor  + " " + otherWasted);
   // alert(diff);
   document.getElementById("other-acc-for").value = (otherAccFor);
   document.getElementById("other-var-pc").value = (varaincePieces);
   document.getElementById("other-var-proc").value = (diff + "%");

}



// check if PCS was abused. It checks number of producta above 10% VARIANCE
function checkIfAbused() {
  if(abuse_pcs >= 2) {
    pcs_check_text = "Product control system was abused. Varaince was greater than 10% for " + abuse_pcs + " products.";
    abuseClass = "alert-danger";
  } else if (abuse_pcs  == 1){
    pcs_check_text = "Variance was greater than 10% for ONE of checked products. No PCS abuse.";
    abuseClass = "alert-warning";
  } else {
    pcs_check_text = "Great PCS controls. There was not a problem with any of checked products. Well done to the team!";
    abuseClass = "alert-success";
  }
  // function returns options base on pcs check
  return {
    abText:pcs_check_text,
    abClass:abuseClass
   };
}

// remove all required classes base of return from checkIfAbused function
function removeClasses() {
  removeClass("abuse-text", "alert-danger");
  removeClass("abuse-text", "alert-success");
  removeClass("abuse-text", "alert-warning");
  removeClass("abuse-text", "d-none");
}

// function to check if pcs was abused
function calculate() {
  var pcs_check_text = "";
  var abuseClass = "bg-success";
  abuse_pcs = 0;
  calculate_chicken();
  calculate_fillet();
  calculate_mf();
  calculate_zinger();
  calculate_hw();
  calculate_other();

// use value returned by checkIfAbused function
  var isAbused = checkIfAbused();

// remove all required classes base of return from checkIfAbused function
  removeClasses();

// add all required classes base of return from checkIfAbused function
  addClass("abuse-text", "d-block");
  addClass("abuse-text", isAbused.abClass);

// apend text base of return from checkIfAbused function
  addText("abuse-text", isAbused.abText);

}
