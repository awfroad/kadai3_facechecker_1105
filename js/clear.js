let clear = document.querySelector(".js-clear")

clear.onclick = function(){
    localStorage.clear();
    $('.js-archive').empty();
    document.location.reload()
};