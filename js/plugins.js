/**
 * Javascript plugins for our board.
 * 
 * @author Nick Goris
 * @version $id$
 */

(function($){
	// get
	parseFlights();
	setInterval(parseFlights, 30000);
	
	function ajaxSetup() {
		$.ajaxSetup({
			cache: false
		});
	}
	
	function parseFlights() {
		// The returned data: Schiphol departures of today.
		// The kind people of Schiphol return this in JSON, so it will be easy to parse.
		var url = "departures.php";
	
		ajaxSetup();
	
		$.ajax({
			type: "GET",
			dataType: 'json',
			url: url,
			success: function(response) {
				/* JSON:
				 * "pFlightnumber":"CAI0804",
				 * "sFlightnumber":"CAI804",
				 * "prefix":"CAI",
				 * "suffix":"0804",
				 * "airport":"Antalya",
				 * "scheduled":"04:00",
				 * "status":"Departed",
				 * "carrier":"Corendon Airlines"
				 */
				var table = $('#departures > tbody:last'); // our table
				var json = response; // our response
				var time = json.time // the time of update
				var flights = json.data.flights; // all of the flights
				var j = 0; // our custom counter
				
				// create new time
				var timeSplit = time.split(':');
				var minutes = (timeSplit[1] < 30) ? "00" : "30";
				var flightTime = timeSplit[0] + ":" + minutes;
				
				for (var i = 0; i < flights.length; i += 1) {
					var flight = flights[i]; // our flight
					// check if object exists
					var row = $('#flight' + i, table);
				
					if (flight.scheduled >= flightTime) { // if it's passed, don't show it					
						if (row && row.length > 0) {
							$('td.status', row).html(flight.status);						
						} else {
							var rowClass = ($('#departures > tbody:last tr:last').hasClass('even')) ? 'odd' : 'even';
							var str = '<tr id="flight' + i + '" class="' + rowClass + '">';
	
							str += createCell('scheduled', flight.scheduled);
							str += createCell('airport', flight.airport);
							str += createCell('flightnumber', flight.prefix + ' ' + flight.suffix);
							str += createCell('carrier', flight.carrier);
							str += createCell('status', flight.status);
	
							str += '</tr>';								
							table.append(str);
							
						}
												
						j += 1; // add one
						//if (j > 20) break; // stop after a 100
					} else {
						if (row && row.length > 0) {
							row.remove();
						}	
					}			
				}
			}
		});
	}
	
	
	function createCell(name, data) {
		if (name == 'status') {
			if (data == 'Departed') {
				name += ' departed';
			}
		}
	
		return '<td class="' + name + '">' + data + '</td>';
	}



})(window.jQuery);

window.log = function(){
  log.history = log.history || []; 
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};

(function(doc){
  var write = doc.write;
  doc.write = function(q){ 
    log('document.write(): ',arguments); 
    if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);  
  };
})(document);


