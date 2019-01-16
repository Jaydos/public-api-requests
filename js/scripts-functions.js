const generateProfile = profileData => {
    gallery.innerHTML = '';
    for(let i = 0; i < profileData.length; i++){
        gallery.innerHTML += 
        `<div class="card" id="${i}">
            <div class="card-img-container">
                <img class="card-img" src="${profileData[i].picture.thumbnail}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${profileData[i].name.first} ${profileData[i].name.last}</h3>
                <p class="card-text">${profileData[i].email}</p>
                <p class="card-text cap">${profileData[i].location.city}, ${profileData[i].location.state}</p>
            </div>
        </div>`
    }
}

const addClickListeners = (profiles, data) => {
    profiles.forEach(profile => {
        profile.addEventListener('click', (e) => {
            displayModal(parseInt(e.currentTarget.id), data);
        })
    })
}

const displayModal = (clickedProfile, data) => {
    console.log(typeof clickedProfile);
    let modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';

    modalContainer.innerHTML = 
        `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data[clickedProfile].picture.thumbnail}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data[clickedProfile].name.first} ${data[clickedProfile].name.last}</h3>
                <p class="modal-text">${data[clickedProfile].email}</p>
                <p class="modal-text cap">${data[clickedProfile].location.city}</p>
                <hr>
                <p class="modal-text">${data[clickedProfile].cell}</p>
                <p class="modal-text">${data[clickedProfile].location.street}, ${data[clickedProfile].location.state}, ${data[clickedProfile].location.postcode}</p>
                <p class="modal-text">Birthday: ${data[clickedProfile].dob.date.substring(0,10)}</p>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>`
        
    document.querySelector('body').appendChild(modalContainer);

    document.querySelector('.modal-close-btn').addEventListener('click', () => {
        document.querySelector('body').removeChild(document.querySelector('.modal-container'));
    })

    let buttons = document.querySelectorAll('.modal-btn-container button');
    if(clickedProfile === 0 && data.length === 1){
        buttons[0].style.visibility = 'hidden';
        buttons[1].style.visibility = 'hidden';
    } else if (clickedProfile === 0){
        buttons[0].style.visibility = 'hidden';
        buttons[1].style.visibility = 'visible';
    } else if (clickedProfile === data.length -1){
        buttons[0].style.visibility = 'visible';
        buttons[1].style.visibility = 'hidden';
    }

    buttons.forEach(button => {
        button.addEventListener('click', e => {

            if(clickedProfile === 0 && data.length === 1){
                buttons[0].style.visibility = 'hidden';
                buttons[1].style.visibility = 'hidden';
            } else if (clickedProfile === 0){
                buttons[0].style.visibility = 'hidden';
                buttons[1].style.visibility = 'visible';
            } else if (clickedProfile === data.length -1){
                buttons[0].style.visibility = 'visible';
                buttons[1].style.visibility = 'hidden';
            }
            document.querySelector('body').removeChild(modalContainer);
            if(e.target.textContent === 'Next'){
                displayModal(clickedProfile + 1, data);
            } else if (e.target.textContent === 'Prev'){
                displayModal(clickedProfile - 1, data);
            }
        })
    })
    

}
let filteredProfiles = [];

const filterProfiles = (searchInput, data) => {
    filteredProfiles = [];

    if(document.querySelector('.modal-container')){
        document.querySelector('body').removeChild('.modal-container');
    }
       
    data.forEach(profile => {
        if (profile.name.first.includes(searchInput) || profile.name.last.includes(searchInput)){
            filteredProfiles.push(profile);
        }
    })
    generateProfile(filteredProfiles);
    addClickListeners(document.querySelectorAll('.card'), filteredProfiles);
}