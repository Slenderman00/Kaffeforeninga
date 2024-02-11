

createElement("calendar-event", (shadow, attributes) => {

    let content = `
        <link rel="stylesheet" href="/eventCalendar.css">
        <div id='event'>
            <div id='title'>
                ${attributes['title']}
            </div>
            <div id='description'>
                ${attributes['description']}
            </div>
        </div>
    `
    let _content = document.createElement('div')
    _content.innerHTML = content

    shadow.innerHTML = content
})

const eventDescRe = /[0-9]\,\"description\"\:\"(.+?)\"\,\"endTime\"/;

createElement("event-calendar", (shadow, attributes) => {
    shadow.innerHTML += '<link rel="stylesheet" href="/eventCalendar.css">'

    fetch("https://corsproxy.io/?https://www.sio.no/api/event-calendar/events")
        .then(response => response.json())
        .then(json => {
            json['items'].forEach(item => {
                if(item['organizer']['name'] == 'Kaffeforeninga') {
                //if (true) {
                    //fetch description
                    let id = item['id'];
                    let url = `https://corsproxy.io/?https://www.sio.no/eventkalender/${id}`;

                    fetch(url)
                    .then(response => response.text())
                    .then(response => {
                        let description = response.match(eventDescRe)[1];
                        description = description.replace(new RegExp("\\\\n", "g"), '<br>')
                        description = description.replace(new RegExp("\\\\t", "g"), '   ')
                        console.log(description)

                        let event = document.createElement('calendar-event')
                        event.setAttribute('title', item['title'])
                        event.setAttribute('description', description)
                        shadow.appendChild(event)
                    })
                }
            });
        })
})