import React, {useState,useEffect} from 'react';

const Movie = (props) => {
    const {title}=props.film;
    const {overview}=props.film;
    const {poster_path}=props.film;
    const {release_date}=props.film;
    const {vote_average}=props.film;
    const {vote_count}=props.film;

    let date=[];

    let [showResume, setShowResume]=useState(false);

    if(release_date!=undefined)
        date=release_date.split('-');
    
    //console.log(props.film);

    let linkPoster="https://image.tmdb.org/t/p/w500"+poster_path;
    
    return (
        <div className="Movie">
            <img src={linkPoster} />
            <h1>{title}</h1>
            {release_date!=undefined && <h2>Sorti le {date[2]+"/"+date[1]+"/"+date[0]}</h2>}
            <h3>Note moyenne : {vote_average}/10 ({vote_count} votes)</h3>
            {!showResume && <button onClick={() => setShowResume(true)}>Afficher le résumé</button>}
            {showResume && <button onClick={() => setShowResume(false)}>Masquer le résumé</button>}
            {showResume && <p>{overview}</p>}
        </div>
    );
}

export default Movie;
