document.getElementById("search-btn").addEventListener("click",()=>{
    const searchText = document.getElementById("search-text").value;
    document.getElementById("search-text").value = "";
    if(searchText.length>0){
        searchMobile(searchText)
    }else{
        console.log("something wrong")
    }
});

const searchMobile = (searchText) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(result=> result.json())
    .then(data=>showData(data))
};

const showData = (data) => {
    if(!data.status){
        console.log("mobile not found")
    } else{
        const displayData = document.getElementById("display-result");
        data.data.map(mobile=>{
            const div = document.createElement("div");
            div.classList = "col";
            div.innerHTML = `
                <div class="card">
                    <img src="${mobile.image}" class="card-img-top" alt="${mobile.phone_name}">
                    <div class="card-body">
                        <h5 class="card-title">${mobile.brand}</h5>
                        <p class="card-text">${mobile.phone_name}</p>
                    </div>
                </div>
            `;
            displayData.appendChild(div);
        })
    }
}