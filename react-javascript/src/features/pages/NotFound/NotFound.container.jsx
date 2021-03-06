import React from 'react';
import { Link } from 'react-router-dom';
import * as CONST from 'src/core/utils/constants';
import 'src/features/pages/NotFound/NotFound.style.scss';

const NotFoundContainer = () => {
    return (
        <div className='not-found'>
            <div className='text-center'>
                <div className='error mx-auto' data-text='404'>404</div>
                <p className='lead text-gray-800 mb-5'>Page Not Found</p>
                <p className='text-gray-500 mb-0'>It looks like you found a glitch in the matrix...</p>
                <Link to={CONST.AppURI.HOME}>&larr; Back to Dashboard</Link>
            </div>
        </div>
    )
}

export default NotFoundContainer;