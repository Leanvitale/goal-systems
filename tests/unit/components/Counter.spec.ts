import { ITodoItem } from '@/utils/utils'
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import Counter from '../../../src/components/Counter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Counter', () => {

    let wrapper: Wrapper<Vue>
    let state
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

        store = new Vuex.Store({
            state
        })

        wrapper = shallowMount(Counter, { store, localVue })
    })

    test('Validate counter amount', () => {
        const counter = wrapper.find('strong');

        expect(counter.text()).toBe("2")
    })

    test('Validation Item Pluralization', () => {
        const content = wrapper.find('.todo-count');
        const value = content.text().split(' ')[1]

        expect(value).toBe('items')
    })

})