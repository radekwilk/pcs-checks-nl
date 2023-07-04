//TIMERS APP CONTROLER
var timerController = (function () {

  var TimeStart = function (id, timeStart, timeStartCalc, timePaid, timePaidCalc, timeStop, timeStopCalc) {
    this.id = id;
    this.timeStart = timeStart;
    this.timeStartCalc = timeStartCalc;
    this.timePaid = timePaid;
    this.timePaidCalc = timePaidCalc;
    this.timeStop = timeStop;
    this.timeStopCalc = timeStopCalc;
    this.OTDTime = -1;
    this.serviceTime = -1;
  };

  // TimeStart.prototype.calcServiceTimes = function () {

  //   if (this.timeStartCalc > 0) {
  //     this.timePaid = Date.parse(moment().format());
  //     this.timePaidCalc = moment(this.timePaid).format('hh:mm:ss');
  //   } else {
  //     this.OTDTime = -1;
  //     this.serviceTime = -1;
  //   }

  // };

  // TimeStart.prototype.getCalculatedServiceTimes = function () {
  //   return this.timePaid, this.timePaidCalc;
  // };

  var calculateTotal = function (type) {
    var sumTotStart = 0;
    var sumTotOTD = 0;
    var sumTotService = 0;
    var numOfCust = 0;

    data.serviceTimes[type].forEach(function (cur) {
      
      if(cur.timeStopCalc > 0) {
        sumTotStart = sumTotStart + cur.timeStartCalc;
        sumTotOTD = sumTotOTD + cur.timePaidCalc;
        sumTotService = sumTotService + cur.timeStopCalc;
        numOfCust++;
      }

    });
    data.totals.totalStartTime = sumTotStart;
    data.totals.totalOTDTime = sumTotOTD;
    data.totals.totalServiceTime = sumTotService;
    data.totals.totalCustomers = numOfCust;
    // data.totals.totalCustomers = data.serviceTimes[type].length;
  };

  var data = {
    serviceTimes: {
      kfc: [],
      kfc__DT: []
      // startQ: [],
      // finishPay: [],
      // receivedFood: [],
      // isActive: fasle/true
    },
    totals: {
      totalCustomers: 0,
      totalStartTime: 0,
      totalOTDTime: 0, // Order to Delivery service time
      totalServiceTime: 0 // total service time, from the time of tcustomer joining the queue
    },
    averageOTD: 0,
    averageService: 0
  };

  return {
    addNewCustomer: function (type, timeStr, timeStartCalc, timePaid, timePaidCalc, timeStop, timeStopCalc) {
      var newCustomer, ID;
      ID = 0;
      //create new customer based on time check type (i.e kfc)
      if (data.serviceTimes[type].length > 0) {
        ID = data.serviceTimes[type][data.serviceTimes[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === 'kfc') { // this can be updated later for other time check. i.e BK or PH
        newCustomer = new TimeStart(ID, timeStr, timeStartCalc, timePaid, timePaidCalc, timeStop, timeStopCalc);
      }
      //push it into data structure
      data.serviceTimes[type].push(newCustomer);

      //return new element
      return newCustomer;
    },

    deleteItem: function (type, id) {
      var ids, index;

      ids = data.serviceTimes[type].map(function (current) {
        return current.id;
      });

      index = ids.indexOf(id);

      if (index !== -1) {
        data.serviceTimes[type].splice(index, 1);
      }

    },

    calculateTotalTime: function () {
      var OTDTime, startTime, serviceTime, finishTime,custNum;

      //calculate sum of total service time
      calculateTotal('kfc');
      // calculate the time variance between trans start and finish

      custNum = data.totals.totalCustomers;
      startTime = data.totals.totalStartTime;
      OTDTime = data.totals.totalOTDTime;
      serviceTime = data.totals.totalServiceTime;

      if (custNum > 0) {
        data.averageOTD = (serviceTime - OTDTime) / custNum;
        data.averageService = (serviceTime - startTime) / custNum;
      } else {
        data.averageOTD = 0;
        data.averageService = 0;
      }

      return {
        avgOTD: data.averageOTD,
        avgService: data.averageService,
        custNum: data.totals.totalCustomers
      }
    },

    calculateOTDandServiceTime: function (type, id) {
      var ids, index, newTime;

      ids = data.serviceTimes[type].map(function (current) {
        return current.id;
      });

      index = ids.indexOf(id);
      newTime = Date.parse(moment().format());

      if (index !== -1) {
        data.serviceTimes[type][index].timePaidCalc = newTime;
        data.serviceTimes[type][index].timePaid = moment(newTime).format('hh:mm:ss');
      }

    },

    calculateFinishAndServiceTime: function (type, id) {
      var ids, index, newTime, newOTD, newTotalService, stopTime, paidTime, startTime;

      ids = data.serviceTimes[type].map(function (current) {
        return current.id;
      });

      index = ids.indexOf(id);
      newTime = Date.parse(moment().format());

      if (index !== -1) {
        data.serviceTimes[type][index].timeStopCalc = newTime;
        data.serviceTimes[type][index].timeStop = moment(newTime).format('hh:mm:ss');

        stopTime = data.serviceTimes[type][index].timeStopCalc;
        paidTime = data.serviceTimes[type][index].timePaidCalc;
        startTime = data.serviceTimes[type][index].timeStartCalc;

        newOTD = stopTime - paidTime;
        newTotalService = stopTime - startTime;

        data.serviceTimes[type][index].OTDTime = newOTD;
        data.serviceTimes[type][index].serviceTime = newTotalService;

      }

    },

    getServiceTimes: function (type, id) {
      var ids, index, checkPaidTime, checkFinishTime;

      ids = data.serviceTimes[type].map(function (current) {
        return current.id;
      });

      index = ids.indexOf(id);

        checkPaidTime = data.serviceTimes[type][index].timePaidCalc;
        checkFinishTime = data.serviceTimes[type][index].timeStopCalc;

      if(checkPaidTime === 0) {
        timePaid = 0;
      } else {
        console.log(checkPaidTime + ' - this is paid time');
      }
      
      return {
        serviceTime: data.serviceTimes[type][index].serviceTime,
        OTDTime: data.serviceTimes[type][index].OTDTime,
        startTime: data.totals.totalStartTime,
        averageOTD: data.averageOTD,
        averageService: data.averageService,
        customers: data.totals.totalCustomers,
        paidTime: data.serviceTimes[type][index].timePaid,
        paidTimeCalc: data.serviceTimes[type][index].timePaidCalc,
        finishTime: data.serviceTimes[type][index].timeStop,
        finishTimeCalc: data.serviceTimes[type][index].timeStopCalc,
        custID: id
      };
    },

    testing: function () {
      console.log(data);
    }
  };


})();

// User Interface controller
var UIController = (function () {
  var DOMStrings = {
    startBtn: 'start',
    totalTime: 'total__time',
    kfcTimeTableContainer: '.kfc__timesList',
    description: "description",
    serviceTime: 'serviceTime',
    totalServiceTime: 'totalServiceTime',
    kfcTimesList: '.kfc__timesList',
    paidTime: 'paid__time',
    paidTimeIcon: 'paid',
    finishTime: 'stop__time',
    finishTimeIcon: 'stop',
    otdTime: 'otd__time',
    totalTime: 'total__time',
    timerServiceTime: 'timer__serviceTime',
    timerTotalTime: 'timer__totalTime',
    totalCustomers: 'totalCustomers'
  };

  var kfcServiceTimes = {
    OTD_Time: 60000, //time in miliseconds = 60 seconds
    Total_time: 300000 //time in miliseconds = 300 (5 minutes) seconds
    };


  return {
    getNewCustomer: function () {
      return {
        timeCheckType: 'kfc',
        timeStartCalc: Date.parse(moment().format()),
        timeStart: moment(this.timeStartCalc).format('hh:mm:ss'),
        timePaidCalc: 0,
        timePaid: 0,
        timeStopCalc: 0,
        timeStop: 0
      }

    },

    addNewCustomerLine: function (obj, type) {
      var html, newHtml, element, elementID;
      //Create HTML string with placeholder text

      if (type === 'kfc') {
        element = DOMStrings.kfcTimeTableContainer;
        elementID = obj.id; // to be able to start new stopwatch
        html = '<div class="row py-1 mb-0 info-container times-container" id="kfc-%id%"><div class="col-3 text-center align-content-center"><input type="text"';
        html = html + ' class="form-control timer description" placeholder="Customer description" id="description%id%"></div><div class="col-6"><div class="d-flex justify-content-between"><div class="col-2 text-center">';
        html = html + '<p class="form-control timer active" id="start__time%id%">%timeStart%</p></div><div class="col-2 text-center"><p class="form-control timer" id="paid__time%id%">Time paid</p></div><div class="col-2 text-center"><p class="form-control timer" id="stop__time%id%">Time stop</p></div><div class="col-2 text-center"><p class="form-control timer" id="otd__time%id%">OTD time</p></div><div class="col-2 text-center"><p class="form-control timer" id="total__time%id%">Total time</p></div></div ></div><div class="col-3 text-center"><div class="d-flex justify-content-around"><div class="editBox" id="paid-%id%"><i class="fas fa-hand-holding-usd"></i></div>';
        html = html + '<div class="editBox icon-disabled" id="stop-%id%"><i class="fas fa-utensils" ></i></div><div class="editBox" id="trash-%id%"><i class="fas fa-trash-alt"></i></div></div></div></div>';
      }

      //Replace the placeholder text with some actual data

      newHtml = html.replace(/%id%/g, obj.id); //it finds all IDs and then  replaces it with current ID.
      newHtml = newHtml.replace('%timeStart%', obj.timeStart);

      //Insert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

      return elementID;
    },

    deleteTimesItem: function (selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    focusOnNewFild: function (fieldID) {
      var fields;

      fields = document.getElementById(DOMStrings.description + fieldID);
      fields.focus();
    },

    convertToTime: function (timeVal) {
      var hours;
      var minutes;
      var seconds;
      var milliseconds;

      // var days = Math.floor(difference / (1000 * 60 * 60 * 24));
      hours = Math.floor((timeVal % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((timeVal % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeVal % (1000 * 60)) / 1000);
      milliseconds = Math.floor((timeVal % (1000 * 60)) / 100);

      return {
        hours: (hours < 10) ? "0" + hours : hours,
        minutes: (minutes < 10) ? "0" + minutes : minutes,
        seconds: (seconds < 10) ? "0" + seconds : seconds
      }

    },

    changeBackground_onTarget: function(bgdID) {
      document.getElementById(bgdID).classList.remove('timeOverTarget');
      document.getElementById(bgdID).classList.add('timeOnTarget');
    },

    changeBackground_offTarget: function(bgdID) {
      document.getElementById(bgdID).classList.remove('timeOnTarget');
      document.getElementById(bgdID).classList.add('timeOverTarget');
    },



    timeCompleted: function(bgdID) {
      bgdID.classList.add('timeChecked');
    },

    dispalyTimesUI: function(obj) {
      var finalOTD, finalServiceTime, elOTD, elService, totCustomers;

      elOTD = DOMStrings.serviceTime;
      elService = DOMStrings.totalServiceTime;

      finalOTD = this.convertToTime(obj.avgOTD).minutes + ':' + this.convertToTime(obj.avgOTD).seconds;
      document.getElementById(DOMStrings.serviceTime).textContent = finalOTD;
      
      finalServiceTime = this.convertToTime(obj.avgService).minutes + ':' + this.convertToTime(obj.avgService).seconds;
      document.getElementById(DOMStrings.totalServiceTime).textContent = finalServiceTime;

      totCustomers = obj.custNum;
      document.getElementById(DOMStrings.totalCustomers).textContent = totCustomers;
    },


    displayServiceTimes: function (obj) {
      var elementID, elementOTD, elementTotalTime, calcOTD, calcTotServTime, avgOTD, avgService, paidTime, paidTimeCalc, finishTime, finishTimeCalc, custID;

      paidTimeCalc = obj.paidTimeCalc;
      paidTime = obj.paidTime;
      finishTimeCalc = obj.finishTimeCalc;
      finishTime = obj.finishTime;
      custID = obj.custID;

      avgOTD = this.convertToTime(obj.averageOTD).minutes + ':' + this.convertToTime(obj.averageOTD).seconds;

      avgService = this.convertToTime(obj.averageService).minutes + ':' + this.convertToTime(obj.averageService).seconds;

      

      if (avgOTD) {
        document.getElementById(DOMStrings.serviceTime).textContent = avgOTD;
        elementOTD = DOMStrings.timerServiceTime;
          if(obj.averageOTD > kfcServiceTimes.OTD_Time) {
            this.changeBackground_offTarget(elementOTD);
          } else {
            this.changeBackground_onTarget(elementOTD);
          }
      } else {
        document.getElementById(DOMStrings.serviceTime).textContent = '---';
        this.changeBackground_onTarget(elementOTD);
      }

      if (avgService) {
        document.getElementById(DOMStrings.totalServiceTime).textContent = avgService;
        elementOTD = DOMStrings.timerTotalTime;
        if(obj.averageService > kfcServiceTimes.Total_time) {
          this.changeBackground_offTarget(elementOTD);
        } else {
          this.changeBackground_onTarget(elementOTD);
        }
      } else {
        document.getElementById(DOMStrings.totalServiceTime).textContent = '---';
        this.changeBackground_onTarget(elementOTD);
      }

      if (paidTimeCalc) {
        elementID = document.getElementById(DOMStrings.paidTime + custID);
        elementID.textContent = paidTime;
        this.timeCompleted(elementID);
      } 

      if (finishTimeCalc) {
        elementID = document.getElementById(DOMStrings.finishTime + custID);
        elementID.textContent = finishTime;
        this.timeCompleted(elementID);

        calcOTD = this.convertToTime(obj.OTDTime).minutes + ':' + this.convertToTime(obj.OTDTime).seconds;
        calcTotServTime = this.convertToTime(obj.serviceTime).minutes + ':' + this.convertToTime(obj.serviceTime).seconds;

        elementOTD = DOMStrings.otdTime + custID;
        elementTotalTime = DOMStrings.totalTime + custID;

        document.getElementById(elementOTD).textContent = calcOTD;
        document.getElementById(elementTotalTime).textContent = calcTotServTime;

        if(obj.OTDTime > kfcServiceTimes.OTD_Time) {

          this.changeBackground_offTarget(elementOTD);
        
        } else {
          
          this.changeBackground_onTarget(elementOTD);
        }


        if(obj.serviceTime > kfcServiceTimes.Total_time) {
          this.changeBackground_offTarget(elementTotalTime);
        } else {
          this.changeBackground_onTarget(elementTotalTime);
          
        }

      } 

    },
    
    getDOMStrings: function () {
      return DOMStrings;
    }

  };

})();


// Global APP controller
var controller = (function (timeCtrl, UICtrl) {
  var DOM = UICtrl.getDOMStrings();


  var setupEventListeners = function () {

    document.getElementById(DOM.startBtn).addEventListener('click', ctrlNewCustomer);

    document.addEventListener('keypress', function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlNewCustomer();
      }
    });

    document.querySelector(DOM.kfcTimesList).addEventListener('click', ctrlDeleteCustomer);
  };

  var updateServiceTimes = function (id) {
    var clickedBtn = id;

    // Return the service times
    var serviceTimes = timeCtrl.getServiceTimes('kfc', clickedBtn);
    // Display the budget on the UI
    UICtrl.displayServiceTimes(serviceTimes);
    console.log(serviceTimes);
    
  };

   var newPaidTime = function (btnID) {

    // Upadate the date structure
        timeCtrl.calculateOTDandServiceTime('kfc', btnID);
    //Display paid time in UI

  };

  var newFinishTime = function (btnID) {

    // Upadate the date structure
     timeCtrl.calculateFinishAndServiceTime('kfc', btnID);
     var myTimes = timeCtrl.calculateTotalTime();
    //Display paid time in UI
     UICtrl.dispalyTimesUI(myTimes);
  };

  var ctrlNewCustomer = function () {
    var startNewCustomer, newCustomer;

    // 1. Get the cureent time
    startNewCustomer = UICtrl.getNewCustomer();

    // 2. Add the start time to the timer controller
    newCustomer = timeCtrl.addNewCustomer(startNewCustomer.timeCheckType, startNewCustomer.timeStart, startNewCustomer.timeStartCalc, startNewCustomer.timePaid, startNewCustomer.timePaidCalc, startNewCustomer.timeStop, startNewCustomer.timeStopCalc);

    // 3. Add the time to UI
    newLine = UICtrl.addNewCustomerLine(newCustomer, startNewCustomer.timeCheckType);

    // 4. Focus on customer description in new field
    UICtrl.focusOnNewFild(newLine);

    // 5. Start the stopwatch in the UI

    // 6. Calculate and update the average times

    // updateServiceTimes(newCustomer);
    updateServiceTimes(newLine);
    
  };

  var ctrlDeleteCustomer = function (event) {
    var element, itemID, buttonID, splitButtonID, buttonType, toDelate, splitToDelete, toDeleteRow, toDeleteID;

    itemID = event.target.parentNode.id;
    console.log(itemID);

    if (itemID) {
      splitButtonID = itemID.split('-');
      buttonType = splitButtonID[0];
      buttonID = parseInt(splitButtonID[1]);

      if (buttonType === 'paid') {

        newPaidTime(buttonID);
        updateServiceTimes(buttonID);
        element = DOM.finishTimeIcon + '-' + buttonID;
        document.getElementById(element).classList.remove('icon-disabled');

        console.log('Customer paid ' + element);
      } else if (buttonType === 'stop') {

        newFinishTime(buttonID);
        updateServiceTimes(buttonID);
        element = DOM.paidTimeIcon + '-' + buttonID;
        document.getElementById(element).classList.add('icon-disabled');

        console.log('Customer got food');
      } else if (buttonType === 'trash') {
        toDelete = event.target.parentNode.parentNode.parentNode.parentNode.id; // parent item if we need delete a row
        splitToDelete = toDelete.split('-');
        toDeleteRow = splitToDelete[0];
        toDeleteID = parseInt(splitToDelete[1]);
        timeCtrl.deleteItem(toDeleteRow, toDeleteID);
        UICtrl.deleteTimesItem(toDelete);
        // ********************* to wstawilem on 21/02 => te dwie line. Ciagle nie dziala usuwanie srednich
        var myTimes = timeCtrl.calculateTotalTime();
         UICtrl.dispalyTimesUI(myTimes);
        //  ******************************
        

        if(myTimes.custNum > 0) {
          console.log('Clicked delate. Button number clicked: ' + buttonID);
            updateServiceTimes(0);
        } else {
          
        }
      }

      //1. delte the item from the data structure

      //2. delete the item from the UI

      //3. Update and display new times 

    }
  };

  return {
    init: function () {
      console.log('Application has started.');
      UICtrl.displayServiceTimes({
        // serviceTime: 0,
        // average: 0,
        // customers: 0

      paidTimeCalc: 0,
      paidTime: 0,
      finishTimeCalc: 0,
      finishTime: 0,
      custID: 0,
      avgOTD: 0,
      avgService: 0

      });
      setupEventListeners();
    }
  };


})(timerController, UIController);

controller.init();