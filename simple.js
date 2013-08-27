var cast_api, cv_activity;

if (window.cast && cast.isAvailable) {
  // Cast is known to be available
  initializeApi();
} else {
    // Wait for API to post a message to us
  window.addEventListener("message", function(event) {
      if (event.source == window && event.data &&
          event.data.source == "CastApi" &&
          event.data.event == "Hello")
      initializeApi();
  });

  // Device discovery
  initializeApi = function() {
    cast_api = new cast.Api();
    cast_api.addReceiverListener("YouTube", onReceiverList);
  };

  onReceiverList = function(list) {
    doLaunch(list[0]);
    // If the list is non-empty, show a widget with
    // the friendly names of receivers.
    // When a receiver is picked, invoke doLaunch with the receiver.
  };

  // Activity Launch
  doLaunch = function(receiver) {
    var request = new cast.LaunchRequest("YouTube", receiver);
    request.parameters = "v=w2itwFJCgFQ";
    request.description = new cast.LaunchDescription();
    request.description.text = "My Cat Video";
    request.description.url = "...";
    cast_api.launch(request, onLaunch);
  };

  // Activity status
  onLaunch = function(activity) {
    if (activity.status == "running") {
      cv_activity = activity;
      // update UI to reflect that the receiver has received the
      // launch command and should start video playback.
    } else if (activity.status == "error") {
      cv_activity = null;
    }
  }
};