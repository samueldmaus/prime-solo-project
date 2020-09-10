import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMaps(){
    try {
        let response = yield axios.get('/api/map');
        yield put({type: "SAVE_MAPS", payload: response.data})
    }catch(error){
        console.log('error in MAP SAGA:', error)
    }
};

function* mapSaga(){
    yield takeEvery('FETCH_MAPS', fetchMaps)
}

export default mapSaga;