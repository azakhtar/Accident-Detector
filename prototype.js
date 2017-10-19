var systemPower = 0;
var currentEventId = "startPoint"; /* Represents the id of the div where pikachu is present in real time */

/* This function controls the ENABLE/DISABLE switch 
*/
function pbsPower(){
   /* systemPower is tracker that incremented every time power button is clicked
      when systemPower ODD  : PBS ENABLED
      when systemPower EVEN : PBS DISABLED */
   systemPower += 1;
   
   /* When enabled do the following actions */
   if (systemPower%2 == 1){
      /* Display the text below and turn the power button GREEN */
      document.getElementById("systemState").innerHTML = "Pedestrian Backup System ENABLED";
      document.getElementById("powerButton").style.backgroundColor= "green";
      resetZones();
      
      /* Change the div color to red if pikachu is present in that div except for the start point */
      if (currentEventId != "startPoint"){
        document.getElementById(currentEventId).style.backgroundColor= "red"; 
      }
      
      /* Depending on where pikachu is present, the LED Bar, Buzzer and Brakes are updated*/
      updateLEDsAndBuzzer(currentEventId);
      updateBrakes(currentEventId);
   }
   /* When disabled do the following actions */
   else{
       /* Display the text below and turn the power button RED */
       document.getElementById("systemState").innerHTML = "Pedestrian Backup System DISABLED";
       document.getElementById("powerButton").style.backgroundColor= "red";
       
       /* Reset all detection zones and LED Bar, Buzzer, Brakes to original colors */
       resetZonesToOriginal();
       updateLEDsAndBuzzer("");
       updateBrakes("");
   }   
}

/* Enables dropping the pikachu. 
*/
function allowDrop(ev) {
    ev.preventDefault();
}

/* Allows dragging the Pikachu. 
*/
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

/* Allows actually dropping the Pikachu in a box and detects the appropriate
   zone where pikachu is dropped. 
*/
function drop(ev) {
    
    /* Allow the pikachu to drop in the zone */
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    currentEventId = ev.target.id;
    
    /* Reset all the zone colors and detect the zone where pikachu is present by
       by changing its color to red. After detecting where pikachu is present, 
       update the LED Bar, Buzzer and Brakes accordingly. */
    if (systemPower%2 == 1){
        resetZones();
        if (currentEventId != "startPoint"){
            document.getElementById(currentEventId).style.backgroundColor= "red";
        }
        updateLEDsAndBuzzer(currentEventId);
        updateBrakes(currentEventId);
    }
}

/* Function only called when PBS is enabled. It sets all zone colors to light 
   blue/green that shows the PBS is engaged.
   NOTE: Look at HTML syntax to see mapping of zones with zone IDs
*/
function resetZones(){
    document.getElementById("greenZone1").style.backgroundColor= "#AED6F1";
    document.getElementById("greenZone2").style.backgroundColor= "#AED6F1";
    document.getElementById("greenZone3").style.backgroundColor= "#AED6F1";
    document.getElementById("warningZone1").style.backgroundColor= "#AED6F1";
    document.getElementById("warningZone2").style.backgroundColor= "#AED6F1";
    document.getElementById("warningZone3").style.backgroundColor= "#AED6F1";
    document.getElementById("criticalZone1").style.backgroundColor= "#AED6F1";
    document.getElementById("criticalZone2").style.backgroundColor= "#AED6F1";
    document.getElementById("criticalZone3").style.backgroundColor= "#AED6F1";
}

/* LED Bar color and buzzer is updated per the zones detected 
*/
function updateLEDsAndBuzzer(eventId){
    if (eventId == "greenZone1" || eventId == "greenZone2" || eventId == "greenZone3"){
        document.getElementById("ledBar").style.backgroundColor= "yellow";
        document.getElementById("buzzer").style.backgroundColor= "#778899";
    }
    else if (eventId == "warningZone1" || eventId == "warningZone2" || eventId == "warningZone3"){
        document.getElementById("ledBar").style.backgroundColor= "yellow";
        document.getElementById("buzzer").style.backgroundColor= "red";
    }
    else if (eventId == "criticalZone1" || eventId == "criticalZone2" || eventId == "criticalZone3"){
        document.getElementById("ledBar").style.backgroundColor= "red";
        document.getElementById("buzzer").style.backgroundColor= "red";
    }
    else{
        document.getElementById("ledBar").style.backgroundColor= "#778899";
        document.getElementById("buzzer").style.backgroundColor= "#778899";
    }
}

/* Brakes applied if object detected in critical zone 
*/
function updateBrakes(eventId){
    if (eventId == "criticalZone2"){
        document.getElementById("brakes").style.backgroundColor= "red";
    }
    else{
        document.getElementById("brakes").style.backgroundColor= "#778899";
    }
}

/* Only called when PBD Disabled and it resets all detection zones 
   to white color that shows the system is not engaged.
   NOTE: Look at HTML syntax to see mapping of zones with zone IDs
*/
function resetZonesToOriginal(){
    document.getElementById("criticalZone1").style.backgroundColor= "white";
    document.getElementById("criticalZone2").style.backgroundColor= "white";
    document.getElementById("criticalZone3").style.backgroundColor= "white";
    document.getElementById("warningZone1").style.backgroundColor= "white";
    document.getElementById("warningZone2").style.backgroundColor= "white";
    document.getElementById("warningZone3").style.backgroundColor= "white"; 
    document.getElementById("greenZone1").style.backgroundColor= "white";
    document.getElementById("greenZone2").style.backgroundColor= "white";
    document.getElementById("greenZone3").style.backgroundColor= "white";     
}