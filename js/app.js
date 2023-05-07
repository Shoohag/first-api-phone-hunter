const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // try{
        const res = await fetch(url);
        const data = await res.json();
        displayPhones(data.data, dataLimit);
    // }
    // catch(error){
    //     console.log(error);
    // }
};

const displayPhones = (phones, dataLimit) =>{
    // console.log(phones);
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerText = '';
    // show 5 data only 
    const showAll = document.getElementById('show-all');
    if(  phones.length > 5){
        phones = phones.slice(0, 5);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none');
    }
    // no phone found
    const noPhones = document.getElementById('no-found-massage');
    if(dataLimit && phones.length === 0){
        noPhones.classList.remove('d-none')
    }
    else{
        noPhones.classList.add('d-none')
    }
    

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                      <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                    </div>
                  </div>
        `;
        phonesContainer.appendChild(phoneDiv);
        // console.log(phone);
    });
    toggleSpinner(false)
}

    const processSearch = (dataLimit) =>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field').value;
    const searchText = searchField;
    loadPhones(searchText, dataLimit)
    }

    
    document.getElementById('btn-search').addEventListener('click', function(){
        processSearch(5);
    })

    
    document.getElementById('search-field').addEventListener('keypress', function(e){
        if(e.key==='Enter'){
            processSearch();
        }
    })


// loader
    const toggleSpinner = isLoading =>{
        const loaderSection = document.getElementById('loader');
        if(isLoading){
            loaderSection.classList.remove('d-none');
        }
        else{
            loaderSection.classList.add('d-none')
        }
    }

    document.getElementById('btn-show-all').addEventListener('click', function(){
        processSearch();
        console.log('clicked')
    })


    const loadPhoneDetails = id =>{
        const url = `https://openapi.programming-hero.com/api/phone/${id}`
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
    }


    const displayPhoneDetails = phone =>{
        console.log(phone);
        const modalTitle = document.getElementById('phoneDetailsModalLabel');
        modalTitle.innerText = phone.name;
        const phoneDetails = document.getElementById('phone-details');
        phoneDetails.innerHTML = `
        

        
            <div class="card text-bg-light shadow p-3 mb-5" style="width: 18rem;">

            <p>Release Date:${phone.releaseDate ? phone.releaseDate: 'No Release Date'}</p>
            <p>Others:${phone.others? phone.others.Bluetooth: 'No Bluetooth'}</p>
            <p>mainFeatures
            :${phone.mainFeatures
                ? phone.mainFeatures
                .storage: 'No storage'}</p>
    
            <p>mainFeatures
            :${phone.mainFeatures
                ? phone.mainFeatures
                .sensors[0]: 'No sensors'}</p>

            <img src="${phone.image ? phone.image: 'no image'}" class="card-img-top" alt="...">
          </div>
        `
    }

loadPhones('iphone');


