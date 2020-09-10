import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchIndividualHero(action){
    try
        {let response = yield axios.get(`/api/hero/${action.payload}`);
        yield put({type: "SAVE_IND_HERO", payload: response.data})
    }catch(error) {
        console.log('error in INDIVIDUAL HERO SAGA:', error)
    }
    
};

function* individualHeroSaga() {
    yield takeEvery('GET_IND_HERO', fetchIndividualHero)
}

export default individualHeroSaga;