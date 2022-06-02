import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import storeConfig from '../../../src/store'
import { RouterStatus } from '../../../src/utils/utils'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TodoList', () => {
    
    let store: Store<any>

    const todosList = [
        {
            name: 'Prueba 1',
            isCompleted: true
        },
        {
            name: 'Prueba 2',
            isCompleted: true
        },
        {
            name: 'Prueba 3',
            isCompleted: false
        },
    ]

    const getStore = ( route: string ): Store<any> => {
        const state = {
            todosList,
            isEditing: true,
            route
        }

        const getters = {
            listFiltered: () => ( route === RouterStatus.COMPLETED ) ? todosList.filter(item => item.isCompleted) :
                                ( route === RouterStatus.ACTIVE ) ? todosList.filter(item => !item.isCompleted) : todosList
        }                       

        return new Vuex.Store({
            state,
            getters
        })
    }

    test('Validate List with Filter All', async () => {
        store = getStore('/all')
        const counter = store.getters.listFiltered.length

        expect( counter ).toBe(3)
    })

    test('Validate List with Filter Active', async () => {
        store = getStore('/active')
        const counter = store.getters.listFiltered.length

        expect( counter ).toBe(1)
    })

    test('Validate List with Filter Completed', async () => {
        store = getStore('/completed')
        const counter = store.getters.listFiltered.length

        expect( counter ).toBe(2)
    })

    test('Validate Add new Item', async () => {
        expect(storeConfig.getters.listFiltered.length).toBe(0)

        await storeConfig.dispatch('ADD_ITEM', 'Test #1')
        
        expect(storeConfig.getters.listFiltered.length).toBe(1)
    })

    test('Validate Change Item Name', async () => {
        await storeConfig.dispatch('CHANGE_ITEM_NAME', {
            id: 0,
            name: 'Test #0'
        })

        const nameChanged = storeConfig.getters.listFiltered[0].name

        expect( nameChanged ).toBe( 'Test #0' )
    })

    test('Validate Change Item Status', async () => {
        const actualStatus = storeConfig.getters.listFiltered[0].isCompleted

        await storeConfig.dispatch('CHANGE_ITEM_STATUS', 0)

        const newStatus = storeConfig.getters.listFiltered[0].isCompleted

        expect( newStatus ).toBe( !actualStatus )
    })

    test('Validate Remove Item', async () => {
        const listLength = storeConfig.getters.listFiltered.length

        await storeConfig.dispatch('REMOVE_ITEM', storeConfig.getters.listFiltered[0])

        const newLength = storeConfig.getters.listFiltered.length

        expect( newLength ).toBe( listLength - 1 )
    })

})