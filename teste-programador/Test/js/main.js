var btn_search = document.getElementById('buscar');
var input_search = document.getElementById('input_search');
var json = {};
var videoId = 'OkzaTmH8tj8';


btn_search.addEventListener('click',search_item);

function search_item(event){
	get_list_elements_by_api(input_search.value)
}


function get_list_elements_by_api(param){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      document.getElementById("demo").innerHTML = "";
	      json = JSON.parse(this.responseText);

	      for(var i in json["items"]){
	      	var htm_list_videos = '<div class="row list_video_row"><div class="col-lg-4 col-md-6 col-sm-6 col-xs-6 col_thumb"><img src="'
	      	+json["items"][i]["snippet"].thumbnails.default.url+'" width="'+json["items"][i]["snippet"].thumbnails.default.width+'" height="'
	      	+json["items"][i]["snippet"].thumbnails.default.height+'" id="'+json["items"][i]["id"].videoId+'" class="thumbnail"/></div>'
	      	+'<div class="col-lg-8 col-md-6 col-sm-6 col-xs-6  col_description"><p class="description_list">'
	      	+json["items"][i]["snippet"].description+'</p></div></div>';
	      	$("#demo").append(htm_list_videos)
	      	$('#'+json["items"][i]["id"].videoId).click(function(){
	      		get_list_element_by_api($(this).attr('id'));
	      	})

	      }
	      $("#demo").find('.list_video_row').each(function(){
	      		$(this).fadeIn('slow');
	      });
	      console.log(json)
	      
	    }
	};
	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?part=id,snippet&q={"+param+"}&key=AIzaSyBOL2qGjsW5T3z5wlVBZzwxvVAHQa6C-rk", true);
	xhttp.send();

}

function get_list_element_by_api(param){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      
	      if($('#container_player').find('div#player').length == 0){
	      	document.getElementById("container_player").innerHTML = '<div id="player"></div>'
	      	+'<div class="row"><button class="button_Orange" id="back_btn"><div class="arrow">&#10148;</div> Voltar</button>'
	      	+'</div><div id="description_video"></div>';
	      } 


	      $('#back_btn').click(function(){
				$('#container_player').css('display','none');
				$('#row_list').css('display','block');
		  })


	      $('#container_player').css('display','block');
		  $('#row_list').css('display','none');

	      json = JSON.parse(this.responseText);
	      document.getElementById("description_video").innerHTML = '<p>'+json["items"][0]["snippet"].description+'</p>';

		  var tag = document.createElement('script');

		  tag.src = "https://www.youtube.com/iframe_api";
		  var firstScriptTag = document.getElementsByTagName('script')[0];
		  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		  var player;
		  function loadPlayer() { 
			  if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {

			    var tag = document.createElement('script');
			    tag.src = "https://www.youtube.com/iframe_api";
			    var firstScriptTag = document.getElementsByTagName('script')[0];
			    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			    window.onYouTubePlayerAPIReady = function() {
			      onYouTubeIframeAPIReady(json["items"][0]["id"]);
			    };

			  } else {

			    onYouTubeIframeAPIReady(json["items"][0]["id"]);

			  }
		  }
		  function onYouTubeIframeAPIReady(param) {
		  	player = new YT.Player('player', {
		  	  height: '360',
		  	  width: '640',
		  	  videoId: param
		  	});
		  	

		  }

		  

		  // 4. The API will call this function when the video player is ready.
		  function onPlayerReady(event) {
		  	event.target.playVideo();
		  }

		  // 5. The API calls this function when the player's state changes.
		  //    The function indicates that when playing a video (state=1),
		  //    the player should play for six seconds and then stop.
		  var done = false;
		  function onPlayerStateChange(event) {
		  	if (event.data == YT.PlayerState.PLAYING && !done) {
		   	  setTimeout(stopVideo, 6000);
		  	  done = true;
		  	}
		  }
		  function stopVideo() {
		  	player.stopVideo();
		  }


		  loadPlayer();

	    }
	};

	xhttp.open("GET", "https://www.googleapis.com/youtube/v3/videos?id="+param+"&part=snippet,statistics&key=AIzaSyBOL2qGjsW5T3z5wlVBZzwxvVAHQa6C-rk", true);
	xhttp.send();

}



