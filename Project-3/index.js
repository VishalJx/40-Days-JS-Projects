const tilesContainer = document.querySelector(".tiles");
const colors = ["red", "blue", "green","yellow","purple","orange","indigo","teal"];

/*To create two pair of colors from the above array
(hence building above array two time using spread operator) */
const colorPickList = [...colors, ...colors];

const tileCount = colorPickList.length;

//Game State
let revealedCount = 0; //no. of revealed tiles
let activeTile = null; //Clicked tile
let awaitingEndOfMove = false; //when set true means user is waiting for two unmatched tiles to turn over again.


//Building up tiles
const buildTile=(color)=>{
    /*creating an element using dom; giving it class
     and then setting it's color-attribute*/
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.setAttribute("color", color);
    tile.setAttribute("data-revealed", "false"); //will help to not set the revealed pair o tiles as activeTile;

    tile.addEventListener("click",()=>{
        const revealed = tile.getAttribute("data-revealed");
        if (awaitingEndOfMove || revealed==="true" ) {
            return;
        }
        /*as soon as we click on tile; 
        the tile color will be revealed by
         setting the tile-color into background*/
        tile.style.backgroundColor = color; 

        if (!activeTile) {
            activeTile = tile;
            return;
        }

        const colorMatch = activeTile.getAttribute("color")
        if (colorMatch === color) {
            activeTile.setAttribute("data-revealed", "true");
            tile.setAttribute("data-revealed", "true");
            tile.setAttribute("color", "rgb(77, 77, 77)");

            awaitingEndOfMove = false;
            activeTile = null;
            revealedCount += 2;

            if(revealedCount === tileCount){
                alert("You win! Refresh to play again.")
            }
            return;
        }

        awaitingEndOfMove = true;
        setTimeout(() => {
            tile.style.backgroundColor = null;
            activeTile.style.backgroundColor = null;

            //resetting the above variables so that we can continue selecting;
            awaitingEndOfMove = false;
            activeTile = null;
        }, 1000);
    });
    return tile;
}

for(let i = 0; i<tileCount; i++){
    const randomIndex = Math.floor(Math.random()*colorPickList.length);
    const color = colorPickList[randomIndex];
    const tile = buildTile(color);

    colorPickList.splice(randomIndex, 1);
//document.body.appendChild(tile);  //adding "tile" inside body tag
//but we need to add it into tiles-container :-
    tilesContainer.appendChild(tile);
}