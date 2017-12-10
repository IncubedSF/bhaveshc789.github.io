function initMap() {
        var uluru = {lat: 37.726512, lng: -122.482087};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          zoomControl: false,
          scaleControl: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          disableDefaultUI : true,
          center: uluru,
          styles: [{"featureType":"all","elementType":"geometry","stylers":[{"color":"#3f3746"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"gamma":0.01},{"lightness":20}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"saturation":-31},{"lightness":-33},{"weight":2},{"gamma":0.8}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":30},{"saturation":30}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"lightness":"-10"},{"saturation":"-72"},{"color":"#3f3746"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"lightness":"-66"},{"saturation":"41"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"saturation":20}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"lightness":20},{"saturation":-20}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"lightness":"-47"},{"color":"#201c23"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":10},{"saturation":-30}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"lightness":"6"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"saturation":25},{"lightness":25}]},{"featureType":"water","elementType":"all","stylers":[{"lightness":-20}]}]
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
