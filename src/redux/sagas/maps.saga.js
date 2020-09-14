import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMaps(action){
    let type = action.payload;
    try {
        let response = yield axios.get(`/api/map/${type}`);
        yield put({type: "SAVE_MAPS", payload: response.data})
    }catch(error){
        console.log('error in MAP SAGA:', error)
    }
};

function* fetchMapFavorites(){
    try {
        let response = yield axios.get(`/api/favmap`);
        yield put({type: "SAVE_MAP_FAVORITES", payload: response.data})
    }catch(error){
        console.log('error in FAVORITE MAP SAGA:', error)
    }
};

function* fetchIndividualMap(action){
    try {
        let response = yield axios.get(`/api/map/ind/${action.payload}`);
        yield put ({type: "SAVE_IND_MAP", payload: response.data})
    }catch(error){
        console.log('error in IND MAP SAGA:', error)
    }
}

function* mapSaga(){
    yield takeEvery('FETCH_MAPS', fetchMaps);
    yield takeEvery("GET_IND_MAP", fetchIndividualMap);
    yield takeEvery('FETCH_MAP_FAVORITES', fetchMapFavorites)
}

export default mapSaga;