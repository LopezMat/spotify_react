import React from 'react';
import { Link } from 'react-router-dom';

const HeaderCategorie = ({ dataAlbum }) => {
    return (
        <>
            <h1 className='text-1xl font-bold text-white my-7'>
                Catégorie : <br />
                {dataAlbum.genre && dataAlbum.genre.length > 0
                    ? dataAlbum.genre.map((category, index) => (
                        <Link to='#' key={index}>
                            {category.label}
                            {index !== dataAlbum.genre.length - 1 && " , "}
                        </Link>
                    ))
                    : 'aucun'
                }
            </h1>
        </>
    );
}

export default HeaderCategorie;