import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHeroes(action){
    let role = action.payload
    console.log(role)
    try {
        let response = yield axios.get(`/api/hero/${role}`);
        yield put ({type: "SET_HEROES", payload: response.data})
    }catch(error) {
        console.log('error in HERO SAGA GET:', error)
    }
}

function* fetchHeroFavorites(action){
    let id = action.payload
    try{
        let response = yield axios.get(`/api/favhero/${id}`);
        yield put({type: "SET_HERO_FAVORITES", payload: response.data})
    }catch(error){
        console.log('error in HERO FAVORITE SAGA GET:', error)
    }
}

function* heroSaga() {
    yield takeEvery('FETCH_HEROES', fetchHeroes);
    yield takeEvery('FETCH_HERO_FAVORITES', fetchHeroFavorites);
}

export default heroSaga;