import { shallowMount } from '@vue/test-utils';
import UserProfile from '@/components/UserProfile.vue';
import { auth, db, updateProfile, updateEmail, deleteUser } from '@/firebase';

jest.mock('@/firebase');

describe('UserProfile.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UserProfile);
    wrapper.setData({
      userData: {
        name: 'Test User',
        email: 'test@example.com',
        created: new Date(),
        accountType: 'Regular',
        accountId: 'test-uid',
      },
      displayName: 'Test User',
      email: 'test@example.com',
    });
  });

  it('updates display name', async () => {
    wrapper.setData({ displayName: 'New Name' });

    await wrapper.find('#displayName ~ button').trigger('click');

    expect(updateProfile).toHaveBeenCalledWith(auth.currentUser, { displayName: 'New Name' });
  });

  it('updates email', async () => {
    wrapper.setData({ email: 'new@example.com' });

    await wrapper.find('#email ~ button').trigger('click');

    expect(updateEmail).toHaveBeenCalledWith(auth.currentUser, 'new@example.com');
  });

  it('deletes account', async () => {
    await wrapper.find('.delete-button').trigger('click');
    await wrapper.vm.deleteAccountConfirmed();

    expect(deleteUser).toHaveBeenCalledWith(auth.currentUser);
  });
});
