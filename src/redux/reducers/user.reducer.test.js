import user from './user.reducer';

describe('TESTING USER REDUCER', () => {
    // initialization 
    test('initial state is an object', () => {
        let testAction = {};
        let returnedSate = user(undefined, testAction);

        expect(returnedSate).toEqual({})
    })

    test('SET_USER WILL CORRECTLY SET PAYLOAD', () => {
        let testAction = {
            type: 'SET_USER', 
            payload: {
                username: 'test_username',
                id: 1
            }
        };
        let returnedSate = user({}, testAction);
        expect(returnedSate).toEqual({username: 'test_username', id: 1})

    })

})




/*
JEST.JS
import addinator from './addinator'

describe('CHECKING ADDINATOR', () => {
    
    test('Sum of 1 and 2 is 3', () => {
        expect(addinator(1,2)).toBe(3)
    });

    test('if x or y is omitted', () => {
        expect(addinator(1)).toBe(1)
    })

    test('negative numbers', () => {
        expect(addinator(-1,2)).toBe(1)
    })

    test('decimals behave correctly', () => {
        expect(addinator(1.5, 2)).toBe(3.5)
    })

    test('incorrect input', () => {
        expect(addinator('1', 2)).toBe(3)
    })
})


npm run test 
*/