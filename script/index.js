const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")//promise ti response
        .then(res => res.json())//promise of json Data
        .then(json => {
            displayLesson(json.data);
        });
};
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
};
const createElement = (arr) => {
    const HTMLElement = arr.map(
        el => `<span class="btn">${el}</span>`
    );

    return HTMLElement.join("");
};
const manageSpinner=(status)=>{
    if(status==true){
       document.getElementById("spinner").classList.remove("hidden") ;
       document.getElementById("word-container").classList.add("hidden") ;
    }else{
        document.getElementById("word-container").classList.remove("hidden") ;
       document.getElementById("spinner").classList.add("hidden") ; 
    }
};
// {
//   "status": true,
//   "message": "successfully fetched a word details",
//   "data": {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//       "enthusiastic",
//       "excited",
//       "keen"
//     ],
//     "id": 5
//   }
// }
const loadLevelWord = (id) => {
 manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())//promise of json Data
        .then(data => {
           removeActive();
const clickBtn = document.getElementById(`lesson-btn-${id}`);
clickBtn.classList.add("active");
displayLevelWord(data.data); 
        });
};
const loadWordDetail=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    console.log(url);
    const res=await fetch(url);
    const details=await res.json();
    displayWordDetails(details.data);

}
const displayWordDetails=(word)=>{
  console.log(word);
  const detailsBox=document.getElementById("details-container");
  detailsBox.innerHTML=` <div class="">
        <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> )</h2>
      </div>
       <div class="">
        <h2 class=" font-bold">${word.meaning}</h2>
        <p>${word.pronunciation}</p>
      </div>
           <div class="">
        <h2 class=" font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
        </div>
           <div class="">
        ${createElement(word.synonyms)}
      </div>
            
         `;
  document.getElementById("word-modal").showModal();
}
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
     if(words.length==0){
        wordContainer.innerHTML = ` <div class=" text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">
 <img class="mx-auto" src="./assets/alert-error.png"/>
   <p class="text-xl font-medium text-gray-400 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
   <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>

  </div>`;
  manageSpinner(false);
        return;
     }
    //{ id: 5, level: 1, word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার' }
    words.forEach(word => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
   <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
  <h2 class="font-bold text-2xl">${word.word ? word.word:"Notfound"}</h2>
  <P class="font-semibold">Meaning /Pronounciation</P>
  <div class="text-2xl font-semibold ">${word. meaning ? word. meaning:"Notfound"}/${word.pronunciation?word.pronunciation:"Notfound"}</div>
  <div class="flex justify-between items-center">
    <button onClick="loadWordDetail(${word.id})" class="btn bg-[18181B10%] hover:bg-[18181B80%]"><i class="fa-solid fa-circle-info"></i></button>

    <button class="btn bg-[18181B10%] hover:bg-[18181B80%]"><i class="fa-solid fa-volume-high"></i></button>
  </div>

 </div>
  `;
        wordContainer.append(card);
    });
    manageSpinner(false);
};
const displayLesson = (lessons) => {
    //1.get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    //2.get into evry lessons
    for (let lesson of lessons) {
        //2.create Element
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
 <button id="lesson-btn-${lesson.level_no}" onClick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>lesson-${lesson.level_no}</button>
            
`;
        //4.append into container
        levelContainer.append(btnDiv);
    }


};
loadLessons();