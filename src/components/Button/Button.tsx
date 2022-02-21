import React from 'react';
import "./styles.scss";

export default function Button(
//     { 
//   id,
//   src_img,
//   author_name, 
//   years_live,
//   picture_name,
//   date_created,
//   onArchiveTask, 
//   onPinTask }
) {
  return (
    <div className="container-card" 
    // style={{ backgroundImage: `url(${src_img})` }}
    >
            <div className="container-card__footer">
              {/* <h1>{author_name}</h1> */}
              <div className="container-card__footer__row">
                {/* <p>{years_live}</p> */}
              </div>
              <div className="container-card__footer__row">
                <h2>Name: </h2>
                {/* <p>{picture_name}</p> */}
              </div>
              <div className="container-card__footer__row">
                <h2>Created: </h2>
                {/* <p>{date_created}</p> */}
              </div>
            </div>
          </div>
  );
}