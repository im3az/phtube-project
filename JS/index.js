const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const tabContainer = document.getElementById("tab-container");
  data.data.forEach((element) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button onclick="handleLoadVideos('${element.category_id}')" class="btn normal-case text-base">${element.category}</button>
      `;
    tabContainer.appendChild(div);
  });

  // console.log(data.data);
};

const handleLoadVideos = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const data = await res.json();

  // console.log(data);
  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  if (data.status === true) {
    data.data.forEach((news) => {
      // console.log(news.others?.posted_date);
      const blankCards = document.getElementById("empty-card-container");
      blankCards.classList.add("hidden");

      let time = news.others?.posted_date;
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;

      let hours = Math.floor((time / hour) % 24);
      let minutes = Math.floor((time / minute) % 60);
      let seconds = Math.floor((time / second) % 60);

      const div = document.createElement("div");
      div.innerHTML = `
    <div class="card w-96 bg-base-100">
        <figure>
          <img class="w-[312px] h-[200px]"  src=${news?.thumbnail} />
        </figure>
      <div class="card-body">
        <div class="flex gap-4">
          <img src=${
            news.authors[0].profile_picture
          } class="w-10 h-10 rounded-full" alt="" />
          <div class="">
            <h2 class="card-title text-base font-bold mb-2">
              ${news.title}
            </h2>
            <div class="grid grid-cols-2">
              <h2 class="text-sm font-normal mb-2 ">
                ${news.authors[0].profile_name}
              </h2>
              
              <div id="badge-icon" ${
                news.authors[0].verified ? "block" : "hidden"
              }>
                <img                 
                  src="./Images/fi_10629607.svg"
                  class="ml-2 "
                />
              </div>
            </div>
            <h2 class="text-sm font-normal">${news.others.views} views</h2>
          </div>
        </div>
      </div>
    <div class="relative bottom-44 left-44 w-40" ${
      news.others?.posted_date ? "block" : "hidden"
    }>
      <h2
        class="bg-black text-white text-xs font-normal p-1 text-center rounded"
      >
        ${hours} hrs ${minutes} min ${seconds} sec ago
      </h2>
    </div>
  </div>
    `;
      // if (news.authors[0].verified === true) {
      //   badgeIcon();
      // }

      cardContainer.appendChild(div);
    });
  } else {
    emptyCardContainer();
  }
};

handleCategory();
handleLoadVideos(1000);

const emptyCardContainer = () => {
  const blankCards = document.getElementById("empty-card-container");
  blankCards.classList.remove("hidden");
};

const goToBlogPage = () => {
  window.location.href = "blog.html";
};
