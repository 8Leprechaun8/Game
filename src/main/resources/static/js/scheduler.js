let mydata;
let bombsImageNumber = 1;

var battleFieldVar;
var enemiesVar;
var heroVar;

function bodyOfScheduler() {

    let jwtToken = getCookie("jwtToken");
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/game/battle');
    xhr.setRequestHeader("Authorization", jwtToken);
    xhr.send();

    xhr.onload = function() {
      if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
      } else { // если всё прошло гладко, выводим результат
        const serverData = JSON.parse(xhr.response);
        battleFieldVar = serverData.structure;
        enemiesVar = serverData.enemies;
        heroVar = serverData.player;

        if (heroVar == null) {
                    document.getElementById("myDate").innerHTML = "Game over!";
        } else if (enemiesVar == null) {
                document.getElementById("myDate").innerHTML = "You Win!";
        } else {
            document.getElementById("myDate").innerHTML = "";
        }

        createPicture();
      }
    };
}

function createPicture() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgGreenGrass = new Image();
    imgGreenGrass.src = '/images/green_grass.jpg';
    const imgBlackGrass = new Image();
    imgBlackGrass.src = '/images/black_grass.jpg';
    const imgRock = new Image();
    imgRock.src = '/images/rock.jpg';
    const imgWater = new Image();
    imgWater.src = '/images/water.jpg';
    const imgExplosion = new Image();
    imgExplosion.src = '/images/explosion.jpg';

    var imgBomb = new Image();
    imgBomb.src = '/images/bomb' + bombsImageNumber + '.jpg';
    console.log(imgBomb.src);
    bombsImageNumber++;
    if (bombsImageNumber == 5) {
        bombsImageNumber = 1;
    }

    const imgWall = new Image();
    imgWall.src = '/images/wall.jpg';

    var imgHero0 = new Image();
    imgHero0.src = '/images/hero_down' + 2 + '.png';

    const imgTree = new Image();
    imgTree.src = '/images/tree.jpg';

    var imgEnemy0 = new Image();
    imgEnemy0.src = '/images/enemy_down' + 2 + '.png';

    // Ensure images are loaded before drawing
    imgGreenGrass.onload = () => {
        for(var i = 0; i < 10; ++i) {
            for(var j = 0; j < 20; ++j) {
                if (battleFieldVar[i][j] == 1) {
                    ctx.drawImage(imgGreenGrass, j*48, i*48);
                }
            }
        }
    };
    imgBlackGrass.onload = () => {
        for(var i = 0; i < 10; ++i) {
            for(var j = 0; j < 20; ++j) {
                if (battleFieldVar[i][j] == 2) {
                    ctx.drawImage(imgBlackGrass, j*48, i*48);
                }
            }
        }
    };
    imgRock.onload = () => {
            for(var i = 0; i < 10; ++i) {
                for(var j = 0; j < 20; ++j) {
                    if (battleFieldVar[i][j] == 3) {
                        ctx.drawImage(imgRock, j*48, i*48);
                    }
                }
            }
        };
    imgWater.onload = () => {
            for(var i = 0; i < 10; ++i) {
                for(var j = 0; j < 20; ++j) {
                    if (battleFieldVar[i][j] == 4) {
                        ctx.drawImage(imgWater, j*48, i*48);
                    }
                }
            }
        };
    imgBomb.onload = () => {
            for(var i = 0; i < 10; ++i) {
                for(var j = 0; j < 20; ++j) {
                    if (battleFieldVar[i][j] == 6) {
                        ctx.drawImage(imgBomb, j*48, i*48);
                    }
                }
            }
        };
    imgWall.onload = () => {
            for(var i = 0; i < 10; ++i) {
                for(var j = 0; j < 20; ++j) {
                    if (battleFieldVar[i][j] == 7) {
                        ctx.drawImage(imgWall, j*48, i*48);
                    }
                }
            }
        };
    imgTree.onload = () => {
                    for(var i = 0; i < 10; ++i) {
                        for(var j = 0; j < 20; ++j) {
                            if (battleFieldVar[i][j] == 9) {
                                ctx.drawImage(imgTree, j*48, i*48);
                            }
                        }
                    }
                };
    imgHero0.onload = () => {
        ctx.drawImage(imgHero0, heroVar.x, heroVar.y);
    };
    imgEnemy0.onload = () => {
        enemiesVar.forEach((item, index, enemiesVar) => {
            ctx.drawImage(imgEnemy0, item.x, item.y);
        });
    };
    imgExplosion.onload = () => {
                for(var i = 0; i < 10; ++i) {
                    for(var j = 0; j < 20; ++j) {
                        if (battleFieldVar[i][j] == 5) {
                            ctx.drawImage(imgExplosion, j*48, i*48);
                        }
                    }
                }
            };

}


let timerId;

function scheduler() {
    timerId = setInterval(bodyOfScheduler, 500);
}

function clickPause() {
    setTimeout(() => { clearInterval(timerId); alert('stop'); }, 0);
}



window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    let jwtToken = getCookie("jwtToken");
    let xhr_hero = new XMLHttpRequest();
    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        // Do something for "down arrow" key press.
        //y = y + 12;
        xhr_hero.open('POST', '/game/action');
        xhr_hero.setRequestHeader("Authorization", jwtToken);
        xhr_hero.setRequestHeader('Content-Type', 'application/json');
        var data1 = { action: 'down' };
        xhr_hero.send(JSON.stringify(data1));
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        // Do something for "up arrow" key press.
        //y = y - 12;
        xhr_hero.open('POST', '/game/action');
        xhr_hero.setRequestHeader("Authorization", jwtToken);
        xhr_hero.setRequestHeader('Content-Type', 'application/json');
        var data1 = { action: 'up' };
        xhr_hero.send(JSON.stringify(data1));
        break;
      case "Left": // IE/Edge specific value
      case "ArrowLeft":
        // Do something for "left arrow" key press.
        //x = x - 12;
        xhr_hero.open('POST', '/game/action');
        xhr_hero.setRequestHeader("Authorization", jwtToken);
        xhr_hero.setRequestHeader('Content-Type', 'application/json');
        var data1 = { action: 'left' };
        xhr_hero.send(JSON.stringify(data1));
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        // Do something for "right arrow" key press.
        //x = x + 12;
        xhr_hero.open('POST', '/game/action');
        xhr_hero.setRequestHeader("Authorization", jwtToken);
        xhr_hero.setRequestHeader('Content-Type', 'application/json');
        var data1 = { action: 'right' };
        xhr_hero.send(JSON.stringify(data1));
        break;
      case "Space":
      case " ":
        // Do something for "space" key press.
        //console.log("Bomb")
        xhr_hero.open('POST', '/game/action');
        xhr_hero.setRequestHeader("Authorization", jwtToken);
        xhr_hero.setRequestHeader('Content-Type', 'application/json');
        var data1 = { action: 'space' };
        xhr_hero.send(JSON.stringify(data1));
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true,
);

function generate() {
    let jwtToken = getCookie("jwtToken");
    console.log(jwtToken);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/game');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", jwtToken);
    xhr.send();

        xhr.onload = function() {
          if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
          } else { // если всё прошло гладко, выводим результат
            const serverData = JSON.parse(xhr.response);
          }
        };
}

function getCookie(myName) {
    const cookies = document.cookie.split('; ');
    const cookieMap = {};
    cookies.forEach(cookie => {
        const [name, value] = cookie.split('=');
        cookieMap[name] = value;
    });
    const cookieVal = cookieMap[myName];
    return cookieVal;
}
