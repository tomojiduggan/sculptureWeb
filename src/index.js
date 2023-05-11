let introBool = false

function intro() {

    if(!introBool){
        document.getElementById("introSlide").classList.add("active")
        document.getElementById("button").classList.add("spin")
        introBool = true
    } else {
        document.getElementById("introSlide").classList.remove("active")
        document.getElementById("button").classList.remove("spin")
        introBool = false
    }
}