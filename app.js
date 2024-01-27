window.addEventListener('load', function() {

    let drop = document.querySelector('#levelDropdown');
    drop.addEventListener('change', function() {
        let option = encodeURIComponent(parseInt(drop.value));;
        window.location.href = `einmaleins.html?data=${option}`;
    });


    let btn_2Klasse = document.querySelector('#btn_4a');
    btn_2Klasse.addEventListener('click', function() {
        let option = encodeURIComponent(11);;
        window.location.href = `einmaleins.html?data=${option}`;
    });

    let btn_einmaleins = document.querySelector('#btn_einmaleins');
    btn_einmaleins.addEventListener('click', function() {
        let option = encodeURIComponent(12);;
        window.location.href = `einmaleins.html?data=${option}`;
    });
});