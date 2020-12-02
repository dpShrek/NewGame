let go = false;
let mytimer;

//Добавление блока в игровое поле
      function KubAdd(col, newW) {
            let widthGame = document.getElementById("games").offsetWidth-50;	
                for (let i = 0; i < col; i++) {
                    newW = getRandomArbitrary (15, 30);
                    let newTop = getRandomArbitrary (45, 400);
                    let newLeft = getRandomArbitrary (45, widthGame);	
                    let colors = ['red', 'green', 'black', 'yellow'];
                    let newColorNumber = getRandomArbitrary (0, 3);
                    let color = (colors[newColorNumber]);    
                    $("#games").append('<div class="kybik" data-color="'+color+'" onClick="KubClick(this)" style="width: '+newW+'px; height: '+newW+'px; top: '+newTop+'px; left: '+newLeft+'px; display: block; background-color:'+color+';"></div>');
						
                 
                };
};

//Появление кубиков при нажатии
        function KubClick($this) {
            let points=$("#points").text();
            let color = $($this).attr('data-color');
            let width = $($this).width();

                if (color == 'yellow')
                    points=+points+2;
                        if (width < 20)
                            points=+points+2;
                                else
                                    points++;
                                    $("#points").text(points);
                                    $($this).remove();
                                    KubAdd(getRandomArbitrary (0, 1)); 
                                     
				if (document.getElementById("games").childNodes.length < 1) 
					KubAdd(3);
													
};

let time;
let newPoints;
//Таймер
        function timer() {
            if (!go) return;
                seconds.innerText--; 
                    if (seconds.innerText == 0){
                        clearInterval(mytimer);
                        $('#games').html('');
                        stopTimer();
                        newPoints = document.getElementById('points').innerText;
                    if (newPoints == 0) {
                        alert ("ВЫ НЕ ЗАРАБОТАЛИ ОЧКОВ!!!");
                        newGame ();
                    } else
                    $("#exampleModal").modal('show');
                    
                    console.log(newPoints);
                    document.getElementById('newPoints').innerText = newPoints;
            };
            
        mytimer = setTimeout(timer, 1000);
};

//Запуск таймера
        function startTimer(){
            go = true;
            KubAdd(10);
            timer();  
}; 

//Остановка таймера
        function stopTimer(){
            go = false;  
};

//Кнопка старт
let start = document.getElementById("start");

        start.onclick = function () {
            document.getElementById("seconds").innerHTML="60";
            document.getElementById("start").disabled = true;
            document.getElementById("zero").innerHTML="0";
            
            result = 0;
            startTimer();
};
//Новая игра
    function newGame () {    
        document.getElementById("start").disabled = false;
        document.getElementById('points').textContent = 0;
        document.getElementById("zero").innerHTML="1";
        document.getElementById("seconds").innerHTML="00";
            $('#games').html('');
            stopTimer();        
};

let newgames =  document.getElementById('new-game');
let name;

//Кнопка новая игра
        newgames.onclick = () => {    
            newGame ();        
};

//Новая игра в модальном окне
let newGamess =  document.getElementById('newGame');

        newGamess.onclick = () => {    
            newGame (); 
};

//Рандом от и до
        function getRandomArbitrary(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
              };


//Выводим список игроков
let allName = [];
    
     if (localStorage.getItem('players')!= undefined) {
         allName = JSON.parse(localStorage.getItem('players'));
         out();
};

     if (allName.length > 20) {
        localStorage.clear();
};

document.getElementById('add').onclick = function () {
    let name = document.getElementById('in').value;
        if(name=='') return;
            let temp = {};
            temp.name = name;
            temp.point = newPoints;
            let i = allName.length;
            allName[i] = temp;
    out();
    
    localStorage.setItem('players', JSON.stringify(allName));
    location.reload();
};


    function out () {
        let out ='';
            for (let key in allName) {
                out += (+key +1) + ' ' +allName[key].name +' - '+ allName[key].point + ' очков' + '<br>';
            }
        document.getElementById('out').innerHTML = out;    
};

 