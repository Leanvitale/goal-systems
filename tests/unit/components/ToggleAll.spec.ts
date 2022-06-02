import { ITodoItem } from '@/utils/utils'
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import ToggleAll from '../../../src/components/ToggleAll.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ToggleAll', () => {

    let wrapper: Wrapper<Vue>
    let state, actions: any
    let store: Store<any>

    beforeEach(() => {
        state = {
            todosList: <ITodoItem[]>[
                {
                    name: 'Prueba 1',
                    isCompleted: true
                },
                {
                    name: 'Prueba 2',
                    isCompleted: true
                }
            ]
        }

        actions = {
            CHANGE_ALL_ITEM_STATUS: jest.fn()
        }

        store = new Vuex.Store({
            state,
            actions
        })

        wrapper = shallowMount(ToggleAll, { store, localVue })
    })

    test('Validate ToogleAll Method', async () => {
        const label = wrapper.find('label');

        await label.trigger('click')

        expect(actions.CHANGE_ALL_ITEM_STATUS).toHaveBeenCalled()
    })

    test('Validate All is Completed', async () => {
        const input = wrapper.find('input');

        const allIsCompleted = (input.element as HTMLInputElement).checked

        expect(allIsCompleted).toBeTruthy()
    })

})