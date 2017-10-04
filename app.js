function addAddress() {

	$("#new").on("click", function() {
  	var inc = $(".row_address").length + 1,
				$newAddressRow = `
        	<div id="${inc}" class="row_address" >
				  	<input type="text" name="address" placeholder="Address...">
  	        <button class="remove">X</button>
          </div>
    		`;
		
    $($newAddressRow).insertBefore($(this));
    
    var $newAddressInput = $("input[name='address']:last");
    $newAddressInput.focus();
    
    applySearchAddress($newAddressInput);
    
  });

};

function delAddress() {
	$(document).on("click", ".remove", function() {
  	$(this).closest(".row_address").remove();
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete#style_autocomplete
    // remove predictions
    $("#predictions_"+ $(this).closest("div").attr("id")).remove();
  });
};

function applySearchAddress($input) {

	if (google.maps.places.PlacesServiceStatus.OK != "OK") {
    console.warn(google.maps.places.PlacesServiceStatus)
    return false;
  }

	// https://developers.google.com/maps/documentation/javascript/geocoding#ComponentFiltering
  // country: matches a country name or a two letter ISO 3166-1 country code. Note: The API follows the ISO standard for defining countries, and the filtering works best when using the corresponding ISO code of the country.
  var options = {
    // componentRestrictions: {
    //   country: "en",
    //     types: [
    //       "address"
    //     ]
    // }
  };
  
  var autocomplete = new google.maps.places.Autocomplete($input.get(0), options);
  
  autocomplete.addListener('place_changed', function() {
    
    var place = autocomplete.getPlace();

    if (place.length == 0) {
      return;
    }

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
    $input.val(address);

  });

  // set attr id to the predictions list
  setTimeout(function() {
    var rowId = $input.closest("div").attr("id");
    $(".pac-container:last").attr("id", "predictions_"+ rowId);
  }, 100);

};

$(document).ready(function () {
  addAddress();
  delAddress();
});
