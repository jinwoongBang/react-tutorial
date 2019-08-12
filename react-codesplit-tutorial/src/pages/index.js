// [ react-loadable 적용 전 ]
// import withSplitting from "../withSplitting";

// export const Home = withSplitting(() => import('./Home'));
// export const About = withSplitting(() => import('./About'));

// [ react-loadable 적용 후 ]
import React from 'react';
import Loadable from 'react-loadable';

const Loading = () => {
    return <div>로딩 중...</div>;
}

export const Home = Loadable({
    loader: () => import('./Home'),
    loading: Loading
});

export const About = Loadable({
    loader: () => import('./About'),
    loading: Loading
});