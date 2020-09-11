import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchIndividualMap(action){
    try {
        let response = yield axios.get(`/api/map/${action.payload}`);
        yield put ({type: "SAVE_IND_MAP", payload: response.data})
    }catch(error){
        console.log('error in IND MAP SAGA:', error)
    }
}

function* individualMapSaga(){
    yield takeEvery("GET_IND_MAP", fetchIndividualMap)
};

export default individualMapSaga;