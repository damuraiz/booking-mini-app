import React from 'react';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

function FixedHeader({headerCaption, showHomeLink}) {
    return (
        <div className='fixedHeader'>
            {showHomeLink && (
                <Link to="/" style={{
                    position: 'absolute',
                    left: '20px',
                    top: '13px',
                    fontSize: '18px',
                    color: '#1d2429',
                    textDecoration: 'none'
                }}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>
            )}
            <h1>{headerCaption}</h1>
        </div>
    );
}

export default FixedHeader;
