import { AbilityBuilder, Ability } from '@casl/ability';
import store from 'redux/stores';

// configs
import { USER_ROLE, DRAWER_MENU_LABEL } from 'configs';

function defineAbilitiesFor(type: string) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch (type) {
    case USER_ROLE.MASTER:
      can(['create', 'update', 'view', 'delete'], 'all');
      break;
    case USER_ROLE.ADMIN:
      can(['create', 'update', 'view', 'delete'], 'all');
      break;
    case USER_ROLE.EDITOR:
      // menu
      can('view', DRAWER_MENU_LABEL.PLAY_BACKGROUND);
      can('view', DRAWER_MENU_LABEL.DASHBOARD);

      can(['create', 'update', 'view', 'delete'], DRAWER_MENU_LABEL.POST);
      can(['create', 'update', 'view', 'delete'], DRAWER_MENU_LABEL.POST_ADD);
      can(['create', 'update', 'view', 'delete'], DRAWER_MENU_LABEL.POST_LIST);

      can('view', DRAWER_MENU_LABEL.SHARING);
      can('view', DRAWER_MENU_LABEL.SHARING_LIST);

      // actionu
      break;
    case USER_ROLE.GUEST:
      cannot(['create', 'update', 'view', 'delete'], 'all');
      break;
    default:
      break;
  }
  return build();
}

const canAction = (action: string, resource: string) => {
  const role = store.getState().auth.role || '';
  console.log('store', store.getState());
  if (!role) return false;

  const abilities = defineAbilitiesFor(role);
  return abilities.can(action, resource);
};

export default canAction;
