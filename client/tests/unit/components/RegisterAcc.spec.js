import { shallowMount } from '@vue/test-utils';
import Register from '@/components/RegisterAcc.vue';
import { createUserWithEmailAndPassword, updateProfile } from '@/firebase';

jest.mock('@/firebase');

describe('RegisterAcc.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Register);
  });

  it('registers a new account', async () => {
    wrapper.setData({ email: 'test@example.com', password: 'password', name: 'Test User' });

    await wrapper.find('form').trigger('submit.prevent');

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password');
    expect(updateProfile).toHaveBeenCalledWith(expect.anything(), { displayName: 'Test User' });
  });

  it('shows an error if email is already in use', async () => {
    createUserWithEmailAndPassword.mockImplementationOnce(() => {
      throw { code: 'auth/email-already-in-use' };
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.error).toBe('This email is already in use.');
    expect(wrapper.vm.showModal).toBe(true);
  });
});
