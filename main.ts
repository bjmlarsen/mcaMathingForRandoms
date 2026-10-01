namespace SpriteKind {
    export const Cell = SpriteKind.create()
    export const HeaderCell = SpriteKind.create()
    export const Cursor = SpriteKind.create()
}
function initializeMainGrid () {
    cellGrid = []
    for (let column = 0; column <= 9; column++) {
        for (let row = 0; row <= 9; row++) {
            currentCell = sprites.create(assets.image`imgCell`, SpriteKind.Cell)
            cellYPosition = getCellScreenYPosition(column + 1)
            cellXPosition = getCellScreenXPosition(row + 1)
            currentCell.setPosition(cellXPosition, cellYPosition)
            sprites.setDataNumber(currentCell, "answer", (column + 1) * (row + 1))
            cellGrid.insertAt(getCellIndex(1, 1), currentCell)
        }
    }
}
function getCellIndex (row: number, column: number) {
    return row * 10 + column
}
function getCellScreenYPosition (index: number) {
    initialPosition = 60
    cellHeight = 16
    return initialPosition + cellHeight * index
}
function initializeTopHeader () {
    topHeader = []
    for (let index = 0; index <= 10; index++) {
        currentCell = sprites.create(assets.image`imgHeader`, SpriteKind.HeaderCell)
        cellYPosition = getCellScreenYPosition(0)
        cellXPosition = getCellScreenXPosition(index)
        currentCell.setPosition(cellXPosition, cellYPosition)
        topHeader.insertAt(index, currentCell)
        textSprite = textsprite.create(convertToText(index + 0), 1, 15)
        textSprite.setPosition(cellXPosition, cellYPosition)
    }
}
function initializeGameBoard () {
    initializeLeftHeader()
    initializeTopHeader()
    initializeMainGrid()
}
function initializeLeftHeader () {
    leftHeader = []
    for (let index = 0; index <= 10; index++) {
        currentCell = sprites.create(assets.image`imgHeader`, SpriteKind.HeaderCell)
        cellYPosition = getCellScreenYPosition(index)
        cellXPosition = getCellScreenXPosition(0)
        currentCell.setPosition(cellXPosition, cellYPosition)
        leftHeader.insertAt(index, currentCell)
        textSprite = textsprite.create(convertToText(index + 0), 1, 15)
        textSprite.setPosition(cellXPosition, cellYPosition)
    }
}
function getCellScreenXPosition (index: number) {
    initialPosition = 60
    cellWidth = 16
    return initialPosition + cellWidth * index
}
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    clickedSpot = sprites.create(assets.image`imgClickedSpot`, SpriteKind.Cursor)
    clickedSpot.setPosition(x, y)
    for (let currentCell of cellGrid) {
        if (currentCell.overlapsWith(clickedSpot)) {
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
            game.splash("Answer is: ", sprites.readDataNumber(currentCell, "answer"))
            console.log(sprites.readDataNumber(currentCell, "answer"))
        }
    }
    sprites.destroy(clickedSpot)
})
let clickedSpot: Sprite = null
let cellWidth = 0
let leftHeader: Sprite[] = []
let textSprite: TextSprite = null
let topHeader: Sprite[] = []
let cellHeight = 0
let initialPosition = 0
let cellXPosition = 0
let cellYPosition = 0
let currentCell: Sprite = null
let cellGrid: Sprite[] = []
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}
initializeGameBoard()
