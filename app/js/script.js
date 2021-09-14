/* On window load */
window.addEventListener('load', () => {
    // Requesting JSON data
    let requestURL = "http://127.0.0.1:5500/app/js/data.json";
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    // Reciving JSON data
    request.onload = function() {
        const data = request.response;

        // Uploading default timeframes
        populateTimeframes(data);

        // Daily event listener
        document.getElementById("daily").addEventListener("click", function() {
            populateTimeframes(data, "daily");
        }); 

        // Weekly event listener
        document.getElementById("weekly").addEventListener("click", function() {
            populateTimeframes(data, "weekly");
        } );

        // Monthly event listener
        document.getElementById("monthly").addEventListener("click", function() {
            populateTimeframes(data, "monthly");
        } );
      }

} );

/* Function to switch content based on daily, weekly or monthly selection */
function populateTimeframes(data, t = "daily") {
    for (let i = 0; i < data.length; i++) {
        
        // Writing title
        document.getElementsByClassName("frame__title")[i].textContent = data[i].title;

        // Writing current timeframe
        document.getElementsByClassName("frame__current-time")[i].textContent = data[i].timeframes[t].current;

        // Writing previous timeframe
        document.getElementsByClassName("frame__previous-time")[i].textContent = data[i].timeframes[t].previous;
    }
}