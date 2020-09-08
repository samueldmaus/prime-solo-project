import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchHeroes(){
    try {
        let response = yield axios.get('/api/hero');
        yield put ({type: "SET_HEROES", payload: response.data})
    }catch(error) {
        console.log('error in HERO SAGA GET:', error)
    }
}

function* heroSaga() {
    yield takeEvery('FETCH_HEROES', fetchHeroes)
}

export default heroSaga;