//Obtener elementos del HTML
const centigrados = document.getElementById('centigrados')
const fahrenheit = document.getElementById('fahrenheit')
const last_update1 = document.getElementById('last_update1')
const last_update2 = document.getElementById('last_update2')
const humedad = document.getElementById('humedad')
const i_calor_c = document.getElementById('i_calor_c')
const i_calor_f = document.getElementById('i_calor_f')
const luz = document.getElementById('luz')

const fecha1 = document.getElementById('fecha1')
const fecha2 = document.getElementById('fecha2')

if (document.getElementById('index')) {

    fetch('https://pythonapi-rest.herokuapp.com/metrics')
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            const last = data[data.length - 1]
            centigrados.innerText = Number(last.centigrados).toFixed(0)
            fahrenheit.innerText = Number(last.fahrenheit).toFixed(0)
            luz.innerText = last.luz
            last_update1.innerText = last.last_update
            last_update2.innerText = last.last_update
            humedad.innerText = Number(last.humedad).toFixed(0)
            i_calor_c.innerText = last.i_calor_c
            i_calor_f.innerText = last.i_calor_f

            const fecha = new Date()
            fecha1.innerText = fecha.toLocaleString()
            fecha2.innerText = fecha.toLocaleString()
        }).catch(error => console.log(error))
}

if (document.getElementById('news')) {

    fetchNews()

    const enlaces = document.querySelectorAll('.categoria')
    enlaces.forEach(cat => {
        cat.addEventListener('click', e => {
            e.preventDefault();
            console.log(cat.innerText.toLowerCase());
            fetchNews(cat.innerText.toLowerCase())
        })
    });


}

function fetchNews(category) {

    let url = 'https://newsapi.org/v2/top-headlines?country=mx&apiKey=6fab2c071a82475b8bb878214869fac8';
    url += category ? `&category=${category}` : '';

    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            const articles = data.articles

            const noticias = document.getElementById('noticias')
            let html = '';
            articles.forEach(noticia => {
                html += `
                    <div class="post">
                    <h2 class="entry-title">${noticia.title}</h2>
                    <div class="featured-image"><img src="${noticia.urlToImage || 'https://hescorp.com.mx/wp-content/themes/consultix/images/no-image-found-360x250.png'}" alt=""></div>
                    <p>${noticia.description || ''}</p>
                    <a href="${noticia.url}" target="_blank" class="button">Leer más</a>
                    </div>
                `
            });

            noticias.innerHTML = html
        }).catch(error => console.log(error))
}