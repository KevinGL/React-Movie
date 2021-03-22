//import React from 'react';
import axios from 'axios';
import React, {useState,useEffect} from 'react';
import Movie from './Movie';

const Movies = () => {
    let genres=[{genre : "Action", id:28}, 
                {genre : "Aventure", id:12},
                {genre : "Animation", id:16},
                {genre : "Comédie", id:35},
                {genre : "Crime", id:80},
                {genre : "Documentaire", id:99},
                {genre : "Drame", id:18},
                {genre : "Famille", id:10751},
                {genre : "Fantastique", id:14},
                {genre : "Histoire", id:36},
                {genre : "Horreur", id:27},
                {genre : "Musique", id:10402},
                {genre : "Mystère", id:9648},
                {genre : "Romance", id:10749},
                {genre : "Science-Fiction", id:878},
                {genre : "TV", id:10770},
                {genre : "Thriller", id:53},
                {genre : "Guerre", id:10752},
                {genre : "Western", id:37}];
    
    let api_key="a60f87a8d47a65a42920dd8f5bf4937b";

    let [liste_films, setFilms]=useState([]);
    let [liste_films_tries, setFilmsTries]=useState([]);
    let [lancer_requete, setLancer]=useState(true);
    let [changerPage, setChangerPage]=useState(false);
    let [numPage, setNumPage]=useState(1);
    let [nbPages, setNbPages]=useState("");
    /*let [titre_a_chercher, setTitre]=useState("");
    let [chercherTitre, setChercherTitre]=useState(false);*/

    useEffect(() => {
        if(lancer_requete)
        {
            let requete="https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&language=fr-FR";
        
            axios.get(requete).then((res) => {
                setFilms(res.data.results);
                setFilmsTries(res.data.results);
                //console.log(res.data);
                setNbPages(res.data.total_pages);
                setLancer(false);
            });
        }
    },[liste_films]);

    useEffect(() => {
        if(changerPage)
        {
            let requete="https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&language=fr-FR&page="+numPage.toString();
        
            axios.get(requete).then((res) => {
                setFilms(res.data.results);
                setFilmsTries(res.data.results);
            });
        }
    },[numPage]);

    /*useEffect(() => {
        if(chercherTitre)
        {
            let requete="https://api.themoviedb.org/3/keyword/"+titre_a_chercher+"?api_key="+api_key;
        
            axios.get(requete).then((res) => {
                console.log(titre_a_chercher);
                setChercherTitre(false);
            });
        }
    },[titre_a_chercher]);*/

    return (
        <div>
            {
                /*<div className="title">
                    <form>
                        <input type="text" id="TitreEntre" />
                        <button type="submit" onClick={(e) => 
                            {
                                setTitre(document.getElementById("TitreEntre").value);
                                setChercherTitre(true);
                                e.preventDefault();
                            }
                        }>Rechercher</button>
                    </form>
                </div>*/
            }

            <div className="genre">
                <select name="genre" onChange={(e) => {
                    setFilmsTries(liste_films);
                    if(e.target.value!="")
                        setFilmsTries(liste_films.filter((film) => film.genre_ids.indexOf(parseInt(e.target.value))!=-1) );
                    }}>

                    <option value="">Sélectionner un genre</option>
                    <option value="">Tous</option>
                    {
                        genres.map((g) => {
                            return <option value={g.id}>{g.genre}</option>;
                        })
                    }
                </select>
            </div>

            <div className="list_buttons">
                {numPage>=2 && <button onClick={() => {

                    setNumPage(numPage-1);
                    setChangerPage(true);

                }}>Page précédente</button>}
            
                {numPage<=parseInt(nbPages)-1 && <button onClick={() => {

                    setNumPage(numPage+1);
                    setChangerPage(true);

                }}>Page suivante</button>}
            </div>

            <div className="list_buttons">
                <button onClick={() => {

                    setNumPage(1);
                    setChangerPage(true);

                }}>Première page</button>
            
                <button onClick={() => {

                    setNumPage(nbPages);
                    setChangerPage(true);

                }}>Dernière page</button>
            </div>

            <ul className="list">
                {
                    liste_films_tries.map((film) => {
                        return <Movie film={film} />
                    })
                }
            </ul>
        </div>
    );
}

export default Movies;
