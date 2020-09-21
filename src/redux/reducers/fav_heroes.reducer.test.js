import favHeroReducer from './fav_heroes.reducer';
import favHeroes from './fav_heroes.reducer';

describe('TESTING THE FAVORITE HEROES REDUCER', () => {
    test('initial state is an object', () => {
        let testAction = [];
        let returnedSate = favHeroes(undefined, testAction);

        expect(returnedSate).toEqual([])
    })

    test('SET_HERO_FAVORITES will return payload', () => {
        let favs = [{
            name: 'D.Va',
            role: 'Tank',
            id: 1
        },
        {
            name: 'Ashe',
            role: 'DPS',
            id: 2
        }]
        let testAction = {
            type: 'SET_HERO_FAVORITES', 
            payload: favs
        };
        let returnedState = favHeroes([], testAction);
        expect(returnedState).toEqual(favs)
    })
})