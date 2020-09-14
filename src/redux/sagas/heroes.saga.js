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

function* heroSaga() {
    yield takeEvery('FETCH_HEROES', fetchHeroes);
    yield takeEvery('GET_IND_HERO', fetchIndividualHero);
    yield takeEvery('FETCH_HERO_FAVORITES', fetchHeroFavorites);
}

export default heroSaga;