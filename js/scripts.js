const gallery = document.querySelector('.gallery');

fetch('https://randomuser.me/api/?results=12&inc=name,location,email,picture,cell,dob&nat=au&')
    .then(data => data.json())
    .then(data => {
        generateProfile(data.results);
        addClickListeners(document.querySelectorAll('.card'), data.results);

        document.querySelector('form').addEventListener('submit', e => {
            e.preventDefault();
            filterProfiles(e.target.firstElementChild.value.toLowerCase(), data.results);
        })
    })
    .catch(error => console.log('looks like there was a problem', error))

document.querySelector('.search-container').innerHTML = 
    `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`





