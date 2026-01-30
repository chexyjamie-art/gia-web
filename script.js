function voiceSearch() {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    recognition.onresult = function(event) {
      document.querySelector(".search-container input").value =
        event.results[0][0].transcript;
    };
  } else {
    alert("Voice search not supported in this browser");
  }
}