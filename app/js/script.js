/* On window load */
window.addEventListener('load', () => {
    // Requesting JSON data
    let requestURL = "https://elisa-charrier.github.io/time-tracking-dashboard/app/js/data.json";
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
        document.getElementsByClassName("card__title")[i].textContent = data[i].title;

        // Writing current timeframe
        document.getElementsByClassName("card__current-time")[i].textContent = data[i].timeframes[t].current + "hrs";

        // Writing previous timeframe
        document.getElementsByClassName("card__previous-time")[i].textContent = "Last Week - " + data[i].timeframes[t].previous + "hrs";
    }

    // Getting previous selected option and switching to the new one
    const previousT = document.getElementsByClassName("selected")[0];
    previousT.classList.remove("selected");
    document.getElementById(t).classList.add("selected");
}