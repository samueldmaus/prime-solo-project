import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchIndividualHero(action){
    let response = yield axios.get(`/api/hero/${action.payload}`);
    yield put({type: "SAVE_IND_HERO", payload: response.data})
}
function* individualHeroSaga() {
    yield takeEvery('GET_IND_HERO', fetchIndividualHero)
}

export default individualHeroSaga;