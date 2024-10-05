
// get elements
const loadingContainer = document.getElementById("loading-container");
const displayPhoneContainer = document.getElementById(
  "display-phones-container"
);

// Menu bars
document.getElementById("menu-bar").addEventListener("click", () => {
  document.getElementById("open-btn").classList.toggle("hidden");
  document.getElementById("close-btn").classList.toggle("hidden");
  document.getElementById("menu-container").classList.toggle("hidden");
});

// get data from api
const getData = async (isLoadAll, searchText = "iphone") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText? searchText : "iphone"}`
  );
  const data = await res.json();
  const AllData = data.data;

  
  // if (isLoadAll) {
  //    displayPhones(AllData);
  // } else {
  //   displayPhones(AllData.slice(0, 8));
  // }

  displayPhones(isLoadAll, AllData);
};

// Search button event
document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value;
  // showLoading();

  loadingContainer.classList.remove("hidden");
  setTimeout(() => {
    getData(false, searchInput);
  }, 3000)
  
});


const showAll = () => {
  const searchInput = document.getElementById("search-input").value;
  getData(true, searchInput);
}


// Display phone function
const displayPhones = (loadStatus, phoneData) => {
  loadingContainer.classList.add("hidden");
  displayPhoneContainer.innerHTML = "";

  if (loadStatus) {
    phoneData = phoneData;
  } else {
    phoneData = phoneData.slice(0, 8);
  }

  phoneData.forEach((phone) => {
    // console.log(phone);
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="p-4 border border-[#CFCFCF] rounded-xl bg-base-100">
      <figure class="bg-[#f3f8ff] h-[300px] rounded-xl flex justify-center items-center">
        <img src="${phone.image}" alt="Shoes" class=" w-[200px] bg-[#f3f8ff]"/>
      </figure>
      <div class="space-y-4 py-4 text-center">
        <h2 class="font-bold text-xl">${phone.phone_name}</h2>
        <p class="text-base text-gray-500">If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
          <button class="btn bg-[#0D6EFD] text-white px-4 font-normal hover:bg-gray-700 duration-300 ease-in-out">Show Details</button>
        </div>
      </div>
    </div>
    `;

    displayPhoneContainer.append(div);
  });
};

// Show loading spinner
// const showLoading = () => {
//   displayPhoneContainer.classList.add("hidden");
//   loadingContainer.classList.remove("hidden");
//   setTimeout(() => {
//     loadingContainer.classList.add("hidden");
//     displayPhoneContainer.classList.remove("hidden");
//   }, 3000);
// };

getData(false);
