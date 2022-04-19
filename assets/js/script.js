document.getElementById("search-btn").addEventListener("click",()=>{
    const searchText = document.getElementById("search-text").value;
    document.getElementById("search-text").value = "";
    if(searchText.length>0){
        document.getElementById("error").style.display="none";
        searchMobile(searchText)
    }else{
        document.getElementById("error").style.display="block";
    }
});

//search mobile
const searchMobile = (searchText) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(result=> result.json())
    .then(data=>{
        showData(data)
    })
};

//show searching data
const showData = (data) => {
    if(!data.status){
        document.getElementById("display-result").innerHTML="";
        document.getElementById("mobile-not-found").style.display="block";
        document.getElementById("text").style.display = "none";
    } else{
        document.getElementById("text").style.display = "none";
        document.getElementById("mobile-not-found").style.display="none";
        const displayData = document.getElementById("display-result");
        displayData.innerHTML="";     
        data.data.slice(0,20).map(mobile=>{
            const div = document.createElement("div");
            div.classList = "col col-md-4";
            div.innerHTML = `
                <div class="card text-center">
                    <div class="mt-2"><img src="${mobile.image}" class="card-img-top" alt="${mobile.phone_name}"></div>
                    <div class="card-body">
                        <h5 class="card-title">${mobile.brand}</h5>
                        <p class="card-text">${mobile.phone_name}</p>
                        <button class="btn btn-primary" onclick="moreInfo('${mobile.slug}')" data-bs-toggle="modal" data-bs-target="#MobileModal">Details >></button>
                    </div>
                </div>
            `;
            displayData.appendChild(div);
        });
    }
};

const moreInfo = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(result => displayMobile(result))
};

//display single mobile info
const displayMobile = (mobile) =>{
    if(!mobile.status){
        console.log("no data found");
    } else {
        const displayMobile = document.getElementById("display-mobile");
        const {storage, displaySize, chipSet, memory, sensors} = mobile.data.mainFeatures; 
        displayMobile.innerHTML = `
            <div class="modal-header text-center">
                <h5 class="modal-title" id="mobileModalLabel">${mobile.data.name}</h5>
            </div>
            <div class="modal-body text-center" id="modal-body">
                <div><img src="${mobile.data.image}" alt="${mobile.data.name}"/></div>
                <p>Releasing: ${mobile.data.releaseDate? mobile.data.releaseDate : "Release Date Not Found"}</p>
                <div class="features">
                    <h4>Features:</h4>
                    <div class="d-flex flex-column align-items-start border rounded border-secondary ps-2">
                        <p>Memory: ${memory}</p>
                        <p>Display: ${displaySize}</p>
                        <p>Storage: ${storage}</p>
                        <p>Chipset: ${chipSet}</p>
                    </div>
                </div>
            </div>
            <ol id="sensor">
            <h4 class="text-center">Sensors:</h4>
            </ol>
            <div>
            <h4 class="text-center">Others:</h4>
                <ol>
                    <li>Wlan: ${mobile.data.others.WLAN}</li>
                    <li>Bluethooth: ${mobile.data.others.Bluetooth}</li>
                    <li>GPS: ${mobile.data.others.GPS}</li>
                    <li>NFC: ${mobile.data.others.NFC}</li>
                    <li>Radio: ${mobile.data.others.Radio}</li>
                    <li>USB: ${mobile.data.others.USB}</li>
                </ol>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        `;
        //sensor showing
        sensors.length && sensors.forEach(sensor => {
            const li = document.createElement("li");
            li.innerText = sensor;
            document.getElementById("sensor").appendChild(li);
        });
    }
};

//footer year showing
document.getElementById("year").innerText = new Date().getFullYear();