import { ITodoItem, RouterStatus } from '@/utils/utils'
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import ClearCompleted from '../../../src/components/ClearCompleted.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ClearCompleted', () => {

    let wrapper: Wrapper<Vue>
    let state, actions: any
    let store: Store<any>

    beforeEach(() => {
        state = {
            todosList: <ITodoItem[]>[
                {
                    name: 'Prueba 1',
                    isCompleted: false
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
        }

        actions = {
            CLEAR_COMPLETED: jest.fn()
        }

        store = new Vuex.Store({
            state,
            actions
        })

        wrapper = shallowMount(ClearCompleted, { store, localVue })
    })

    test('Validate if the Button exists', () => {
        const button = wrapper.find('button');

        expect(button.exists()).toBe(true)
    })

    test('Validate call method CLEAR_COMPLETED', async () => {
        const button = wrapper.find('button');

        await button.trigger('click')

        expect(actions.CLEAR_COMPLETED).toHaveBeenCalled()
    })

})