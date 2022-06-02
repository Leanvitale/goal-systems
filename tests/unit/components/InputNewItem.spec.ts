import { ITodoItem } from '@/utils/utils';
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import Vuex, { Store } from 'vuex'
import InputNewItem from '../../../src/components/InputNewItem.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('InputNewItem', () => {

    let wrapper: Wrapper<Vue>
    let actions: any
    let state
    let store: Store<any>

    beforeEach(() => {
        state = {
            todosList: <ITodoItem[]>[],
        }

        actions = {
            ADD_ITEM: jest.fn()
        }

        store = new Vuex.Store({
            state,
            actions
        })

        wrapper = shallowMount(InputNewItem, { 
            localVue,
            store
        })
    })

    test('Add new Item', async () => {
        const input = wrapper.find('input')

        await input.setValue('Item #1')
        await input.trigger('keyup.enter')
        
        expect( actions.ADD_ITEM ).toHaveBeenCalled()
    });

    test('Check empty input', async () => {
        const input = wrapper.find('input')
        
        await input.trigger('keyup.enter')
        
        expect( actions.ADD_ITEM ).not.toHaveBeenCalled()
    });

})