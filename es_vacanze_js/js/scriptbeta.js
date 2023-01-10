let contatti = [];

let feed = document.querySelector(".feed");
let aggContatto = document.querySelector("#aggiungi");
let mostraRub = document.querySelector("#mostra");
let nascondiRub = document.querySelector("#nascondi");
let mostrata = false;
let modificaCont = false;

// Funzione costruttore del singolo contatto
function Contatto (nomCog, numTel, email,indirizzo,immagine)
{
    this.nomCog = nomCog;
    this.numTel = numTel;
    this.email = email;
    this.indirizzo = indirizzo;
    this.immagine = immagine;

    // funzione del construttore che permette di richiamare una stringa con tutti i dati del singolo contatto
    this.contattoString = function ()
    {
        if(this.immagine == "")
        {
            let stringa = "Nome e Cognome : <p>"+this.nomCog+"</p> Numero di Telefono : <p>"+this.numTel+"</p> Email : <p>"+this.email+" </p>Indirizzo : <p>"+this.indirizzo+"</p><img src='https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?b=1&s=170667a&w=0&k=20&c=-qQGlKM8OQsSJCEkHnqS9FI94VRTkZ-7tg0K0u02XL0='><br>";
            return stringa;
        }
        else
            {
            let stringa = "Nome e Cognome : <p>"+this.nomCog+"</p> Numero di Telefono : <p>"+this.numTel+"</p> Email : <p>"+this.email+" </p>Indirizzo : <p>"+this.indirizzo+"</p><img src='"+this.immagine+"'><br>";
            return stringa;
            }
    }
}

// funzione che inserisce il singolo contatto nell'array "contatti"
function inserisci ()
{
    // con queryselectorall seleziono una nodelist di oggetti input
    let nodoDati = document.querySelectorAll("input");
    let controlloRidondanza = false;

    for(i=0; i<contatti.length; i++)
    {
        if(contatti[i].nomCog == nodoDati[0].value)
        {
            controlloRidondanza = true;
        }
    }

    

    // se uno dei campi input è vuoto allora restituisco un errore, altrimenti inserisco il contatto nell'array
    if (nodoDati[0].value =="" || nodoDati[1].value == "" || nodoDati[2].value =="" )
    {
        alert("Hai dimenticato di compilare qualche campo");
    }
    // controlla se il pulsante modifica è stato premuto, e quindi se siamo in una fase di modifica del contatto
    else if (controlloRidondanza == true)
    {
        alert("Il contatto è già stato inserito in precedenza");
        controlloRidondanza = false;

    }
    else if (modificaCont == true)
    {
        // prende tutti i dati che abbiamo inserito e li mette nel record che stiamo modficando
        contatti[numRecord].nomCog = nodoDati[0].value;
        contatti[numRecord].numTel = nodoDati[1].value;
        contatti[numRecord].email = nodoDati[2].value;
        contatti[numRecord].indirizzo = nodoDati[3].value;
        contatti[numRecord].immagine = nodoDati[4].value;
        // setta la variabile di modifica a falso
        modificaCont = false;
        // cancella tutti i campi nel form
        nodoDati[0].value="";
        nodoDati[1].value="";
        nodoDati[2].value="";
        nodoDati[3].value="";
        nodoDati[4].value="";
    }
    else
    {
    // prende tutti i dati dai campi input, crea un oggetto nuovoContatto contenente i dati e lo mette in un array
    let nuovoContatto = new Contatto (nodoDati[0].value,nodoDati[1].value,nodoDati[2].value,nodoDati[3].value,nodoDati[4].value);
    contatti.push(nuovoContatto);
    let nuovoNomeEcognome = nodoDati[0].value;
    nodoDati[0].value="";
    nodoDati[1].value="";
    nodoDati[2].value="";
    nodoDati[3].value="";
    nodoDati[4].value="";
    }

    // se il pulsante Mostra Rubrica è già stato premuto, ad ogni nuovo contatto inserito aggioorno in tempo reale il feed contatti
    if (mostrata == true)
    {
        feed.innerHTML = "";
        for (i=0; i<contatti.length; i++)
        {
            feed.innerHTML += "<li>"+contatti[i].contattoString()+"<button onclick='cancella("+i+")'>Cancella</button><button onclick='modifica("+i+")'>Modifica <i class='bi bi-pencil-square'></i></button></li>";
            
        }
       
    }
   
}

//  funzione che alla pressione del tasto mostra , scrive nel feed tutta la rubrica
function mostra()
{
    
    feed.innerHTML = "";
    for (i=0; i<contatti.length; i++)
    {
        feed.innerHTML += "<li>"+contatti[i].contattoString()+"<button onclick='cancella("+i+")'>Cancella</button><button onclick='modifica("+i+")'>Modifica <i class='bi bi-pencil-square'></i></button></li>";
        
        
    mostrata = true;
    mostraRub.className="hidden";
    nascondiRub.className = "visible";
    }
}

function nascondi()
{
    
    feed.innerHTML = "";
    mostrata = false;
    mostraRub.className="visible";
    nascondiRub.className = "hidden";
}

function modifica(numeroRecord)
{
    let nodoDati = document.querySelectorAll("input");
    nodoDati[0].value= contatti[numeroRecord].nomCog;
    nodoDati[1].value=contatti[numeroRecord].numTel;
    nodoDati[2].value=contatti[numeroRecord].email;
    nodoDati[3].value=contatti[numeroRecord].indirizzo;
    nodoDati[4].value=contatti[numeroRecord].immagine;
    modificaCont = true;
    numRecord = numeroRecord;
    return numRecord

}

function cancella(numeroRecord)
{
    // elimina il record, sia dalla rubrica che dall'array dei nomi dei contatti
    contatti.splice(numeroRecord,1);

    if (mostrata == true)
    {
        feed.innerHTML = "";
        for (i=0; i<contatti.length; i++)
        {
            feed.innerHTML += "<li>"+contatti[i].contattoString()+"<button onclick='cancella("+i+")'>Cancella</button><button onclick='modifica("+i+")'>Modifica <i class='bi bi-pencil-square'></i></button></li>";
            
        }
       
    }
}

aggContatto.onclick = function ()
{
    inserisci();
}

mostraRub.onclick = function ()

{
    mostra();
}

nascondiRub.onclick = function ()

{
    nascondi();
}
