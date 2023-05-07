const submitBttn = document.querySelector('#submitName')
const answerInput = document.querySelectorAll('input[type=radio]:checked')
const trash = document.getElementsByClassName("ph-trash");
const nameInput = document.querySelector('#name')

const resultOptions = [
  {
      title: 'Gryffindor!',
      desc: "Gryffindor is where you would find the pluckiest and most daring students (there\’s a reason the house symbol is the brave lion). The house colours are scarlet and gold, the common room lies up in Gryffindor Tower and the Head of House is Professor Minerva McGonagall.If the Sorting Hat placed you here, you would have demonstrated qualities like courage, bravery and determination. Some of the wizarding world\’s best and brightest belonged to this house – Harry Potter and Albus Dumbledore are just a couple that spring to mind!If you are lucky enough to end up in Gryffindor, we imagine you\’re the type of person who likes to stand up for the little guy, challenges authority, has a tendency to act first and think later, is known as a class clown and takes board games very seriously."
  },
  {
      title: 'Hufflepuff!',
      desc: "Hufflepuff is where you will find the most trustworthy and hardworking students. In fact, out of all the houses Hufflepuff has produced the least number of dark witches and wizards. The badger is the symbol of this house, the colours are yellow and black, the Head of House is Professor Pomona Sprout and the common room can be found near the kitchens in Hogwarts. There is an idea that Hufflepuffs are the least clever of all Hogwarts students – but that is not true. Hufflepuffs are just the most humble of all the houses and don\’t feel the need to shout about their achievements in the same way as the others. If you were lucky enough to be sorted into this house, we can imagine you\’re the type of person who has a strong moral compass, always works hard, is the most loyal friend, knows it is the taking part that counts and always has the best snacks."
  },
  {
      title: 'Ravenclaw!',
      desc: "If you are looking for the brainiest students – you would find them in Ravenclaw (with a couple of notable exceptions like Hermione Granger). The Ravenclaw colours are blue and bronze, the emblem is an eagle, the Head of House is Professor Filius Flitwick and the common room sits at the top of Ravenclaw Tower behind an enchanted knocker.The Sorting Hat would only put you in this house if you demonstrated excellent wisdom, wit and a skill for learning. Ravenclaws are often known for being quite eccentric and most of the great wizarding inventors and innovators have come from this house.We can imagine that you would get to sit up in Ravenclaw Tower, while surveying the excellent views, if you\’re the type of person who analyses everything, is an overachiever, can be described as away with the fairies, is not afraid to be an individual and has a head stuffed full of interesting facts."
  },
  {
      title: 'Slytherin!',
      desc: "Slytherin house has an unfortunate reputation. While it is true that a lot of dark witches and wizards were sorted into Slytherin, not all who belong to this house are bad. In fact, there are a lot of excellent qualities the Sorting Hat looks for in potential Slytherins and Merlin himself even belonged to this misunderstood house!The house colours for Slytherin are silver and emerald green and the emblem is a serpent. The Head of House is Professor Severus Snape, and the common room can be found down in the dungeons under the lake (which only adds to the Slytherin air of mystery).If the Sorting Hat placed you in this noble house, then you are most likely ambitious, shrewd and possibly destined for greatness. We can imagine you\’re the kind of person who is always one step ahead, has a dark sense of humour, thinks reputation is important, takes pride in their appearance and doesn\’t let anyone see their soft side."
  }
];



const getHouse = ttl => {
    if(ttl <= 6 ){
        return resultOptions[0]
    }else if(ttl <= 12){
        return resultOptions[1]
    }else if(ttl <= 18){
        return resultOptions[2]
    }else{
        return resultOptions.find(option => option.title === 'Slytherin!') //cause seth likes to make things complicated
        }
}




submitBttn.addEventListener('click', (e) =>{
   const ttlCount = Array.from( document.querySelectorAll('input[type=radio]:checked')).reduce((accum, element) => accum + +element.value, 0)
    console.log(e.target.dataset)
    if(ttlCount === 0){
        alert('Fill Out Quiz')
        return
    }
    const result = getHouse(ttlCount)
    fetch('houseName', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: e.target.dataset.id,
          houseName: result.title // when you call this function it returns the value as an object which then you can do dot noationto get title 
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        document.querySelector('.desc').innerText = result.desc // grabs the paragraph 
        window.location.reload(true)
      })
    });


Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
        console.log(this.parentNode)
      fetch('houseMates', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.parentNode.dataset.id
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});

window.addEventListener('load', event => {
    document.querySelector('.desc').innerText = resultOptions.find(option => option.title === document.querySelector('#houseData').dataset.house).desc
})
















































// const quizSteps = $('#quizzie .quiz-step');
// let totalScore = 0;

// quizSteps.each(function() {
// const currentStep = $(this);
// const ansOpts = currentStep.children('.quiz-answer');

// ansOpts.each(function() {
// const eachOpt = $(this);

// eachOpt.on('click', check);

// function check() {
//   const $this = $(this);
//   const value = $this.attr('data-quizIndex');
//   const answerScore = parseInt(value);

//   if (currentStep.children('.active').length > 0) {
//     const wasActive = currentStep.children('.active');
//     const oldScoreValue = wasActive.attr('data-quizIndex');
//     const oldScore = parseInt(oldScoreValue);

//     currentStep.children('.active').removeClass('active');
//     $this.addClass('active');
//     totalScore -= oldScoreValue;
//     totalScore += answerScore;
//     calcResults(totalScore);
//   } else {
//     $this.addClass('active');
//     totalScore += answerScore;
//     calcResults(totalScore);
//     updateStep(currentStep);
//   }
// }
// });
// });

// function updateStep(currentStep) {
// if (currentStep.hasClass('current')) {
// currentStep.removeClass('current');
// currentStep.next().addClass('current');
// }
// }

// function calcResults(totalScore) {
// if (quizSteps.find('.active').length == quizSteps.length) {
// const resultsTitle = $('#results h1');
// const resultsDesc = $('#results .desc');
// const lowestScoreArray = $('#quizzie .low-value').map(function() {
// return $(this).attr('data-quizIndex');
// }).get();
// const minScore = lowestScoreArray.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
// const highestScoreArray = $('#quizzie .high-value').map(function() {
//     return $(this).attr('data-quizIndex');
//   }).get();
//   const maxScore = highestScoreArray.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
  
//   const range = maxScore - minScore;
//   const numResults = resultOptions.length;
//   const interval = range / (numResults - 1);
//   let increment = '';
//   let n = 0;
  
//   while (n < numResults) {
//     increment = minScore + interval * n;
  
//     if (totalScore <= increment) {
//       resultsTitle.replaceWith('<h1>' + resultOptions[n].title + '</h1>');
//       resultsDesc.replaceWith('<p class=\'desc\'>' + resultOptions[n].desc + '</p>');
//       return;
//     } else {
//       n++;
//     }
//   }

// }
// }
  











































// var quizSteps = $('#quizzie .quiz-step'), totalScore = 0;
// quizSteps.each(function () {
//   var currentStep = $(this), ansOpts = currentStep.children('.quiz-answer');
//   ansOpts.each(function () {
//       var eachOpt = $(this);
//       eachOpt[0].addEventListener('click', check, false);
//       function check() {

//           var $this = $(this), value = $this.attr('data-quizIndex'), answerScore = parseInt(value);
//           if (currentStep.children('.active').length > 0) {
//               var wasActive = currentStep.children('.active'), oldScoreValue = wasActive.attr('data-quizIndex'), oldScore = parseInt(oldScoreValue);
//               currentStep.children('.active').removeClass('active');
//               $this.addClass('active');
//               totalScore -= oldScoreValue;
//               totalScore += answerScore;
//               calcResults(totalScore);
//           } else {
//               $this.addClass('active');
//               totalScore += answerScore;
//               calcResults(totalScore);
//               updateStep(currentStep);
//           }
//       }
//   });
// });
// function updateStep(currentStep) {
//   if (currentStep.hasClass('current')) {
//       currentStep.removeClass('current');
//       currentStep.next().addClass('current');
//   }
// }
// function calcResults(totalScore) {
//   if (quizSteps.find('.active').length == quizSteps.length) {
//       var resultsTitle = $('#results h1'), resultsDesc = $('#results .desc');
//       var lowestScoreArray = $('#quizzie .low-value').map(function () {
//           return $(this).attr('data-quizIndex');
//       });
//       var minScore = 0;
//       for (var i = 0; i < lowestScoreArray.length; i++) {
//           minScore += lowestScoreArray[i];
//       }
//       var highestScoreArray = $('#quizzie .high-value').map(function () {
//           return $(this).attr('data-quizIndex');
//       });
//       var maxScore = 0;
//       for (var i = 0; i < highestScoreArray.length; i++) {
//           maxScore += highestScoreArray[i];
//       }
//       var range = maxScore - minScore;
//       var numResults = resultOptions.length, interval = range / (numResults - 1), increment = '', n = 0;
//       while (n < numResults) {
//           increment = minScore + interval * n;
//           if (totalScore <= increment) {
//               resultsTitle.replaceWith('<h1>' + resultOptions[n].title + '</h1>');
//               resultsDesc.replaceWith('<p class=\'desc\'>' + resultOptions[n].desc + '</p>');
//               return;
//           } else {
//               n++;
//           }
//       }
//   }
// }