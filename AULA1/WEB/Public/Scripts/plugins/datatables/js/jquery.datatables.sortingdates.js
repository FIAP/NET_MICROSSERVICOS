 jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"date-hour-pre": function ( a ) {
		if (a == null || a == "") {
			return 0;
		}
		var dateHour = a.split(' - ');
		var date = dateHour[0].split('/');

		var hour = dateHour[1].split(':');

		return (date[2] + date[1] + date[0] + hour[0] + hour[1]) * 1;
	},

	"date-hour-asc": function (a, b) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	},

	"date-hour-desc": function (a, b) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	}
 });

 jQuery.extend(jQuery.fn.dataTableExt.oSort, {
     "date-sort-pre": function (a) {
         if (a == null || a == "") {
             return 0;
         }

         var dateHour = a.split('/');
         return (dateHour[2] + dateHour[1] + dateHour[0]) * 1;
     },

     "date-sort-asc": function (a, b) {
         return ((a < b) ? -1 : ((a > b) ? 1 : 0));
     },

     "date-sort-desc": function (a, b) {
         return ((a < b) ? 1 : ((a > b) ? -1 : 0));
     }
 });