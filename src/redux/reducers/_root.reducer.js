import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import heroes from './heroes.reducer'
import individualHero from './ind_hero.reducer';
import maps from './maps.reducer';
import individualMap from './ind_map.reducer';
import favHeroes from './fav_heroes.reducer'
import favMaps from './fav_maps.reducer';
import mapHeroes from './map_heroes.reducer';
import teamComps from './team_comp.reducer'

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  heroes,
  individualHero,
  maps,
  individualMap,
  favHeroes,
  favMaps,
  mapHeroes,
  teamComps
});

export default rootReducer;
