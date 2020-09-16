import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHeroes(action){
    let role = action.payload
    try {
        let response = yield axios.get(`/api/hero/${role}`);
        yield put ({type: "SET_HEROES", payload: response.data})
    }catch(error) {
        console.log('error in HERO SAGA GET:', error)
    }
}

function* fetchHeroFavorites(){

    try{
        let response = yield axios.get(`/api/favhero`);
        yield put({type: "SET_HERO_FAVORITES", payload: response.data})
    }catch(error){
        console.log('error in HERO FAVORITE SAGA GET:', error)
    }
};

function* fetchIndividualHero(action){
    try
        {let response = yield axios.get(`/api/hero/ind/${action.payload}`);
        yield put({type: "SAVE_IND_HERO", payload: response.data})
    }catch(error) {
        console.log('error in INDIVIDUAL HERO SAGA:', error)
    }
    
};

function* saveFavoriteHero(action){
    try {
        yield axios.put(`/api/favhero/${action.payload}`);
        yield put({type: 'FETCH_HERO_FAVORITES'})
    }catch(error){
        console.log('error in SAVE HERO FAVORITE SAGA:', error)
    }
};

function* deleteFavoriteHero(action){
    try{
        yield axios.delete(`/api/favhero/${action.payload}`);
        yield put({type: 'FETCH_HERO_FAVORITES'})
    }catch(error){
        console.log('error in DELETE HERO FAVORITE SAGA:', error)
    }
};

function* fetchTeamComps(){
    try{
        let response = yield axios.get('/api/teamcomp');
        yield put({type: 'SAVE_TEAM_COMPS', payload: response.data})
    }catch(error){
        console.log('error in SAVE TEAM COMP SAGA:', error)
    }
}

function* heroSaga() {
    yield takeEvery('FETCH_HEROES', fetchHeroes);
    yield takeEvery('GET_IND_HERO', fetchIndividualHero);
    yield takeEvery('SAVE_FAV_HERO', saveFavoriteHero);
    yield takeEvery('DELETE_FAV_HERO', deleteFavoriteHero);
    yield takeEvery('FETCH_HERO_FAVORITES', fetchHeroFavorites);
    yield takeEvery('FETCH_TEAM_COMPS', fetchTeamComps);
}

export default heroSaga;