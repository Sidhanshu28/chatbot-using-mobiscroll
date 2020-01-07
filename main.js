var typing = '<img src="./ellipsis.gif" width=25px height=25px; style="background:transparent;" />';
var loadingli = "<li class='bot_text' style='display:inline-block;'>"+typing+"</li>";
var index = 1;
var globalFlagForMargin = false;
var globalStartDateForEvents ="";
var globalEndDateForEvents ="";


//on load function for date mobiscroll
 $(function () {
    // Create a datepicker
    $("#input").mobiscroll().date({ 
        theme: 'ios',
      layout:'liquid',
      display:'inline'
 });
 });


//function to show loader
var loading = function(){
  $('.texts').append(loadingli);
};

//on load function
$(document).ready(function(){
                  loading();
                  setTimeout(displayBotText,2000,"Tell us your birth date !!");
                  });

//first text from bot on load
var displayBotText = function(text){
    $('.texts li:last').remove();
  var li = "<li class='bot_text'>"+text+"</li>";
  $('.texts').append(li);
  //disabling input
  $('#input').attr('disabled',false);
};


//function to call texts from bot
var callBotTexts = function(i){
  
  //defining cases because statically giving 2 texts only (can be changed to dynamic!!)
  switch(i){
      //2nd message from bot
    case 1: 
       loading();
        setTimeout(displayBotText,2000,"select date range please ?  3 days at least ");
          globalFlagForMargin=true;
          $("#input").mobiscroll().range({ theme: 'ios',display:'inline',calendarHeight:400});
         break;
      //3rd message from bot
    case 2:
       loading();
      globalFlagForMargin=false;
      var array = randomGeneration(globalStartDateForEvents,globalEndDateForEvents);
      var labelsArray = array[0];
      var invalidArray = array[1];
      setTimeout(displayBotText,2000,"Please book your slot!");
      globalFlagForMargin=true;
       $("#input").mobiscroll().calendar({ 
        theme: 'mobiscroll',
         layout:'liquid',
         display:'inline',
         calendarHeight:370,
       max: new Date(globalEndDateForEvents),
        min: new Date(globalStartDateForEvents),
       labels: labelsArray,
       invalid: invalidArray
      });
      break;
      
      //4th message from bot
    case 3:
       loading();
      globalFlagForMargin=false;
       setTimeout(displayBotText,1000,"At what time we can call you?");
        $("#input").mobiscroll().time({ 
            theme: 'ios',
            layout:'liquid',
            display:'inline',
        });
      break;
     //5th message from bot
    case 4:
      loading();
      setTimeout(displayBotText,2000,"Great, we will reach you shortly!");
       $('#input').mobiscroll('destroy');
            $('#input').prop('readonly',false);
        $('#input').css('pointer-events','none');
      break;
  }
};

//function to send user message on click of send button
// this can be further changed to onChange with mobiscroll method.
var sendUserMessage = function(){
  
  //return if no value in input
  if($('#input').val().length==0)return;
  
  //filtering for getting formatted date
  if(index==1)type='date'
  else if(index==2)type='daterange'
  else if(index==3)type='eventsbook'
  else type='time';
  var val = formatValue($('#input').val(),type);
  var li = "<li class='user_text'>"+val+"</li>"
  $('.texts').append(li);
  // $('.chat_box').removeClass('extramargin');
  toggleClass();
  $('#input').mobiscroll('clear');
  //calling next bot text
  setTimeout(callBotTexts,1000,index);
   //disabling input
  $('#input').attr('disabled',true);
  index++;
};

//function to hide/show bottom bar
var toggleClass= function(){
  if(globalFlagForMargin){$('.chat_box').toggleClass('extramargin');}
  else $('.chat_box').removeClass('extramargin').toggleClass('closes');
};


// function to get formatter date 
  var formatValue = function (d,type) {
    if(type=='date' || type=="eventsbook"){
     var objDate = new Date(d);
    var locale = "en-us";
    var month = objDate.toLocaleString(locale, { month: "long" });
      return objDate.getDate()+" "+month+", "+objDate.getFullYear();
  }
    else if(type=='daterange'){
      var d1 = d.split('-')[0];
      var d2 = d.split('-')[1];
      var objDate1 = new Date(d1);
      var objDate2 = new Date(d2);
    var locale = "en-us";
    var month1 = objDate1.toLocaleString(locale, { month: "long" });
    var month2 = objDate2.toLocaleString(locale, { month: "long" });
      globalStartDateForEvents = d1;
      globalEndDateForEvents = d2;
      return objDate1.getDate()+" "+month1+", "+objDate1.getFullYear() + " to " + objDate2.getDate()+" "+month2+", "+objDate2.getFullYear();
    }
    else{return d;}
  };

  var randomGeneration = function(s,e){
    var rn1 = 1;
    var rn2 = 3;
    
    var start = new Date(s);
        var end = new Date(e);
       var labels = [];
       var invalids = [];
        let mil = 86400000 //24h
        var z = 0;
        for (var i=start.getTime(); i<end.getTime();i=i+mil) {
          if(z == rn1 || z == rn2){
             labels.push({d:new Date(i), text:'Booked'});
            invalids.push(new Date(i));
             }
          z++;
        }
    return [labels,invalids];
  };

